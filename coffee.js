/* Coffee Journal pop-up logic - no need to edit. Your drinks are in coffee-data.js */
(function () {
    var btn = document.getElementById('coffeeBtn');
    if (!btn || typeof COFFEE === 'undefined') return;

    var HEART = 'M70 49.4c-5.6-5.2-11.4-1.7-8.2 2.5 1.9 2.3 5 3.8 8.2 5.9 3.2-2.1 6.3-3.6 8.2-5.9 3.2-4.2-2.6-7.7-8.2-2.5z';

    /* scroll animation: items rise and fade in one after another when they come into view */
    function reveal(els) {
        if (!('IntersectionObserver' in window)) return;
        if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!document.getElementById('sr-style')) {
            var st = document.createElement('style');
            st.id = 'sr-style';
            st.textContent = '.sr{opacity:0}.sr.sr-in{opacity:1;animation:srUp .7s cubic-bezier(.22,1,.36,1) var(--d,0s) backwards}@keyframes srUp{from{opacity:0;transform:translateY(28px) scale(.97)}to{opacity:1;transform:none}}';
            document.head.appendChild(st);
        }
        var io = new IntersectionObserver(function (es) {
            var seen = es.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
                var A = a.boundingClientRect, B = b.boundingClientRect;
                return (A.top - B.top) || (A.left - B.left);
            });
            seen.forEach(function (e, i) {
                e.target.style.setProperty('--d', (Math.min(i, 8) * 0.07).toFixed(2) + 's');
                e.target.classList.add('sr-in');
                io.unobserve(e.target);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
        els.forEach(function (el) { el.classList.add('sr'); io.observe(el); });
    }

    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }
    function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
    function shade(hex, amt) {
        var n = parseInt(hex.replace('#', ''), 16);
        var r = Math.max(0, Math.min(255, (n >> 16) + amt));
        var g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
        var b = Math.max(0, Math.min(255, (n & 255) + amt));
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    /* drawn cup - used when a drink has no photo yet */
    function cupSvg(c, k) {
        var u = 'c' + k, art = '';
        if (c.art === 'heart') art = '<path d="' + HEART + '" fill="' + shade(c.liquid, -6) + '" opacity=".92"/>';
        else if (c.art === 'drizzle') art = '<path d="M40 49q6.5-7.5 13 0t13 0 13 0 13 0" fill="none" stroke="' + (c.drizzle || '#6b3d1e') + '" stroke-width="2.8" stroke-linecap="round"/>';
        else if (c.art === 'foam') art = '<ellipse cx="62" cy="46.5" rx="11" ry="2.8" fill="rgba(255,255,255,.55)"/><circle cx="82" cy="50" r="2.4" fill="rgba(255,255,255,.5)"/><circle cx="77" cy="46" r="1.4" fill="rgba(255,255,255,.55)"/>';
        else art = '<ellipse cx="70" cy="48.5" rx="29" ry="6.6" fill="none" stroke="' + c.top + '" stroke-width="2" opacity=".75"/>';
        var strong = (c.art === 'none') || (c.art === 'foam' && c.strength >= 4);
        var opening = '<ellipse cx="70" cy="48" rx="35" ry="9.2" fill="url(#' + u + 'l)"/>' +
            (strong ? '' : '<ellipse cx="70" cy="48" rx="29.5" ry="7" fill="' + c.top + '"/>') +
            (c.art === 'foam' && strong ? '<ellipse cx="70" cy="48" rx="16" ry="4.2" fill="' + c.top + '"/>' : '');
        return '<svg class="cup" viewBox="0 0 140 120" aria-hidden="true"><defs>' +
            '<linearGradient id="' + u + 'p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f1eadb"/><stop offset="1" stop-color="#cfc4ae"/></linearGradient>' +
            '<linearGradient id="' + u + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f1e4"/><stop offset="1" stop-color="#b9ad96"/></linearGradient>' +
            '<radialGradient id="' + u + 'l" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="' + shade(c.liquid, 26) + '"/><stop offset="1" stop-color="' + c.liquid + '"/></radialGradient>' +
            '<filter id="' + u + 'b" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>' +
            '<filter id="' + u + 't" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>' +
            '<ellipse cx="70" cy="108" rx="54" ry="8" fill="rgba(0,0,0,.55)" filter="url(#' + u + 'b)"/>' +
            '<g filter="url(#' + u + 't)"><path class="steam" d="M58 36c-8-8 8-13 0-24"/><path class="steam s2" d="M72 34c-8-8 8-13 0-24"/><path class="steam s3" d="M86 36c-8-8 8-13 0-24"/></g>' +
            '<path d="M110 52c19-3 21 24 0 29" fill="none" stroke="url(#' + u + 'p)" stroke-width="8" stroke-linecap="round"/>' +
            '<ellipse cx="70" cy="101" rx="52" ry="9.5" fill="url(#' + u + 's)"/><ellipse cx="70" cy="99" rx="44" ry="6.4" fill="#fbf7ee"/>' +
            '<path d="M28 48h84c0 33-12 54-42 54S28 81 28 48z" fill="url(#' + u + 'p)"/>' +
            '<path d="M35 52c2 20 10 36 24 44-12-8-19-24-20-44z" fill="rgba(255,255,255,.55)"/>' +
            '<ellipse cx="70" cy="48" rx="42" ry="11.6" fill="url(#' + u + 'p)"/>' + opening + art +
            '<ellipse cx="70" cy="48" rx="35" ry="9.2" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.2"/></svg>';
    }

    /* photo: tries Images/<Name>.jpg, .png ... then Images/coffee/..., otherwise the drawn cup stays */
    window.__cfImg = function (im) {
        var l = im.getAttribute('data-l').split('|'), i = +im.getAttribute('data-i') + 1;
        if (i < l.length) { im.setAttribute('data-i', i); im.src = l[i]; } else im.remove();
    };
    function photoList(c) {
        var list = c.img ? [c.img] : [], names = [c.name, slug(c.name)];
        ['Images/', 'Images/coffee/'].forEach(function (f) {
            names.forEach(function (n) {
                ['jpg', 'png', 'jpeg', 'webp'].forEach(function (x) {
                    var p = f + n + '.' + x;
                    if (list.indexOf(p) < 0) list.push(p);
                });
            });
        });
        return list.map(encodeURI);
    }
    function photo(c, k, extra) {
        var l = photoList(c);
        return '<span class="ph">' + cupSvg(c, k) +
            '<img src="' + esc(l[0]) + '" data-l="' + esc(l.join('|')) + '" data-i="0" alt="' + esc(c.name) + '" onerror="__cfImg(this)">' + (extra || '') + '</span>';
    }

    function creamy(c) {
        if (c.creamy != null) return c.creamy;
        if (!c.milk || c.milk === 'None') return 1;
        return /condensed/i.test(c.milk) ? 5 : /foam/i.test(c.milk) ? 4 : 3;
    }
    function bar(n10) { return '<div class="bar"><i style="width:' + Math.max(0, Math.min(100, n10 * 10)) + '%"></i></div>'; }

    /* ---------- skeleton ---------- */
    var cf = document.createElement('div');
    cf.className = 'cf';
    cf.setAttribute('role', 'dialog'); cf.setAttribute('aria-modal', 'true'); cf.setAttribute('aria-label', 'Coffee Journal');
    cf.innerHTML =
        '<div class="cf-top"><div class="cf-brand"><svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>Coffee Journal</div>' +
        '<button type="button" class="cf-x" id="cfClose" aria-label="Close">&times;</button></div>' +
        '<div class="cf-scroll">' +
          '<div class="cf-hero"><div class="cf-wrap"><h2>Good Coffee<br>Better Days</h2><p>Every cup has a story.</p><div class="cf-stats" id="cfStats"></div></div></div>' +
          '<div class="cf-wrap">' +
            '<div class="cf-bar"><h3><svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>My Coffee Collection</h3>' +
              '<input class="cf-search" id="cfSearch" type="search" placeholder="Search coffee..." aria-label="Search coffee">' +
              '<select class="cf-sort" id="cfSort" aria-label="Sort"><option value="rating">Highest Rated</option><option value="recent">Most Recent</option><option value="price">Lowest Price</option></select>' +
              '<div class="cf-chips" id="cfChips"></div></div>' +
            '<div class="cf-grid" id="cfGrid"></div>' +
            '<p class="cf-note">Good coffee. Good mood. The ratings and reviews are my own opinion.</p>' +
          '</div></div>';
    document.body.appendChild(cf);

    /* hero background photo: put it at Images/coffee-bg.jpg, or set  var COFFEE_BG = 'Images/your-photo.jpg';  in coffee-data.js */
    var bgPath = (typeof COFFEE_BG !== 'undefined' && COFFEE_BG) || 'Images/coffee-bg.jpg';
    cf.querySelector('.cf-hero').style.setProperty('--hero', 'url("' + encodeURI(bgPath) + '")');
    if (typeof COFFEE_BG_POS !== 'undefined' && COFFEE_BG_POS) cf.querySelector('.cf-hero').style.setProperty('--hero-pos', COFFEE_BG_POS);

    var cfd = document.createElement('div');
    cfd.className = 'cfd';
    cfd.setAttribute('role', 'dialog'); cfd.setAttribute('aria-modal', 'true');
    cfd.innerHTML = '<div class="cfd-panel" id="cfdPanel"></div>';
    document.body.appendChild(cfd);

    var grid = document.getElementById('cfGrid');
    var state = { q: '', type: 'All', sort: 'rating' };
    var built = false;

    function priceNum(c) { return parseFloat(String(c.price || '').replace(/[^0-9.]/g, '')) || 0; }
    function dateNum(c) { var t = Date.parse(c.date); return isNaN(t) ? 0 : t; }

    function stats() {
        var rated = COFFEE.filter(function (c) { return c.rating != null; });
        var avg = rated.length ? (rated.reduce(function (s, c) { return s + c.rating; }, 0) / rated.length).toFixed(1).replace(/\.0$/, '') : '-';
        var cafes = {}; COFFEE.forEach(function (c) { if (c.cafe) cafes[c.cafe] = 1; });
        var fav = rated.slice().sort(function (a, b) { return b.rating - a.rating; })[0];
        document.getElementById('cfStats').innerHTML =
            '<div class="cf-stat"><b>' + COFFEE.length + '</b><span>Coffees Tried</span></div>' +
            '<div class="cf-stat"><b>' + Object.keys(cafes).length + '</b><span>Caf\u00E9s Visited</span></div>' +
            '<div class="cf-stat"><b>' + avg + '<small>/10</small></b><span>Average Rating</span></div>' +
            '<div class="cf-stat fav"><b>' + esc(fav ? fav.name : '-') + '</b><span>Favorite Coffee</span></div>';
        reveal([].slice.call(document.querySelectorAll('#cfStats .cf-stat')));
    }

    /* anim = false -> no animation (used while typing in the search box) */
    function render(anim) {
        var q = state.q.toLowerCase();
        var items = COFFEE.map(function (c, i) { return { c: c, i: i }; }).filter(function (o) {
            return (state.type === 'All' || (o.c.type || 'Hot') === state.type) && (!q || o.c.name.toLowerCase().indexOf(q) > -1);
        });
        items.sort(function (a, b) {
            if (state.sort === 'price') return priceNum(a.c) - priceNum(b.c);
            if (state.sort === 'recent') return dateNum(b.c) - dateNum(a.c);
            return (b.c.rating == null ? -1 : b.c.rating) - (a.c.rating == null ? -1 : a.c.rating);
        });
        if (!items.length) { grid.innerHTML = '<p class="cf-empty">No coffee found.</p>'; return; }
        grid.innerHTML = '';
        items.forEach(function (o) {
            var c = o.c, b = document.createElement('button');
            b.type = 'button'; b.className = 'cf-card'; b.setAttribute('aria-label', c.name);
            b.innerHTML = photo(c, 'g' + o.i, '<span class="heart">&#9825;</span>') +
                '<span class="bd"><span class="nm">' + esc(c.name) + '</span>' +
                '<span class="row"><span class="pr">' + esc(c.price) + '</span>' +
                '<span class="rate' + (c.rating == null ? ' none' : '') + '">' + (c.rating == null ? 'Not rated' : '\u2605 ' + c.rating + '/10') + '</span></span>' +
                (c.cafe ? '<span class="cafe">' + esc(c.cafe) + '</span>' : '') +
                (c.date ? '<span class="dt">' + esc(c.date) + '</span>' : '') + '</span>';
            b.addEventListener('click', function () { openDetails(o.i); });
            grid.appendChild(b);
        });
        if (anim !== false) reveal([].slice.call(grid.children));
    }

    function build() {
        if (built) return; built = true;
        stats();
        var chips = document.getElementById('cfChips');
        ['All', 'Hot', 'Iced'].forEach(function (t) {
            var b = document.createElement('button');
            b.type = 'button'; b.className = 'cf-chip' + (t === 'All' ? ' on' : ''); b.textContent = t;
            b.addEventListener('click', function () {
                state.type = t;
                Array.prototype.forEach.call(chips.children, function (x) { x.classList.toggle('on', x === b); });
                render();
            });
            chips.appendChild(b);
        });
        document.getElementById('cfSearch').addEventListener('input', function (e) { state.q = e.target.value; render(false); });
        document.getElementById('cfSort').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
        render();
    }

    function openDetails(i) {
        var c = COFFEE[i], rated = c.rating != null;
        var tags = [c.type || 'Hot'];
        if (c.milk && c.milk !== 'None') tags.push(c.milk);
        if ((c.sweet || 0) >= 4) tags.push('Sweet'); else if ((c.strength || 0) >= 4) tags.push('Strong');
        var cafeBlock = c.cafe ?
            '<div class="cfd-cafe"><span class="logo">' + esc(c.cafe.split(' ').slice(0, 2).join(' ').toUpperCase()) + '</span><div><b>' + esc(c.cafe) + '</b><small>Coffee Shop' + (c.address ? ' \u00B7 ' + esc(c.address) : '') + '</small></div></div>' : '';
        var facts =
            (c.date ? '<div class="fact"><span class="k">Date Tried</span><span class="v">' + esc(c.date) + '</span></div>' : '') +
            '<div class="fact"><span class="k">Temperature</span><span class="v">' + esc(c.temp || c.type || 'Hot') + '</span></div>' +
            '<div class="fact"><span class="k">Sweetness</span><span class="v">' + bar((c.sweet || 0) * 2) + '</span><span class="n">' + (c.sweet || 0) * 2 + '/10</span></div>' +
            '<div class="fact"><span class="k">Creaminess</span><span class="v">' + bar(creamy(c) * 2) + '</span><span class="n">' + creamy(c) * 2 + '/10</span></div>' +
            '<div class="fact"><span class="k">Overall Rating</span><span class="v">' + bar(rated ? c.rating : 0) + '</span><span class="n">' + (rated ? c.rating + '/10' : '-') + '</span></div>';
        var review = c.verdict || c.review;
        document.getElementById('cfdPanel').innerHTML =
            '<button type="button" class="cfd-x" id="cfdClose" aria-label="Back">&larr; Back</button>' +
            photo(c, 'd') +
            '<div class="cfd-body">' +
              '<div class="cfd-title"><div><h3 class="cfd-name">' + esc(c.name) + '</h3>' +
              '<span class="cfd-pill">' + (rated ? '\u2605 ' + c.rating + '/10' : 'Not rated yet') + '</span></div><span class="cfd-price">' + esc(c.price) + '</span></div>' +
              '<div class="cfd-tags">' + tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
              '<p class="cfd-desc">' + esc(c.desc) + '</p>' + cafeBlock +
              '<div class="cfd-facts">' + facts + '</div>' +
              '<div class="cfd-review"><h4>My Review</h4><p' + (review ? '' : ' class="empty"') + '>' + (review ? esc(review) : 'Review coming soon.') + '</p></div>' +
            '</div>';
        document.getElementById('cfdClose').addEventListener('click', closeDetails);
        cfd.classList.add('open');
        document.getElementById('cfdPanel').scrollTop = 0;
    }
    function closeDetails() { cfd.classList.remove('open'); }
    function openMenu() { build(); cf.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function closeMenu() { closeDetails(); cf.classList.remove('open'); document.body.style.overflow = ''; }

    btn.addEventListener('click', openMenu);
    document.getElementById('cfClose').addEventListener('click', closeMenu);
    cfd.addEventListener('click', function (e) { if (e.target === cfd) closeDetails(); });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (cfd.classList.contains('open')) closeDetails();
        else if (cf.classList.contains('open')) closeMenu();
    });
})();
