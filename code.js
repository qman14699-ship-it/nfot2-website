/* My Code Library - no need to edit. Your projects are in code-data.js
   Tap the "Coding" icon on the Home page to open it.
   Styles are in code.css */
(function () {
    if (typeof CODE_PROJECTS === 'undefined') return;
    var P = CODE_PROJECTS;
    var filter = 'all', cur = 0;

    /* ---------- icons ---------- */
    var PY = '<svg viewBox="0 0 24 24"><path fill="#3776AB" d="M12 2C8 2 8.3 3.7 8.3 3.7v2H12v.7H6.6S4 6.1 4 10s2.3 3.8 2.3 3.8h1.4v-1.8s-.1-2.3 2.2-2.3h3.7s2.1 0 2.1-2V4.3S16 2 12 2zM9.9 3.4a.7.7 0 1 1 0 1.3.7.7 0 0 1 0-1.3z"/><path fill="#FFC331" d="M12 22c4 0 3.7-1.7 3.7-1.7v-2H12v-.7h5.4S20 17.9 20 14s-2.3-3.8-2.3-3.8h-1.4v1.8s.1 2.3-2.2 2.3h-3.7s-2.1 0-2.1 2v3.4S8 22 12 22zm2.1-1.4a.7.7 0 1 1 0-1.3.7.7 0 0 1 0 1.3z"/></svg>';
    var HT = '<svg viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>';

    /* small line icons (no emoji) */
    var ICONS = {
        tree:     '<circle cx="12" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M12 7v5M6 17v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>',
        palette:  '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.5-1.9-.3-1 .4-2.1 1.5-2.1H17a4 4 0 0 0 4-4c0-5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
        heart:    '<path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21.8l8.8-8.8a5.2 5.2 0 0 0 0-7.4z"/>',
        globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
        user:     '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        loop:     '<path d="M6 8a4 4 0 1 0 0 8c4 0 8-8 12-8a4 4 0 1 1 0 8c-4 0-8-8-12-8z"/>',
        code:     '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
        calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/>',
        tag:      '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1"/>',
        bars:     '<path d="M5 20v-6M12 20V4M19 20v-10"/>',
        eye:      '<path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
        term:     '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
        file:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
        chev:     '<polyline points="9 18 15 12 9 6"/>',
        back:     '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'
    };
    function ico(name) { return '<svg class="cl-svg" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.code) + '</svg>'; }

    /* ---------- helpers ---------- */
    function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

    /* colours the code a little (comments, strings, tags, numbers, keywords) */
    function hl(code, lang) {
        var s = esc(code), re;
        if (lang === 'python') {
            re = /(#[^\n]*)|("""[\s\S]*?"""|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|\b(\d+(?:\.\d+)?)\b|\b(def|class|import|from|for|while|if|elif|else|in|return|and|or|not|break|continue|pass|with|as|try|except|True|False|None|print|input|int|range|len|str|float)\b/g;
            return s.replace(re, function (m, c, q, n) {
                return '<span class="' + (c ? 'c' : q ? 's' : n ? 'n' : 'k') + '">' + m + '</span>';
            });
        }
        re = /(&lt;!--[\s\S]*?--&gt;|\/\*[\s\S]*?\*\/|\/\/[^\n]*)|("(?:\\.|[^"\\\n])*"|`(?:\\.|[^`\\])*`)|(&lt;\/?[a-zA-Z][\w-]*|\/?&gt;)|(#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?\b)|\b(function|const|let|var|return|document|window|true|false|null)\b/g;
        return s.replace(re, function (m, c, q, t, n) {
            return '<span class="' + (c ? 'c' : q ? 's' : t ? 't' : n ? 'n' : 'k') + '">' + m + '</span>';
        });
    }

    function copyText(text, btn) {
        function done() { btn.textContent = 'Copied!'; setTimeout(function () { btn.textContent = 'Copy Code'; }, 1500); }
        function fallback() {
            var t = document.createElement('textarea');
            t.value = text;
            document.body.appendChild(t);
            t.select();
            try { document.execCommand('copy'); done(); } catch (e) {}
            t.remove();
        }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(fallback);
        else fallback();
    }
    function download(p) {
        var a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([p.code], { type: 'text/plain' }));
        a.download = p.file || (p.name + (p.lang === 'python' ? '.py' : '.html'));
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    }
    function fullscreen(p) {
        var w = window.open('', '_blank');
        if (!w) return;
        w.document.open();
        w.document.write(p.code);
        w.document.close();
    }

    /* ---------- skeleton ---------- */
    var cl = document.createElement('div');
    cl.className = 'cl';
    cl.setAttribute('role', 'dialog');
    cl.setAttribute('aria-modal', 'true');
    cl.setAttribute('aria-label', 'My Code Library');
    cl.innerHTML =
        '<div class="cl-wrap">' +
          '<button type="button" class="cl-back" id="clBack">' + ico('back') + 'Back to Home</button>' +
          '<div class="cl-head"><div>' +
            '<p class="cl-eyebrow">Portfolio</p>' +
            '<h2 class="cl-title">My <em>Code</em> Library</h2>' +
            '<p class="cl-sub">A collection of my coding projects and experiments.</p>' +
          '</div><div class="cl-stats" id="clStats"></div></div>' +
          '<div class="cl-chips" id="clChips"></div>' +
          '<div class="cl-main"><div class="cl-list" id="clList"></div><div class="cl-detail" id="clDetail"></div></div>' +
        '</div>';
    document.body.appendChild(cl);

    var elStats = cl.querySelector('#clStats'), elChips = cl.querySelector('#clChips'),
        elList = cl.querySelector('#clList'), elDetail = cl.querySelector('#clDetail');

    function pad(n) { return n < 10 ? '0' + n : String(n); }
    function count(l) { return P.filter(function (p) { return p.lang === l; }).length; }

    elStats.innerHTML =
        '<div class="cl-stat"><b>' + pad(count('html')) + '</b><span>HTML Projects</span></div>' +
        '<div class="cl-stat"><b>' + pad(count('python')) + '</b><span>Python Programs</span></div>' +
        '<div class="cl-stat"><b>' + pad(P.length) + '</b><span>Total Projects</span></div>';

    [['all', 'All Projects'], ['html', 'HTML'], ['python', 'Python']].forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'cl-chip' + (c[0] === 'all' ? ' on' : '');
        b.textContent = c[1];
        b.addEventListener('click', function () {
            filter = c[0];
            Array.prototype.forEach.call(elChips.children, function (x) { x.classList.toggle('on', x === b); });
            var vis = visible();
            if (vis.indexOf(cur) < 0) cur = vis.length ? vis[0] : 0;
            renderList();
            renderDetail();
        });
        elChips.appendChild(b);
    });

    function visible() {
        var out = [];
        P.forEach(function (p, i) { if (filter === 'all' || p.lang === filter) out.push(i); });
        return out;
    }

    function renderList() {
        elList.innerHTML = '';
        visible().forEach(function (i) {
            var p = P[i], b = document.createElement('button');
            b.type = 'button';
            b.className = 'cl-item' + (i === cur ? ' on' : '');
            b.innerHTML = '<span class="cl-ic">' + ico(p.icon || 'code') + '</span><span><b>' + esc(p.name) + '</b><small>' + esc(p.sub || '') + '</small></span><span class="cl-chev">' + ico('chev') + '</span>';
            b.addEventListener('click', function () {
                cur = i;
                renderList();
                renderDetail();
                if (window.innerWidth < 900) elDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            elList.appendChild(b);
        });
    }

    function renderDetail() {
        var vis = visible();
        if (!vis.length) { elDetail.innerHTML = '<p class="cl-empty">No projects yet.</p>'; return; }
        var p = P[cur], isPy = p.lang === 'python';
        var lines = p.code.replace(/\n$/, '').split('\n').length, nums = [];
        for (var n = 1; n <= lines; n++) nums.push(n);

        var meta = '';
        if (p.created)    meta += '<div class="cl-m">' + ico('calendar') + '<div><small>Created</small><b>' + esc(p.created) + '</b></div></div>';
        if (p.category)   meta += '<div class="cl-m">' + ico('tag') + '<div><small>Category</small><b>' + esc(p.category) + '</b></div></div>';
        if (p.difficulty) meta += '<div class="cl-m">' + ico('bars') + '<div><small>Difficulty</small><b>' + esc(p.difficulty) + '</b></div></div>';

        var prevBody = isPy
            ? '<pre class="cl-term">' + esc(p.output || '') + '</pre>'
            : '<iframe class="cl-frame" title="Live preview" sandbox="allow-scripts allow-popups allow-forms"></iframe>';
        var outBody = isPy
            ? '<pre class="cl-term"><span class="p">$ python ' + esc(p.file || 'program.py') + '</span>\n' + esc(p.output || '') + '</pre>'
            : '<div class="cl-note">HTML projects run in the browser, so see the <b>Preview</b> tab for the result.<br><button type="button" class="cl-full" id="clFull">Open full screen</button></div>';

        elDetail.innerHTML =
            '<div class="cl-dh"><div class="cl-dlogo">' + (isPy ? PY : HT) + '</div><div>' +
              '<div class="cl-dt"><h3>' + esc(p.name) + '</h3><span class="cl-pill">' + (isPy ? 'Python' : 'HTML') + '</span></div>' +
              '<p class="cl-desc">' + esc(p.desc || '') + '</p></div></div>' +
            '<div class="cl-meta">' + meta + '</div>' +
            '<div class="cl-tabs" id="clTabs">' +
              '<button type="button" class="cl-tab on" data-tab="preview">' + ico('eye') + 'Preview</button>' +
              '<button type="button" class="cl-tab" data-tab="source">' + ico('code') + 'Source Code</button>' +
              '<button type="button" class="cl-tab" data-tab="output">' + ico('term') + 'Output</button>' +
            '</div>' +
            '<div class="cl-view" id="clView" data-tab="preview">' +
              '<div class="cl-pane cl-prev"><div class="cl-bar"><span class="cl-live"></span>Live Preview<span class="cl-lights"><i></i><i></i><i></i></span></div><div class="cl-body">' + prevBody + '</div></div>' +
              '<div class="cl-pane cl-src"><div class="cl-bar">' + ico('file') + esc(p.file || '') + '<button type="button" class="cl-copy" id="clCopy">Copy Code</button></div>' +
                '<div class="cl-code"><pre class="cl-ln">' + nums.join('\n') + '</pre><pre class="cl-pre">' + hl(p.code, p.lang) + '</pre></div></div>' +
              '<div class="cl-pane cl-out"><div class="cl-bar">Output</div><div class="cl-body">' + outBody + '</div></div>' +
            '</div>' +
            '<div class="cl-foot"><div><h4>Project Details</h4><p>' + esc(p.details || p.desc || '') + '</p></div>' +
              '<button type="button" class="cl-dl" id="clDl">' + ico('download') + 'Download Project</button></div>' +
            '<p class="cl-quote">Code. Learn. Improve.</p>';

        if (!isPy) elDetail.querySelector('.cl-frame').srcdoc = p.code;

        var view = elDetail.querySelector('#clView');
        var tabs = elDetail.querySelectorAll('.cl-tab');
        Array.prototype.forEach.call(tabs, function (t) {
            t.addEventListener('click', function () {
                view.setAttribute('data-tab', t.getAttribute('data-tab'));
                Array.prototype.forEach.call(tabs, function (x) { x.classList.toggle('on', x === t); });
            });
        });
        var cb = elDetail.querySelector('#clCopy');
        cb.addEventListener('click', function () { copyText(p.code, cb); });
        elDetail.querySelector('#clDl').addEventListener('click', function () { download(p); });
        var fb = elDetail.querySelector('#clFull');
        if (fb) fb.addEventListener('click', function () { fullscreen(p); });

        elDetail.classList.remove('swap');
        void elDetail.offsetWidth;
        elDetail.classList.add('swap');
    }

    /* ---------- open / close ---------- */
    function openLib(e) {
        if (e) e.preventDefault();
        var vis = visible();
        if (vis.indexOf(cur) < 0) cur = vis.length ? vis[0] : 0;
        renderList();
        renderDetail();
        cl.scrollTop = 0;
        cl.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeLib() {
        cl.classList.remove('open');
        document.body.style.overflow = '';
        elDetail.innerHTML = '';          /* stops any music playing inside a preview */
    }
    cl.querySelector('#clBack').addEventListener('click', closeLib);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && cl.classList.contains('open')) closeLib();
    });
    window.openCodeLibrary = openLib;

    /* ---------- hook the "Coding" icon on Home ---------- */
    function hook() {
        var targets = [], byId = document.getElementById('codeBtn');
        if (byId) targets.push(byId);
        else {
            var all = document.querySelectorAll('.loves > *');
            for (var i = 0; i < all.length; i++) {
                if (/^coding$/i.test((all[i].textContent || '').trim())) targets.push(all[i]);
            }
        }
        targets.forEach(function (t) {
            t.style.cursor = 'pointer';
            t.addEventListener('click', openLib);
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hook);
    else hook();
})();
