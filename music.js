/* Music player logic. Edit your songs in music-data.js, not here. */
(function () {
    var mp = document.getElementById('mp');
    var stage = document.getElementById('mpStage');
    var titleEl = document.getElementById('mpTitle');
    var artistEl = document.getElementById('mpArtist');
    var noteEl = document.getElementById('mpNote');
    var seek = document.getElementById('mpSeek');
    var playIcon = document.getElementById('mpPlayIcon');

    var PLAY = '<polygon points="6 4 20 12 6 20 6 4"/>';
    var PAUSE = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    var NOTE = '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';

    var n = SONGS.length, cur = 0, playing = false, built = false, started = false;
    var audio = new Audio();
    audio.preload = 'metadata';
    var cards = [];

    /* entrance animation: the covers rise one after another every time the player opens */
    var srStyle = document.createElement('style');
    srStyle.textContent = '.mp.open .mp-card{animation:mpIn .7s cubic-bezier(.22,1,.36,1) calc(var(--i,0) * .07s) backwards}' +
                          '@keyframes mpIn{from{opacity:0;translate:0 70px}}' +
                          '@media (prefers-reduced-motion: reduce){.mp.open .mp-card{animation:none}}';
    document.head.appendChild(srStyle);

    /* ---------- background follows the song ---------- */
    var bgA = document.getElementById('mpBgA'), bgB = document.getElementById('mpBgB');
    var useA = true, lastBg = -1;
    function setBg(i) {
        if (i === lastBg) return;
        lastBg = i;
        var s = SONGS[i];
        var next = useA ? bgA : bgB, prev = useA ? bgB : bgA;
        next.style.backgroundImage = s.cover ? 'url("' + s.cover + '")'
                                             : 'linear-gradient(135deg,' + s.c1 + ',' + s.c2 + ')';
        next.classList.add('show');
        prev.classList.remove('show');
        useA = !useA;
    }

    /* ---------- cards ---------- */
    function build() {
        if (built) return;
        built = true;
        SONGS.forEach(function (s, i) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'mp-card';
            b.style.setProperty('--i', Math.min(i, 8));
            b.setAttribute('aria-label', s.title);
            if (s.cover) {
                b.innerHTML = '<img src="' + s.cover + '" alt="">';
            } else {
                b.innerHTML = '<div class="art" style="background:linear-gradient(135deg,' + s.c1 + ',' + s.c2 + ')">' + NOTE + '</div>';
            }
            b.addEventListener('click', function () {
                if (swiped) { swiped = false; return; }
                if (i === cur) toggle(); else go(i, true);
            });
            stage.appendChild(b);
            cards.push(b);
        });
    }

    function render() {
        var half = Math.floor(n / 2);
        cards.forEach(function (c, i) {
            var d = ((i - cur + half) % n + n) % n - half;
            var a = Math.abs(d), sgn = d < 0 ? -1 : 1;
            var x = d * 0.62;                                   /* in card widths */
            var ry = a === 0 ? 0 : -sgn * 42;
            var sc = Math.max(0.55, 1 - a * 0.14);
            c.style.transform = 'translate(-50%,-50%) translateX(calc(var(--cw) * ' + x + ')) rotateY(' + ry + 'deg) scale(' + sc + ')';
            c.style.zIndex = 10 - a;
            c.style.opacity = a > 3 ? 0 : (a === 0 ? 1 : Math.max(0.35, 0.95 - a * 0.2));
            c.style.filter = a === 0 ? 'none' : 'brightness(.7)';
            c.style.pointerEvents = a > 3 ? 'none' : 'auto';
        });
        titleEl.textContent = SONGS[cur].title;
        artistEl.textContent = SONGS[cur].artist;
        setBg(cur);
        notify();
    }

    /* tells the Home "Now Playing" card which song is on and whether it is playing */
    function notify() {
        var d = { index: cur, playing: playing, started: started };
        window.dispatchEvent(new CustomEvent('music-state', { detail: d }));
        try {                                   /* the page inside the frame (Home) wants to know too */
            var f = document.getElementById('view');
            var w = f && f.contentWindow;
            if (w && w.CustomEvent) w.dispatchEvent(new w.CustomEvent('music-state', { detail: d }));
        } catch (e) {}
    }
    window.getMusicState = function () { return { index: cur, playing: playing, started: started }; };

    /* ---------- audio ---------- */
    function load() {
        noteEl.textContent = '';
        audio.src = SONGS[cur].src;
        seek.value = 0;
        seek.style.setProperty('--p', '0%');
    }
    function setIcon() { playIcon.innerHTML = playing ? PAUSE : PLAY; notify(); }

    function play() {
        var p = audio.play();
        playing = true;
        setIcon();
        if (p && p.catch) p.catch(function () {
            playing = false;
            setIcon();
            noteEl.textContent = 'Add your song file: ' + SONGS[cur].src;
        });
    }
    function pause() { audio.pause(); playing = false; setIcon(); }
    function toggle() { playing ? pause() : play(); }

    function go(i, autoplay) {
        cur = ((i % n) + n) % n;
        load();
        render();
        if (autoplay || playing) play();
    }

    audio.addEventListener('error', function () {
        playing = false;
        setIcon();
        noteEl.textContent = 'Add your song file: ' + SONGS[cur].src;
    });
    audio.addEventListener('timeupdate', function () {
        if (!audio.duration) return;
        var p = (audio.currentTime / audio.duration) * 100;
        seek.value = p;
        seek.style.setProperty('--p', p + '%');
    });
    audio.addEventListener('ended', function () { go(cur + 1, true); });
    seek.addEventListener('input', function () {
        seek.style.setProperty('--p', seek.value + '%');
        if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
    });

    /* ---------- swipe ---------- */
    var sx = 0, down = false, swiped = false;
    stage.addEventListener('pointerdown', function (e) { sx = e.clientX; down = true; swiped = false; });
    stage.addEventListener('pointermove', function (e) {
        if (!down || swiped) return;
        var dx = e.clientX - sx;
        if (Math.abs(dx) > 40) { swiped = true; go(cur + (dx < 0 ? 1 : -1)); }
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
        stage.addEventListener(t, function () { down = false; });
    });

    /* ---------- buttons / open / close ---------- */
    document.getElementById('mpPrev').addEventListener('click', function () { go(cur - 1); });
    document.getElementById('mpNext').addEventListener('click', function () { go(cur + 1); });
    document.getElementById('mpPlay').addEventListener('click', toggle);

    function open() {
        build();
        if (!audio.src) load();
        render();
        mp.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (!started) { started = true; play(); }          /* first time: play by itself */
    }
    function close() {
        /* only hides the player - the music keeps playing in the background */
        mp.classList.remove('open');
        document.body.style.overflow = '';
    }

    var mb = document.getElementById('musicBtn');          /* only exists when this file runs on the Home page */
    if (mb) mb.addEventListener('click', open);
    window.openMusic = function (i) {
        var has = typeof i === 'number';
        if (has && !started) { cur = ((i % n) + n) % n; load(); }   /* start with the song that was tapped */
        open();
        if (has && started && i !== cur) go(i);
    };
    window.toggleMusic = function () {                     /* play / pause from the Home card */
        if (!audio.src) load();
        started = true;
        toggle();
    };
    window.selectSong = function (i) {                     /* choose the first song without playing it */
        if (started) return;
        cur = ((i % n) + n) % n;
        load();
        render();
    };
    document.getElementById('mpClose').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
        if (!mp.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowRight') go(cur + 1);
        if (e.key === 'ArrowLeft') go(cur - 1);
        if (e.key === ' ') { e.preventDefault(); toggle(); }
    });
})();
