/* Manhwa list logic. Edit your list in manhwa-data.js, not here. */
(function () {
    var mh = document.getElementById('mh');
    var grid = document.getElementById('mhGrid');
    var det = document.getElementById('mhd');
    var built = false;

    /* scroll animation: cards rise and fade in one after another when they come into view */
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

    function stars(score) {                       /* score out of 10 -> 5 stars */
        var pct = Math.max(0, Math.min(100, (score / 10) * 100));
        return '<span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;<i style="width:' + pct + '%">&#9733;&#9733;&#9733;&#9733;&#9733;</i></span>' +
               '<span class="score">' + score + ' / 10</span>';
    }

    function build() {
        if (built) return;
        built = true;
        document.getElementById('mhCount').textContent = MANHWA.length + ' titles';

        MANHWA.forEach(function (m, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'mh-card';
            b.style.setProperty('--g1', m.g1 || '#334155');
            b.style.setProperty('--g2', m.g2 || '#0f172a');
            b.setAttribute('aria-label', m.title);

            var img = document.createElement('img');
            img.alt = m.title;
            img.src = m.cover;
            img.onerror = function () { img.remove(); };          /* no picture yet -> colour card */
            b.appendChild(img);

            var badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = '\u2605 ' + m.overall;
            b.appendChild(badge);

            var name = document.createElement('span');
            name.className = 'name';
            name.textContent = m.title;
            b.appendChild(name);

            b.addEventListener('click', function () { openDetails(i); });
            grid.appendChild(b);
        });

        reveal([].slice.call(grid.children));
    }

    function openDetails(i) {
        var m = MANHWA[i];
        /* the Home "Now Reading" card follows the manhwa you open */
        try { localStorage.setItem('nowReading', String(i)); } catch (e) {}
        window.dispatchEvent(new CustomEvent('manhwa-state', { detail: { index: i } }));
        var cover = document.getElementById('mhdCover');
        cover.style.setProperty('--g1', m.g1 || '#334155');
        cover.style.setProperty('--g2', m.g2 || '#0f172a');

        var old = cover.querySelector('img');
        if (old) old.remove();
        var img = document.createElement('img');
        img.alt = m.title;
        img.src = m.cover;
        img.onerror = function () { img.remove(); };
        cover.insertBefore(img, cover.firstChild);

        document.getElementById('mhdTitle').textContent = m.title;
        document.getElementById('mhdRating').textContent = '\u2605 ' + m.rating;
        document.getElementById('mhdMc').textContent = m.mc;
        document.getElementById('mhdArt').textContent = m.art;
        document.getElementById('mhdStory').textContent = m.story;
        document.getElementById('mhdOverall').innerHTML = stars(m.overall);

        det.classList.add('open');
        det.querySelector('.mhd-panel').scrollTop = 0;
    }
    function closeDetails() { det.classList.remove('open'); }

    function openList() {
        build();
        mh.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeList() {
        closeDetails();
        mh.classList.remove('open');
        document.body.style.overflow = '';
    }

    document.getElementById('manhwaBtn').addEventListener('click', openList);
    window.openManhwa = function (i) { openList(); openDetails(i); };
    document.getElementById('mhClose').addEventListener('click', closeList);
    document.getElementById('mhdClose').addEventListener('click', closeDetails);
    det.addEventListener('click', function (e) { if (e.target === det) closeDetails(); });
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (det.classList.contains('open')) closeDetails();
        else if (mh.classList.contains('open')) closeList();
    });
})();
