/* My Code Library - project: My Student Loop (kept in its own file so every file stays small) */
CODE_PROJECTS.push({
    lang: 'html',
    name: 'My Student Loop',
    sub: 'HTML • Loop Challenge',
    icon: 'loop',
    file: 'student-loop.html',
    desc: 'A student page that shows for, while and do...while loops, collapsible sections and a final poem.',
    created: '',
    category: 'Loops',
    difficulty: 'Medium',
    details: 'This project uses JavaScript for, while and do...while loops to build number lists, a countdown and a final message on an aurora-style page.',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>My Student Loop Challenge - Aurora</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: #050a14;
            color: white;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* AURORA BACKGROUND */
        .aurora {
            position: fixed;
            inset: 0;
            background:
                radial-gradient(
                    60% 60% at 20% 20%,
                    rgba(0, 255, 171, 0.25),
                    transparent
                ),
                radial-gradient(
                    50% 50% at 80% 20%,
                    rgba(120, 119, 198, 0.35),
                    transparent
                ),
                radial-gradient(
                    60% 60% at 50% 80%,
                    rgba(0, 199, 255, 0.25),
                    transparent
                ),
                linear-gradient(180deg, #050a14, #0a1226);
            z-index: -2;
            pointer-events: none;
        }

        .aurora::after {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0.12;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E");
            pointer-events: none;
        }

        .glow {
            position: fixed;
            top: 5%;
            left: -100px;
            width: min(600px, 100vw);
            height: 600px;
            background: radial-gradient(
                circle,
                rgba(0, 255, 171, 0.15),
                transparent 70%
            );
            animation: float 10s ease-in-out infinite;
            pointer-events: none;
            z-index: -1;
        }

        .glow2 {
            left: 55%;
            top: 25%;
            background: radial-gradient(
                circle,
                rgba(123, 97, 255, 0.2),
                transparent 70%
            );
            animation-delay: -5s;
        }

        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }

            50% {
                transform: translate(-30px, 20px);
            }
        }

        /* MAIN CONTAINER */
        .container {
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            padding: 40px 20px;
            position: relative;
        }

        /* HEADER */
        .header {
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 20px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }

        .header p {
            font-size: 12px;
            opacity: 0.6;
            margin-top: 5px;
        }

        .badge-pro {
            background: white;
            color: #050a14;
            padding: 7px 12px;
            border-radius: 20px;
            font-size: 10px;
            font-weight: 700;
            white-space: nowrap;
        }

        /* PROFILE INFORMATION */
        .profile-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            margin-bottom: 20px;
        }

        .field {
            min-width: 0;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 14px;
            overflow-wrap: anywhere;
        }

        .field label {
            font-size: 10px;
            opacity: 0.5;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            display: block;
            margin-bottom: 5px;
        }

        .field span {
            font-size: 14px;
            font-weight: 500;
        }

        .active-status {
            color: #5efc82;
        }

        /* LOOP SECTIONS */
        .section {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px;
            padding: 20px;
            margin-bottom: 16px;
        }

        .section-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            cursor: pointer;
        }

        .section-title h3 {
            font-size: 14px;
            font-weight: 600;
        }

        .section-title small {
            font-size: 10px;
            opacity: 0.6;
            font-family: 'JetBrains Mono', monospace;
            text-align: right;
        }

        .toggle-icon {
            display: inline-block;
            margin-left: 5px;
            transition: transform 0.3s ease;
        }

        .section.closed .toggle-icon {
            transform: rotate(-90deg);
        }

        .section-content {
            margin-top: 14px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 12px;
            padding: 14px;
            max-height: 220px;
            overflow-y: auto;
            overflow-wrap: anywhere;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            line-height: 1.9;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section.closed .section-content {
            display: none;
        }

        .section-content::-webkit-scrollbar {
            width: 4px;
        }

        .section-content::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.25);
            border-radius: 4px;
        }

        /* FINAL MESSAGE */
        .love-card {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.08),
                rgba(255, 255, 255, 0.03)
            );
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 24px;
            text-align: center;
            overflow-wrap: anywhere;
        }

        .love-card p {
            font-size: 14px;
            line-height: 1.8;
            opacity: 0.9;
        }

        .message-label {
            font-size: 11px !important;
            opacity: 0.5 !important;
            letter-spacing: 1px;
            margin-bottom: 12px;
        }

        .poem {
            margin: 18px 0;
        }

        .final-poem {
            font-weight: 600;
            color: #a7f3d0;
        }

        /* TABLET */
        @media (max-width: 700px) {
            .container {
                padding: 25px 15px;
            }

            .profile-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .header {
                padding: 20px;
            }
        }

        /* MOBILE PHONE */
        @media (max-width: 480px) {
            .container {
                padding: 16px 12px;
            }

            .header {
                padding: 16px;
                border-radius: 18px;
                align-items: flex-start;
            }

            .header h1 {
                font-size: 17px;
                line-height: 1.5;
            }

            .header p {
                font-size: 10px;
                line-height: 1.6;
            }

            .badge-pro {
                font-size: 8px;
                padding: 6px 8px;
            }

            .profile-grid {
                gap: 8px;
            }

            .field {
                padding: 11px;
                border-radius: 12px;
            }

            .field label {
                font-size: 9px;
            }

            .field span {
                font-size: 12px;
            }

            .section {
                padding: 15px;
                border-radius: 16px;
            }

            .section-title h3 {
                font-size: 12px;
            }

            .section-title small {
                font-size: 9px;
            }

            .section-content {
                padding: 12px;
                font-size: 11px;
                line-height: 1.8;
                max-height: 190px;
            }

            .love-card {
                padding: 18px 14px;
                border-radius: 16px;
            }

            .love-card p {
                font-size: 12px;
            }
        }

        /* ACCESSIBILITY */
        @media (prefers-reduced-motion: reduce) {
            .glow,
            .toggle-icon {
                animation: none;
                transition: none;
            }
        }
    </style>
