/* My Code Library - project: My Student Profile (kept in its own file so every file stays small) */
CODE_PROJECTS.push({
    lang: 'html',
    name: 'My Student Profile',
    sub: 'HTML • Conditions',
    icon: 'user',
    file: 'student-profile.html',
    desc: 'A glass-style student profile card with a shooting-star background and status badges.',
    created: '',
    category: 'Conditions',
    difficulty: 'Easy',
    details: 'This project uses if, if...else, else if and switch statements in JavaScript to show age, academic status, rating and day badges.',
    code: `<!DOCTYPE html>
<html>
<head>
    <title>My Student Profile - Pro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: #0a0a1a;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow:hidden;
        }
        /* SHOOTING STAR BG */
        .stars { position: fixed; inset:0; pointer-events:none; }
        .star { position:absolute; width:2px; height:2px; background:white; border-radius:50%; animation: twinkle 3s infinite; }
        .shooting-star { position:absolute; width:120px; height:1px; background: linear-gradient(90deg, white, transparent); animation: shoot 3s linear infinite; }
        @keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
        @keyframes shoot { 0%{transform:translateX(-100px) translateY(0) rotate(-35deg); opacity:1} 100%{transform:translateX(700px) translateY(600px) rotate(-35deg); opacity:0} }

        .glass-card {
            background: rgba(255,255,255,0.07);
            backdrop-filter: blur(22px);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 24px;
            padding: 28px;
            width: 90%; max-width: 420px;
            z-index: 10;
            color: white;
        }
        .top { display:flex; align-items:center; gap:14px; margin-bottom:22px; }
        .avatar { width:54px; height:54px; background: white; color: #0a0a1a; border-radius:14px; display:flex; justify-content:center; align-items:center; font-weight:700; font-size:18px; }
        .top h2 { font-size:18px; line-height:1.2; }
        .top p { font-size:12px; opacity:0.5; margin-top:2px; }

        .grid { display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:20px; }
        .field { background: rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:12px; }
        .field label { font-size:10px; opacity:0.4; letter-spacing:0.8px; text-transform:uppercase; display:block; margin-bottom:4px; }
        .field strong { font-size:14px; font-weight:600; }

        /* PROFESSIONAL STATUS SECTION */
        .pro-section { background: rgba(0,0,0,0.35); border-radius:16px; padding:16px; border:1px solid rgba(255,255,255,0.06); }
        .pro-row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
        .pro-row:last-child { border:none; }
        .pro-label { font-size:12px; opacity:0.5; }
        .badge { font-size:11px; font-weight:600; padding:5px 10px; border-radius:20px; letter-spacing:0.3px; }
        .badge-green { background: rgba(94,252,130,0.15); color:#5efc82; border:1px solid rgba(94,252,130,0.2); }
        .badge-yellow { background: rgba(255,224,102,0.15); color:#ffe066; border:1px solid rgba(255,224,102,0.2); }
        .badge-purple { background: rgba(201,166,255,0.15); color:#c9a6ff; border:1px solid rgba(201,166,255,0.2); }
        .badge-blue { background: rgba(126,184,255,0.15); color:#7eb8ff; border:1px solid rgba(126,184,255,0.2); }
        .badge-gray { background: rgba(255,255,255,0.08); color:#aaa; }
    </style>
</head>
<body>

<div class="stars" id="stars"></div>

<div class="glass-card">
    <div class="top">
        <div class="avatar">KB</div>
        <div>
            <h2>Kevin Bandong</h2>
            <p>BSIS 2-B • Student ID: 2024-0019</p>
        </div>
    </div>

    <div class="grid" id="grid"></div>
    <div class="pro-section" id="pro"></div>
</div>

<script>
    const starsContainer = document.getElementById("stars");
    for(let i=0; i<70; i++){ let s=document.createElement("div"); s.className="star"; s.style.left=Math.random()*100+"%"; s.style.top=Math.random()*100+"%"; s.style.animationDelay=Math.random()*3+"s"; starsContainer.appendChild(s); }
    for(let i=0; i<3; i++){ let s=document.createElement("div"); s.className="shooting-star"; s.style.left=Math.random()*30+"%"; s.style.top=Math.random()*30+"%"; s.style.animationDelay=(i*2.5)+"s"; starsContainer.appendChild(s); }

    // PERSONAL INFORMATION
    let name = "Kevin Bandong";
    let program = "BSIS";
    let year = 2;
    let section = "B";
    let age = 19;
    let score = 100;
    let day = "Monday";

    // TOP GRID
    document.getElementById("grid").innerHTML = \`
        <div class="field"><label>Program</label><strong>\${program}</strong></div>
        <div class="field"><label>Year & Section</label><strong>\${year} - \${section}</strong></div>
        <div class="field"><label>Age</label><strong>\${age} Years</strong></div>
        <div class="field"><label>Academic Score</label><strong>\${score} / 100</strong></div>
    \`;

    // PROFESSIONAL LOGIC DISPLAY
    let adultBadge, statusBadge, ratingBadge, dayBadge;

    // IF STATEMENT - Professional
    if (age >= 18) adultBadge = \`<span class="badge badge-blue">Adult • Eligible</span>\`;
    else adultBadge = \`<span class="badge badge-gray">Minor</span>\`;

    // IF...ELSE
    if (score >= 75) statusBadge = \`<span class="badge badge-green">● PASSED</span>\`;
    else statusBadge = \`<span class="badge" style="background:rgba(255,100,100,0.15); color:#ff7b7b;">● FAILED</span>\`;

    // ELSE IF - Rating
    if (score >= 90) ratingBadge = \`<span class="badge badge-yellow">Excellent</span>\`;
    else if (score >= 80) ratingBadge = \`<span class="badge badge-green">Very Good</span>\`;
    else if (score >= 75) ratingBadge = \`<span class="badge badge-gray">Good</span>\`;
    else ratingBadge = \`<span class="badge badge-gray">Needs Improvement</span>\`;

    // SWITCH - Day
    switch(day){
        case "Monday": dayBadge = \`<span class="badge badge-purple">\${day.toUpperCase()}</span>\`; break;
        case "Tuesday": dayBadge = \`<span class="badge badge-purple">\${day.toUpperCase()}</span>\`; break;
        case "Wednesday": dayBadge = \`<span class="badge badge-purple">\${day.toUpperCase()}</span>\`; break;
        case "Thursday": dayBadge = \`<span class="badge badge-purple">\${day.toUpperCase()}</span>\`; break;
        case "Friday": dayBadge = \`<span class="badge badge-purple">\${day.toUpperCase()}</span>\`; break;
        default: dayBadge = \`<span class="badge badge-gray">\${day}</span>\`;
    }

    document.getElementById("pro").innerHTML = \`
        <div class="pro-row"><span class="pro-label">Age Verification</span>\${adultBadge}</div>
        <div class="pro-row"><span class="pro-label">Academic Status</span>\${statusBadge}</div>
        <div class="pro-row"><span class="pro-label">Performance Rating</span>\${ratingBadge}</div>
        <div class="pro-row"><span class="pro-label">Current Day</span>\${dayBadge}</div>
    \`;
</script>

</body>
</html>
`
});
