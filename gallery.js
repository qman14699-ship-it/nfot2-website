/* Gallery page logic - album covers + album page. Photos are listed in photos.js */
(function () {
    var MAX = 300;
    var MANY = 9; // album with this many photos or more = 3 columns, fewer = 2 columns
    var $ = function (id) { return document.getElementById(id); };
    var pad = function (v) { return String(v).padStart(2, '0'); };

    var wallEl = $('gWall'), gridEl = $('gGrid'), countEl = $('gCount'), subEl = $('gSub');
    var hint = document.querySelector('.tap-hint');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var all = PHOTOS.slice(0, MAX).map(function (p) {
        return {
            src: p.src,
            title: (p.title || '').trim(),
            text: (p.text || '').trim(),
            album: (p.album || '').trim()
        };
    });

    function exists(src) {
        if (!window.fetch) return Promise.resolve(true);
        return fetch(src, { method: 'HEAD' }).then(function (r) { return r.ok; }).catch(function () { return true; });
    }

    Promise.all(all.map(function (p) { return exists(p.src); })).then(function (ok) {
        start(all.filter(function (_, i) { return ok[i]; }));
    });

    function start(items) {
        var n = items.length;

        if (!n) {
            wallEl.style.display = 'none';
            subEl.style.display = 'none';
            if (hint) hint.style.display = 'none';
            gridEl.innerHTML = '<p class="g-empty">No photos yet. Add your pictures to the Images folder and list them in photos.js.</p>';
            return;
        }
        countEl.textContent = n + (n === 1 ? ' photo' : ' photos');

        /* ---------- sliding rows ---------- */
        var ROWS = 2;
        for (var r = 0; r < ROWS; r++) {
            var mine = [];
            for (var i = r; i < n; i += ROWS) mine.push(i);
            if (!mine.length) continue;

            var base = mine.slice();
            while (base.length < 12) base = base.concat(mine);

            var row = document.createElement('div');
            row.className = 'g-row';
            var track = document.createElement('div');
            track.className = 'g-track';
            track.dataset.speed = String(28 + r * 6); // px per second

            base.concat(base).forEach(function (idx) {
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 'g-card';
                b.setAttribute('aria-label', items[idx].title || 'Open photo ' + (idx + 1));
                var im = document.createElement('img');
                im.alt = '';
                im.decoding = 'async';
                im.loading = 'lazy';
                im.src = items[idx].src;
                b.appendChild(im);
                b.addEventListener('click', function () { openBox(idx, items); });
                track.appendChild(b);
            });
            row.appendChild(track);
            wallEl.appendChild(row);
        }
        setupReveal([wallEl]);

        /* ---------- photo viewer (works on whichever list is open) ---------- */
        var lb = $('lbx'), img = $('lbxImg'), no = $('lbxNo'), ttl = $('lbxTitle'), txt = $('lbxText');
        var list = items, cur = 0, albOpen = false;

        function show(i) {
            var len = list.length;
            cur = ((i % len) + len) % len;
            var it = list[cur];
            img.classList.remove('in');
            img.alt = it.title || 'Photo ' + (cur + 1);
            img.src = it.src;
            no.textContent = pad(cur + 1) + ' / ' + pad(len);
            ttl.textContent = it.title;
            txt.textContent = it.text;
            [cur + 1, cur - 1].forEach(function (k) {
                var pre = new Image();
                pre.src = list[((k % len) + len) % len].src;
            });
        }
        img.addEventListener('load', function () { img.classList.add('in'); });

        function openBox(i, l) {
            list = l || items;
            show(i);
            lb.classList.add('open');
            document.body.classList.add('lbx-open');
            document.body.style.overflow = 'hidden';
        }
        function closeBox() {
            lb.classList.remove('open');
            document.body.classList.remove('lbx-open');
            document.body.style.overflow = albOpen ? 'hidden' : '';
        }
        window.openBox = openBox;

        $('lbxClose').addEventListener('click', closeBox);
        $('lbxPrev').addEventListener('click', function () { show(cur - 1); });
        $('lbxNext').addEventListener('click', function () { show(cur + 1); });
        $('lbxStage').addEventListener('click', function (e) { if (e.target === this) closeBox(); });
        document.addEventListener('keydown', function (e) {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape') closeBox();
            if (e.key === 'ArrowRight') show(cur + 1);
            if (e.key === 'ArrowLeft') show(cur - 1);
        });

        var sx = 0, sy = 0, down = false, stage = $('lbxStage');
        stage.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; down = true; });
        stage.addEventListener('pointerup', function (e) {
            if (!down) return;
            down = false;
            var dx = e.clientX - sx, dy = e.clientY - sy;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) show(cur + (dx < 0 ? 1 : -1));
        });
        stage.addEventListener('pointercancel', function () { down = false; });

        /* ---------- album page (the overlay with the masonry grid) ---------- */
        var alb = document.createElement('div');
        alb.className = 'alb';
        alb.setAttribute('role', 'dialog');
        alb.setAttribute('aria-modal', 'true');
        alb.innerHTML =
            '<div class="alb-head">' +
                '<button type="button" class="alb-back" aria-label="Back"><svg viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>' +
                '<div><h3 class="alb-title"></h3><p class="alb-count"></p></div>' +
            '</div>' +
            '<div class="alb-grid"></div>';
        document.body.appendChild(alb);

        var albTitle = alb.querySelector('.alb-title'),
            albCount = alb.querySelector('.alb-count'),
            albGrid = alb.querySelector('.alb-grid');

        function openAlbum(a) {
            albTitle.textContent = a.name;
            albCount.textContent = a.list.length + (a.list.length === 1 ? ' photo' : ' photos');
            albGrid.className = 'alb-grid ' + (a.list.length >= MANY ? 'cols3' : 'cols2');
            albGrid.innerHTML = '';
            a.list.forEach(function (it, idx) {
                var b = document.createElement('button');
                b.type = 'button';
                b.className = 'g-item';
                b.setAttribute('aria-label', it.title || 'Open photo ' + (idx + 1));
                var im = document.createElement('img');
                im.alt = it.title || 'Photo ' + (idx + 1);
                im.decoding = 'async';
                im.loading = 'lazy';
                im.addEventListener('load', function () { im.classList.add('loaded'); });
                im.src = it.src;
                if (im.complete) im.classList.add('loaded');
                b.appendChild(im);
                if (it.title) {
                    var cap = document.createElement('span');
                    cap.className = 'cap';
                    cap.textContent = it.title;
                    b.appendChild(cap);
                }
                b.addEventListener('click', function () { openBox(idx, a.list); });
                albGrid.appendChild(b);
            });
            alb.scrollTop = 0;
            alb.classList.add('open');
            setupReveal([].slice.call(albGrid.children));   /* scroll animation inside the album */
            albOpen = true;
            document.body.style.overflow = 'hidden';
            try { history.pushState({ alb: 1 }, ''); } catch (e) {}
        }
        function hideAlbum() {
            alb.classList.remove('open');
            albOpen = false;
            document.body.style.overflow = '';
        }
        alb.querySelector('.alb-back').addEventListener('click', function () {
            if (history.state && history.state.alb) history.back(); else hideAlbum();
        });
        window.addEventListener('popstate', function () { if (albOpen) hideAlbum(); });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && albOpen && !lb.classList.contains('open')) {
                if (history.state && history.state.alb) history.back(); else hideAlbum();
            }
        });

        /* ---------- sliding rows: drag / swipe with your finger (endless loop) ----------
           Swipe right to left (or left to right): the photos follow your finger,
           glide when you let go, then keep sliding in the direction you swiped. */
        try {
        var states = [].slice.call(wallEl.querySelectorAll('.g-row')).map(function (rowEl, k) {
            var trk = rowEl.firstChild;
            var st = {
                row: rowEl, track: trk,
                dir: k % 2 === 0 ? 1 : -1,           // 1 = slides to the left, -1 = slides to the right
                speed: +trk.dataset.speed || 28,     // px per second
                pos: 0, vel: 0, half: 0, init: false,
                down: false, drag: false, id: null,
                sx: 0, sp: 0, lx: 0, lt: 0, mv: 0,
                hover: false, blockClick: false
            };
            st.wrap = function (p) {
                var h = st.half;
                if (!h) return p;
                p = p % h;
                return p < 0 ? p + h : p;
            };
            st.draw = function () { trk.style.transform = 'translate3d(' + (-st.pos) + 'px,0,0)'; };

            rowEl.addEventListener('pointerdown', function (e) {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                st.down = true; st.drag = false; st.id = e.pointerId;
                st.sx = e.clientX; st.sp = st.pos; st.lx = e.clientX; st.lt = performance.now(); st.mv = 0;
            });
            rowEl.addEventListener('pointermove', function (e) {
                if (!st.down || e.pointerId !== st.id) return;
                var dx = e.clientX - st.sx;
                if (!st.drag) {
                    if (Math.abs(dx) < 6) return;     // small movement = still a tap
                    st.drag = true; st.vel = 0;
                    try { rowEl.setPointerCapture(e.pointerId); } catch (err) {}
                }
                var now = performance.now(), dt = (now - st.lt) / 1000;
                if (dt > 0) st.mv = st.mv * 0.6 + (-(e.clientX - st.lx) / dt) * 0.4;
                st.lx = e.clientX; st.lt = now;
                st.pos = st.wrap(st.sp - dx);
                st.draw();
            });
            function end(e, cancel) {
                if (!st.down || (e && e.pointerId !== st.id)) return;
                st.down = false;
                if (!st.drag) return;
                st.drag = false;
                st.blockClick = true;                 // do not open a photo after a swipe
                setTimeout(function () { st.blockClick = false; }, 350);
                if (!cancel && performance.now() - st.lt < 120) {
                    var v = Math.max(-2500, Math.min(2500, st.mv));
                    st.vel = v;                       // glide from the speed of your swipe
                    if (Math.abs(v) > 40) st.dir = v > 0 ? 1 : -1;
                }
            }
            rowEl.addEventListener('pointerup', function (e) { end(e, false); });
            rowEl.addEventListener('pointercancel', function (e) { end(e, true); });
            rowEl.addEventListener('click', function (e) {
                if (st.blockClick) { e.stopPropagation(); e.preventDefault(); }
            }, true);
            // hover pause only for a real mouse (a tap on a phone must not freeze the row)
            rowEl.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') st.hover = true; });
            rowEl.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') st.hover = false; });
            return st;
        });

        var last = performance.now();
        (function tick(now) {
            var dt = Math.min(now - last, 60) / 1000;
            last = now;
            var stopped = document.body.classList.contains('lbx-open') || alb.classList.contains('open');
            states.forEach(function (st) {
                var half = st.track.offsetWidth / 2;
                if (!half) return;
                st.half = half;
                if (!st.init) {
                    st.pos = st.dir === 1 ? 0 : half - 1;   // bottom row starts from the middle
                    st.init = true;
                    st.draw();
                }
                if (st.drag || stopped) return;
                var target = (reduce || st.hover || st.down) ? 0 : st.dir * st.speed;
                st.vel += (target - st.vel) * (1 - Math.exp(-3 * dt));   // glide, then settle into the slow slide
                if (target === 0 && Math.abs(st.vel) < 0.05) return;
                st.pos = st.wrap(st.pos + st.vel * dt);
                st.draw();
            });
            requestAnimationFrame(tick);
        })(last);
        } catch (err) { console.error('slide rows error:', err); }

        /* ---------- Album section: one cover per album, loose photos stay as they are ---------- */
        var entries = [], map = {}, loose = [];
        items.forEach(function (it) {
            if (it.album) {
                if (!map[it.album]) {
                    map[it.album] = { type: 'album', name: it.album, list: [] };
                    entries.push(map[it.album]);
                }
                map[it.album].list.push(it);
            } else {
                loose.push(it);
                entries.push({ type: 'photo', item: it, idx: loose.length - 1 });
            }
        });

        entries.forEach(function (en, k) {
            var cover = en.type === 'album' ? en.list[0] : en.item;
            var label = en.type === 'album' ? en.name : en.item.title;

            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'g-item';
            b.setAttribute('aria-label', en.type === 'album' ? 'Open album ' + en.name : (label || 'Open photo ' + (k + 1)));

            var im = document.createElement('img');
            im.alt = label || 'Photo ' + (k + 1);
            im.decoding = 'async';
            im.loading = 'lazy';
            im.addEventListener('load', function () { im.classList.add('loaded'); });
            im.src = cover.src;
            if (im.complete) im.classList.add('loaded');
            b.appendChild(im);

            if (label) {
                var cap = document.createElement('span');
                cap.className = 'cap';
                cap.textContent = label;
                b.appendChild(cap);
            }
            if (en.type === 'album') {
                var bd = document.createElement('span');
                bd.className = 'badge';
                bd.textContent = en.list.length;
                b.appendChild(bd);
                b.addEventListener('click', function () { openAlbum(en); });
            } else {
                b.addEventListener('click', function () { openBox(en.idx, loose); });
            }
            gridEl.appendChild(b);
        });
        setupReveal([].slice.call(gridEl.children));
    }

    /* ---------- scroll animation ---------- */
    function setupReveal(targets) {
        if (reduce || !('IntersectionObserver' in window)) return;
        targets.forEach(function (t) { t.classList.add('pre'); });

        var io = new IntersectionObserver(function (entries) {
            var seen = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
                var A = a.boundingClientRect, B = b.boundingClientRect;
                return (A.top - B.top) || (A.left - B.left);
            });
            seen.forEach(function (e, i) {
                e.target.style.setProperty('--d', (Math.min(i, 8) * 0.07).toFixed(2) + 's');
                e.target.classList.remove('pre');
                e.target.classList.add('in');
                io.unobserve(e.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

        targets.forEach(function (t) { io.observe(t); });
    }
})();
