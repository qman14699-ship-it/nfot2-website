/* Shared navigation for every page.
   - removes the old "Welcome to My Personal Website" header and the orange nav
   - inserts the new nav at the top and highlights the current page
   To add/rename a link, edit LINKS below. */
(function () {
    /* every page opens inside app.html, so the music keeps playing when you change pages */
    if (window.top === window.self && !/app\.html$/i.test(location.pathname)) {
        var here = location.pathname.split('/').pop() || 'index.html';
        if (/^[\w-]+\.html$/i.test(here)) { location.replace('app.html#' + here); return; }
    }

    var ICONS = {
        home:    '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
        about:   '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        skills:  '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        gallery: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
        contact: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        logout:  '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'
    };

    function inner(icon, label) {
        return '<svg class="ico" viewBox="0 0 24 24">' + ICONS[icon] + '</svg><span class="lbl">' + label + '</span>';
    }

    var LINKS = [
        { label: 'Home', icon: 'home', href: 'index.html' },
        {
            label: 'About', icon: 'about',
            children: [
                { label: 'My Goals as a Student', href: 'goals.html' },
                { label: 'Fun Facts About Me',    href: 'funfacts.html' }
            ]
        },
        { label: 'Skills',  icon: 'skills',  href: 'skills.html' },
        { label: 'Gallery', icon: 'gallery', href: 'gallery.html' },
        { label: 'Contact', icon: 'contact', href: 'contact.html' }
    ];

    // fonts (only added once)
    if (!document.getElementById('nav-fonts')) {
        var f = document.createElement('link');
        f.id = 'nav-fonts';
        f.rel = 'stylesheet';
        f.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@400;500&display=swap';
        document.head.appendChild(f);
    }


    /* remove the blank white box left under the nav.
       Looks at what is actually drawn right below the nav bar and deletes it if it has no text/pictures. */
    function isBlank(n) {
        /* form fields, buttons, pictures etc. are never "blank boxes" */
        if (n.matches && n.matches('input,textarea,select,button,img,video,audio,iframe,canvas,svg,label,a')) return false;
        return !(n.innerText || '').trim() &&
               !n.querySelector('img,video,audio,iframe,canvas,svg,input,textarea,select,button');
    }
    function isPainted(n) {
        var cs = getComputedStyle(n);
        var bg = cs.backgroundColor;
        var clear = (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent');
        return !clear || cs.backgroundImage !== 'none' || cs.boxShadow !== 'none' ||
               parseFloat(cs.borderTopWidth) > 0;
    }
    function pruneBlank() {
        var cls = document.body.classList;
        if (cls.contains('gallery-page') || cls.contains('home-page')) return;
        var bar = document.querySelector('.site-nav');
        if (!bar) return;
        var vw = window.innerWidth;

        for (var pass = 0; pass < 4; pass++) {
            var found = null;
            var start = 0;
            // scan down the middle of the page, just under the nav, looking for an empty drawn box
            for (var y = start + 2; y < start + 420 && !found; y += 8) {
                var el = document.elementFromPoint(Math.round(vw / 2), y);
                if (!el || el === document.body || el === document.documentElement || bar.contains(el)) continue;
                var cand = null;
                for (var n = el; n && n !== document.body; n = n.parentElement) {
                    if (isBlank(n) && !/^(FOOTER|SCRIPT|STYLE)$/.test(n.tagName)) cand = n; else break;
                }
                if (cand && isPainted(cand) &&
                    cand.offsetHeight >= 24 && cand.offsetHeight <= 320 &&
                    cand.offsetWidth > vw * 0.4) found = cand;
            }
            if (!found) break;
            found.remove();
        }
    }

    /* tidy footer text + keep footer at the bottom of the screen (no blank gap under it) */
    function placeFooter() {
        var ft = document.querySelector('footer');
        if (!ft || document.body.classList.contains('home-page')) return;
        ft.style.marginTop = '0px';
        var bottom = ft.getBoundingClientRect().bottom + window.pageYOffset;
        var gap = window.innerHeight - bottom;
        if (gap > 0) ft.style.marginTop = gap + 'px';
    }
    function fixFooter() {
        var ft = document.querySelector('footer');
        if (!ft) return;
        document.querySelectorAll('footer p').forEach(function (p) {
            p.innerHTML = p.innerHTML.replace(/Your Name/g, 'Kevin Bandong').replace(/2024/g, '2026');
        });
    }
    function settle() {
        pruneBlank();
        placeFooter();
    }

    /* scroll animation: items fade/rise in when they scroll into view, one after another */
    function setupReveal() {
        if (!('IntersectionObserver' in window)) return;
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        var SEL = '.eyebrow-l, h1.title, .lead, .tap-hint, .hero-text > *, .photo, .loves > *, .tabs, ' +
                  '.card, .fact, .quote, .field, .send, .find, .gallery-title, .wall, .flow-wrap, .flow-hint, ' +
                  '.now-card, .stat, .tl-eyebrow, .tl-title, .tl-item';

        var io = new IntersectionObserver(function (entries) {
            var seen = entries.filter(function (e) { return e.isIntersecting; }).sort(function (a, b) {
                var A = a.boundingClientRect, B = b.boundingClientRect;
                return (A.top - B.top) || (A.left - B.left);
            });
            seen.forEach(function (e, i) {
                e.target.style.setProperty('--d', (Math.min(i, 8) * 0.08).toFixed(2) + 's');
                e.target.classList.add('in');
                io.unobserve(e.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

        function reg(el) {
            if (el.classList.contains('reveal')) return;
            if (el.closest('.site-nav, .nav-row, .mp, .mh, .mhd, .cmodal, .lb')) return;
            el.classList.add('reveal');
            io.observe(el);
        }
        document.querySelectorAll(SEL).forEach(reg);

        /* cards that are created later (Skills tabs) animate too */
        new MutationObserver(function (muts) {
            muts.forEach(function (m) {
                m.addedNodes.forEach(function (n) {
                    if (n.nodeType === 1 && n.matches && n.matches(SEL)) reg(n);
                });
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    /* gallery pop-up: hide the sample texts ("Photo 4", "Write something about this photo here.") */
    function hidePlaceholders() {
        var t = document.getElementById('lbTitle'), d = document.getElementById('lbDesc');
        if (!t || !d) return;
        function check() {
            var tt = (t.textContent || '').trim(), dd = (d.textContent || '').trim();
            t.style.display = /^(photo|video)\s*\d+$/i.test(tt) ? 'none' : '';
            d.style.display = /^write something/i.test(dd) ? 'none' : '';
        }
        var opts = { childList: true, characterData: true, subtree: true };
        new MutationObserver(check).observe(t, opts);
        new MutationObserver(check).observe(d, opts);
        check();
    }

    function build() {
        // professional touches: tab icon + browser bar colour (added automatically on every page)
        if (!document.querySelector('link[rel~="icon"]')) {
            var ic = document.createElement('link');
            ic.rel = 'icon';
            ic.href = 'data:image/svg+xml,' + encodeURIComponent(
                "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='#0F172A'/>" +
                "<text x='32' y='46' font-family='Georgia,serif' font-size='40' font-weight='700' text-anchor='middle' fill='#F97316'>K</text></svg>");
            document.head.appendChild(ic);
        }
        if (!document.querySelector('meta[name="theme-color"]')) {
            var tc = document.createElement('meta');
            tc.name = 'theme-color';
            tc.content = '#0B1220';
            document.head.appendChild(tc);
        }

        // remove old header + old nav (and any hard-coded new nav)
        document.querySelectorAll('.site-nav').forEach(function (n) { n.remove(); });
        document.querySelectorAll('header').forEach(function (h) {
            if (/welcome to my personal website/i.test(h.textContent)) h.remove();
        });
        document.querySelectorAll('nav').forEach(function (n) {
            if (/log\s*out/i.test(n.textContent) || /home/i.test(n.textContent)) n.remove();
        });

        var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

        var bar = document.createElement('div');
        bar.className = 'site-nav';

        var links = document.createElement('div');
        links.className = 'site-links';

        var topHrefs = LINKS.filter(function (l) { return l.href; })
                            .map(function (l) { return l.href.toLowerCase(); });

        LINKS.forEach(function (l) {
            if (l.children) {
                var wrap = document.createElement('div');
                wrap.className = 'dropdown';

                var btn = document.createElement('a');
                btn.className = 'dropbtn';
                btn.href = '#';
                btn.title = l.label;
                btn.innerHTML = inner(l.icon, l.label);

                var menu = document.createElement('div');
                menu.className = 'dropdown-menu';

                l.children.forEach(function (c) {
                    var a = document.createElement('a');
                    a.href = c.href;
                    a.textContent = c.label;
                    if (c.href.toLowerCase() === page) {
                        a.className = 'active';
                        if (topHrefs.indexOf(page) === -1) btn.classList.add('active');
                    }
                    menu.appendChild(a);
                });

                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    wrap.classList.toggle('open');
                });

                wrap.appendChild(btn);
                wrap.appendChild(menu);
                links.appendChild(wrap);
            } else {
                var a = document.createElement('a');
                a.href = l.href;
                a.title = l.label;
                a.innerHTML = inner(l.icon, l.label);
                if (l.href.toLowerCase() === page) a.className = 'active';
                links.appendChild(a);
            }
        });
        bar.appendChild(links);

        var out = document.createElement('a');
        out.className = 'logout-link';
        out.href = '#';
        out.title = 'Log out';
        out.innerHTML = inner('logout', 'Log out');
        out.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
                localStorage.removeItem('isLoggedIn');
                (window.top || window).location.href = 'login.html';
            }
        });
        bar.appendChild(out);

        document.body.insertBefore(bar, document.body.firstChild);

        var cls = document.body.classList;
        var box = document.querySelector('.hero-bg');

        if (box) {
            // Home: nav inside the photo box
            box.insertBefore(bar, box.firstChild);
        } else if (!cls.contains('gallery-page')) {
            // other pages: nav inside the main white box (the card that holds the page title)
            var card = null;
            var heads = document.querySelectorAll('h1, h2');
            for (var i = 0; i < heads.length && !card; i++) {
                var hd = heads[i];
                if (bar.contains(hd) || hd.closest('footer') || hd.closest('.cmodal')) continue;
                card = hd.closest('section') || hd.closest('main, article');
            }
            if (card && card !== document.body) {
                // own full-width row, so it also works when the card is a flex / grid box (Contact page)
                var row = document.createElement('div');
                row.className = 'nav-row';
                row.appendChild(bar);
                card.insertBefore(row, card.firstChild);
                bar.classList.add('in-box');
                card.classList.add('full-box');                 // big edge-to-edge box, like Home
                if (/flex/.test(getComputedStyle(card).display)) card.style.flexWrap = 'wrap';
            }
        }

        fixFooter();
        settle();
        setupReveal();
        hidePlaceholders();
        window.addEventListener('load', settle);
        window.addEventListener('resize', placeFooter);
        setTimeout(settle, 300);
        setTimeout(settle, 1000);

        // close dropdown when tapping elsewhere
        document.addEventListener('click', function () {
            bar.querySelectorAll('.dropdown.open').forEach(function (d) { d.classList.remove('open'); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
