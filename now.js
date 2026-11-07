/* ============================================================
   HOME: "Now Playing" + "Now Reading" cards, and the animated numbers.
   Change what is shown by editing the lines below.
   ============================================================ */
const NOW = {
    song:   'Sailor',                          /* a title from music-data.js   */
    manhwa: 'Return of the Mount Hua Sect'     /* a title from manhwa-data.js  */
};

const STATS = [
    /* counted automatically from photos.js (same 300 limit as the Gallery page) */
    { label: 'Photos', value: function () { return (typeof PHOTOS !== 'undefined') ? Math.min(PHOTOS.length, 300) : 0; } },
    { label: 'Songs',  value: function () { return SONGS.length; } }, /* counted automatically           */
    { label: 'Manhwa', value: function () { return MANHWA.length; } },/* counted automatically           */
    { label: 'Skills', value: 13 }
];

(function () {
    var anchor = document.querySelector('.loves');
    if (!anchor || typeof SONGS === 'undefined' || typeof MANHWA === 'undefined') return;

    /* the music player lives in app.html (the page around this one), so the music never stops */
    var HOST = window;
    try { if (window.parent && window.parent !== window && window.parent.openMusic) HOST = window.parent; } catch (e) {}

    function find(list, title) {
        for (var i = 0; i < list.length; i++) if (list[i].title === title) return i;
        return 0;
    }
    var si = find(SONGS, NOW.song), mi = find(MANHWA, NOW.manhwa);
    /* remember the last manhwa you opened */
    try {
        var saved = parseInt(localStorage.getItem('nowReading'), 10);
        if (saved >= 0 && saved < MANHWA.length) mi = saved;
    } catch (e) {}
    var song = SONGS[si], mw = MANHWA[mi];

    function thumb(cover, g1, g2) {
        var d = document.createElement('span');
        d.className = 'thumb';
        d.style.background = 'linear-gradient(135deg,' + (g1 || '#334155') + ',' + (g2 || '#0f172a') + ')';
        if (cover) {
            var img = new Image();
            img.alt = '';
            img.src = cover;
            img.onerror = function () { img.remove(); };
            d.appendChild(img);
        }
        return d;
    }

    function card(cls, labelHtml, title, sub, th, onClick) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'now-card ' + cls;
        b.appendChild(th);

        var meta = document.createElement('span');
        meta.className = 'meta';
        var lbl = document.createElement('span'); lbl.className = 'lbl'; lbl.innerHTML = labelHtml;
        var st = document.createElement('strong'); st.textContent = title;
        var sm = document.createElement('small'); sm.textContent = sub;
        meta.appendChild(lbl); meta.appendChild(st); meta.appendChild(sm);
        b.appendChild(meta);

        b.addEventListener('click', onClick);
        return b;
    }

    var now = document.createElement('div');
    now.className = 'now';
    /* ---------- "Now Playing": follows the real player ---------- */
    var PLAY_SVG  = '<svg viewBox="0 0 24 24"><polygon points="7 4 20 12 7 20 7 4"/></svg>';
    var PAUSE_SVG = '<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';

    var playCard = document.createElement('div');
    playCard.className = 'now-card play';
    playCard.setAttribute('role', 'button');
    playCard.tabIndex = 0;

    var th = thumb(song.cover, song.c1, song.c2);
    playCard.appendChild(th);

    var meta = document.createElement('span');
    meta.className = 'meta';
    var lbl = document.createElement('span');
    lbl.className = 'lbl';
    lbl.innerHTML = '<i class="eq"><b></b><b></b><b></b></i><span class="lt">Now Playing</span>';
    var st = document.createElement('strong');
    var sm = document.createElement('small');
    meta.appendChild(lbl); meta.appendChild(st); meta.appendChild(sm);
    playCard.appendChild(meta);

    var tg = document.createElement('button');
    tg.type = 'button';
    tg.className = 'np-toggle';
    tg.setAttribute('aria-label', 'Play or pause');
    tg.innerHTML = PLAY_SVG;
    playCard.appendChild(tg);

    var shown = si;
    function showSong(i, playing, started) {
        var s = SONGS[i];
        shown = i;
        st.textContent = s.title;
        sm.textContent = s.artist;

        th.style.background = 'linear-gradient(135deg,' + (s.c1 || '#334155') + ',' + (s.c2 || '#0f172a') + ')';
        th.innerHTML = '';
        if (s.cover) {
            var img = new Image();
            img.alt = '';
            img.src = s.cover;
            img.onerror = function () { img.remove(); };
            th.appendChild(img);
        }

        lbl.querySelector('.lt').textContent = (!playing && started) ? 'Paused' : 'Now Playing';
        playCard.classList.toggle('is-playing', !!playing);
        tg.innerHTML = playing ? PAUSE_SVG : PLAY_SVG;
    }
    showSong(si, false, false);

    /* the player tells us every time the song or the play / pause state changes */
    window.addEventListener('music-state', function (e) {
        showSong(e.detail.index, e.detail.playing, e.detail.started);
    });
    var ms = HOST.getMusicState ? HOST.getMusicState() : null;
    if (ms && ms.started) showSong(ms.index, ms.playing, true);   /* music already on: show what is playing */
    else if (HOST.selectSong) HOST.selectSong(si);                 /* otherwise: the first song is the one shown */

    var mbtn = document.getElementById('musicBtn');
    if (mbtn) mbtn.addEventListener('click', function () { if (HOST.openMusic) HOST.openMusic(); });

    tg.addEventListener('click', function (e) {
        e.stopPropagation();
        if (HOST.toggleMusic) HOST.toggleMusic();
    });
    playCard.addEventListener('click', function () { if (HOST.openMusic) HOST.openMusic(shown); });
    playCard.addEventListener('keydown', function (e) {
        if (e.target === playCard && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); if (HOST.openMusic) HOST.openMusic(shown); }
    });
    now.appendChild(playCard);

    /* ---------- "Now Reading": shows the manhwa you opened last ---------- */
    var book = mi;
    var readCard = card('read', 'Now Reading',
        mw.title, '\u2605 ' + mw.overall + ' / 10', thumb(mw.cover, mw.g1, mw.g2),
        function () { if (window.openManhwa) window.openManhwa(book); });
    now.appendChild(readCard);

    function showBook(i) {
        var m = MANHWA[i];
        if (!m) return;
        book = i;
        readCard.querySelector('strong').textContent = m.title;
        readCard.querySelector('small').textContent = '\u2605 ' + m.overall + ' / 10';

        var t = readCard.querySelector('.thumb');
        t.style.background = 'linear-gradient(135deg,' + (m.g1 || '#334155') + ',' + (m.g2 || '#0f172a') + ')';
        t.innerHTML = '';
        if (m.cover) {
            var img = new Image();
            img.alt = '';
            img.src = m.cover;
            img.onerror = function () { img.remove(); };
            t.appendChild(img);
        }
    }
    window.addEventListener('manhwa-state', function (e) { showBook(e.detail.index); });

    var stats = document.createElement('div');
    stats.className = 'stats';
    STATS.forEach(function (s) {
        var v = typeof s.value === 'function' ? s.value() : s.value;
        var el = document.createElement('div');
        el.className = 'stat';
        el.innerHTML = '<span class="num" data-to="' + v + '">0</span><span class="lab">' + s.label + '</span>';
        stats.appendChild(el);
    });

    anchor.parentNode.insertBefore(now, anchor.nextSibling);
    anchor.parentNode.insertBefore(stats, now.nextSibling);

    /* numbers count up when they come into view */
    var nums = stats.querySelectorAll('.num');
    function run() {
        nums.forEach(function (n) {
            var to = +n.getAttribute('data-to'), t0 = null;
            function step(t) {
                if (t0 === null) t0 = t;
                var p = Math.min(1, (t - t0) / 1400);
                var e = 1 - Math.pow(1 - p, 3);
                n.textContent = Math.round(to * e);
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
        nums.forEach(function (n) { n.textContent = n.getAttribute('data-to'); });
    } else {
        var io = new IntersectionObserver(function (es) {
            if (es[0].isIntersecting) { run(); io.disconnect(); }
        }, { threshold: 0.4 });
        io.observe(stats);
    }
})();
