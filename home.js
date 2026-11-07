/* typing effect: edit the words here */
(function () {
    var words = ['Manhwa Reader', 'Music Lover', 'Coffee Addict'];
    var el = document.getElementById('typed');
    var w = 0, c = 0, del = false;

    function tick() {
        var word = words[w];
        c += del ? -1 : 1;
        el.textContent = word.slice(0, c);

        var wait = del ? 45 : 95;
        if (!del && c === word.length) { del = true; wait = 1400; }
        else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 400; }
        setTimeout(tick, wait);
    }
    tick();
})();