</head>

<body>

    <div class="aurora"></div>
    <div class="glow"></div>
    <div class="glow glow2"></div>

    <main class="container">

        <header class="header">
            <div>
                <h1>My Student Loop Challenge</h1>
                <p>BSIS 2-B • Aurora Professional Edition</p>
            </div>

            <div class="badge-pro">PRO VERSION</div>
        </header>

        <div class="profile-grid" id="profile"></div>

        <div id="loops"></div>

        <section class="love-card" id="message"></section>

    </main>

    <script>
        // ==============================
        // PERSONAL INFORMATION
        // ==============================

        let name = "Kevin Bandong";
        let program = "BSIS";
        let year = 2;
        let section = "B";
        let age = "19";
        let address = "Importante, Tibiao, Antique"
        let contact = "(+63)9638932603";

        // ==============================
        // POEM VARIABLES
        // ==============================

        let red = "<br>Violets are blue";

        let blue =
            "I have 10 fingers<br>" +
            "And the ten fingers<br>" +
            "Are for you";

        let me = " but you can call me baby";

        let poem_i =
            "Roses are red,<br>" +
            "Violets are blue.<br>" +
            "He said, 'I love you,'<br>" +
            "And I hope it's true.";

        let love =
            "Roses are red,<br>" +
            "Violets are blue.<br>" +
            "Oh, my dear, believe me,<br>" +
            "My love for you is true.";

        let you =
            "Roses are red,<br>" +
            "Violets are blue.<br>" +
            "You said you love me,<br>" +
            "And I replied, 'I love you too.'";

        // ==============================
        // DISPLAY PROFILE
        // ==============================

        document.getElementById("profile").innerHTML = \`
            <div class="field">
                <label>Name</label>
                <span>\${name}</span>
            </div>

            <div class="field">
                <label>Program</label>
                <span>\${program} \${year}-\${section}</span>
            </div>

            <div class="field">
                <label>Age</label>
                <span>\${age}</span>
            </div>

            <div class="field">
                <label>Address</label>
                <span>\${address}</span>
            </div>

            <div class="field">
                <label>Contact</label>
                <span>\${contact}</span>
            </div>

            <div class="field">
                <label>Status</label>
                <span class="active-status">
                    ● Active Student
                </span>
            </div>
        \`;

        // ==============================
        // LOOP SECTION HELPER
        // ==============================

        let loopsHTML = "";

        function addSection(title, label, content) {
            loopsHTML += \`
                <section class="section">
                    <div class="section-title"
                         role="button"
                         tabindex="0"
                         aria-expanded="true">

                        <h3>\${title}</h3>

                        <small>
                            \${label}
                            <span class="toggle-icon">▼</span>
                        </small>
                    </div>

                    <div class="section-content">
                        \${content}
                    </div>
                </section>
            \`;
        }

        // ==============================
        // 1. FOR LOOP: NUMBERS 1 TO 100
        // ==============================

        let numbers = "";

        for (let i = 50; i >= 1; i--) {
            numbers += i;

            if (i > 1) {
                numbers += ", ";
            }
        }

        addSection(
            "1. Number Range",
            "FOR LOOP • 1 TO 100",
            numbers
        );

        // ==============================
        // 2. FOR LOOP: PRINT NAME 50 TIMES
        // ==============================

        let nameList = "";

        for (let j = 1; j <= 50; j++) {
            nameList += \`\${j}. \${name}<br>\`;
        }

        addSection(
            "2. My Name Loop",
            "FOR LOOP • 50X",
            nameList
        );

        // ==============================
        // 3. WHILE LOOP: COUNTDOWN 50 TO 1
        // ==============================

        let countdown = "";
        let number = 50;

        while (number >= 1) {
            countdown += number;

            if (number > 1) {
                countdown += " → ";
            }

            number--;
        }

        countdown += "<br><br>Liftoff! 🚀";

        addSection(
            "3. Countdown",
            "WHILE LOOP • 50 TO 1",
            countdown
        );

        // ==============================
        // 4. WHILE LOOP: PROGRAM 50 TIMES
        // ==============================

        let progList = "";
        let count = 1;

        while (count <= 50) {
            progList += \`\${program} \`;

            if (count % 10 === 0) {
                progList += "<br>";
            }

            count++;
        }

        addSection(
            "4. My Program Loop",
            "WHILE LOOP • 50X",
            progList
        );

        // ==============================
        // 5. DO...WHILE LOOP: LEVELS 1 TO 40
        // ==============================

        let levels = "";
        let level = 40;

        do {
            let symbol = level === 40 ? "🏆" : "▸";

            levels += \`Level \${level} \${symbol} \`;

            if (level % 8 === 0) {
                levels += "<br>";
            }

            level--;

        } while (level >= 1);

        addSection(
            "5. Levels",
            "DO...WHILE • 1 TO 40",
            levels
        );

        // DISPLAY ALL LOOP SECTIONS
        document.getElementById("loops").innerHTML = loopsHTML;

        // ==============================
        // COLLAPSIBLE SECTIONS
        // Tap a heading to hide/show content
        // ==============================

        document.querySelectorAll(".section-title").forEach(title => {

            function toggleSection() {
                const sectionElement = title.closest(".section");
                const isClosed = sectionElement.classList.toggle("closed");

                title.setAttribute(
                    "aria-expanded",
                    String(!isClosed)
                );
            }

            title.addEventListener("click", toggleSection);

            title.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleSection();
                }
            });
        });

        // ==============================
        // FINAL MESSAGE
        // ==============================

        document.getElementById("message").innerHTML = \`
            <p class="message-label">
                FINAL MESSAGE • DO...WHILE LOOP
            </p>

            <p>
                Hi! I'm \${name}\${me}. HAHAHAHA
            </p>

            <p class="poem">
                Roses are red\${red}<br>
            </p>

            <p class="poem">
                \${blue} 🫶🫶
            </p>

            <p class="poem" style="opacity: 0.75;">
                \${poem_i}
            </p>

            <p class="poem">
                \${love}
            </p>

            <p class="poem final-poem">
                \${you}
            </p>
        \`;
    </script>

</body>
</html>
`
});
