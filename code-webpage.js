/* My Code Library - project: My Webpage (kept in its own file so every file stays small) */
CODE_PROJECTS.push({
        lang: 'html', name: 'My Webpage', sub: 'HTML • Personal Site', icon: 'globe',
        file: 'my-webpage.html',
        desc: 'My first personal webpage with About, Skills, Gallery, Sites and Contact sections.',
        created: '', category: 'Personal Site', difficulty: 'Medium',
        details: 'This project uses HTML and CSS to build a full page with a navigation bar, lists, an image, audio, video, a table, a form and a footer.',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Website</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
  
<!-- TASK 9: Inline and Internal CSS Styles (site-wide styling lives here) -->
<style>
    html {
    width: 100%;
    scroll-behavior: smooth;
}

body {
    width: 100%;
    overflow-x: hidden;
}
    
body {
    margin: 0;
    font-family: Montserrat, sans-serif;
    color: #333333;
    background: linear-gradient(
        135deg,
        #8ec5fc,
        #e0c3fc,
        #fbc2eb
    );
    line-height: 1.6;

}
h1, h2, h3 {
    font-family: Cinzel, serif;
    color: #6a3fa0;
    letter-spacing: 1px;
}
a {
    color: #6a3fa0;
}

a:hover {
    color: #d1487e;
}
.wrap {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0 20px;
    box-sizing: border-box;
}
/* --- Nav (Task 3) --- */
nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid #c9a7e8;
    padding: 15px 0;
    transition: transform 0.3s ease;
}

/* Itago ang navigation kapag nag-scroll pababa */
nav.hide-nav {
    transform: translateY(-100%);
}
nav a {
    color: #4b3b5c;
    text-decoration: none;
    white-space: nowrap;
    transition: 0.3s;
}

nav a:hover {
    color: #d1487e;
}

nav .brand {
    font-family: Cinzel, serif;
    font-weight: bold;
    font-size: 19px;
    color: #6a3fa0;
    margin-right: 12px;
    white-space: nowrap;
}
    nav .wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  s  width: 100%;
    box-sizing: border-box;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 25px;
}
section {
    padding: 70px 0;
    border-bottom: 1px solid rgba(106, 63, 160, 0.15);
}
 .hero {
    background:
        radial-gradient(
            circle at 80% 50%,
            rgba(255, 255, 255, 0.35),
            transparent 40%
        );
}
/* --- Hero (Task 1) --- */
.tag {
    display: inline-block;
    font-size: 13px;
    color: #6a3fa0;
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid #c9a7e8;
    padding: 5px 12px;
    margin-bottom: 15px;
    border-radius: 20px;
}
/* --- Skills & Hobbies (Task 4) --- */
.cols {
width: 100%;
}
.cols .box { display: inline-block;
vertical-align: top;
width: 45%;
margin-right: 20px;
}
ul.skills, ol.hobbies {
padding-left: 20px;
}
ul.skills li, ol.hobbies li {
padding: 6px 0;
}
/* --- Image (Task 5) --- */
.photo {
width: 100%;
max-width: 600px;
border: 1px solid #d8d2c2;
}
figcaption {
margin-top: 8px;
font-size: 14px;
color: #6c7a73;
}
/* --- Table (Task 6) --- */
table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #d8d2c2;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
/* --- Form (Task 7) --- */
form {
max-width: 400px;
}
label {
display: block;
margin-bottom: 4px;
font-size: 14px;
}
input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 14px;
    background-color: #111111;
    color: #ffffff;
    border: 1px solid #5a1515;
    box-sizing: border-box;
}

input, select {
    width: 100%;
    padding: 10px;
    margin-bottom: 14px;
    background-color: rgba(255, 255, 255, 0.75);
    color: #333333;
    border: 1px solid #c9a7e8;
    box-sizing: border-box;
    border-radius: 6px;
}

input:focus,
select:focus {
    outline: none;
    border-color: #d1487e;
    box-shadow: 0 0 10px rgba(209, 72, 126, 0.2);
}

button {
    background: linear-gradient(135deg, #6a3fa0, #d1487e);
    color: white;
    border: none;
    padding: 11px 22px;
    cursor: pointer;
    border-radius: 6px;
    transition: 0.3s;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 63, 160, 0.25);
}
/* --- Video (Task 8) --- */
iframe {
max-width: 100%;
}
/* --- Footer (Task 10) --- */
footer {
    background: linear-gradient(
        135deg,
        rgba(142, 197, 252, 0.8),
        rgba(224, 195, 252, 0.8),
        rgba(251, 194, 235, 0.8)
    );
    color: #4b3b5c;
    padding: 40px 0;
    border-top: 1px solid #c9a7e8;
}

footer a {
    color: #6a3fa0;
}

footer a:hover {
    color: #d1487e;
}

address {
    font-style: normal;
    color: #5f5268;
}
    .enemy {
    color: #6a3fa0;
    font-family: 'Cinzel', serif;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(209, 72, 126, 0.25);
}
    .favorite-section {
    text-align: center;
}

.favorite-section {
    text-align: center;
}

.favorite-section h2 {
    text-align: center;
}

.favorite-section figure {
    margin: 0;
    padding: 0;
    text-align: center;
}

.favorite-section .photo {
    display: block;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
}

.favorite-section figcaption {
    display: block;
    text-align: center;
    margin-top: 15px;
    font-family: 'Cinzel', serif;
    font-size: 22px;
    letter-spacing: 3px;
    color: #a0a0a0;

}

.my-audio {
    display: block;
    width: 100%;
    max-width: 500px;
    margin: 20px auto 0;
}
  @media (max-width: 600px) {

    .wrap {
        padding: 0 12px;
    }

    nav {
        padding: 12px 0;
        width: 100%;
    }

    nav .wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    nav .brand {
        font-size: 14px;
        margin-right: 0;
        white-space: nowrap;
    }

    .nav-links {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    nav a {
        font-size: 11px;
        margin-left: 0;
    }

}
</style>
</head>
<body> <!-- TASK 3: Navigation Links -->
<nav>
    <div class="wrap">
        
        <span class="brand">Kevin Bandong</span>

        <div class="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#Gallery">Gallery</a>
            <a href="#sites">Sites</a>
            <a href="#contact">Contact</a>
        </div>

    </div>
</nav>
<!-- TASK 1: Basic structure, as the hero -->
<section class="hero">
<div class="wrap"><center>
<span class="tag">BSIS · College of Computing and Information Sciences</span></center>
<p class="welcome">Welcome</p>
<h3>Hello Everyone I'm kevin</h3>
<p> Hi! I'm Kevin Bandong,  19-year-old Information Systems student from Importante, Tibiao, Antique, currently studying at UA TLMC College. I'm passionate about technology and continuously learning new skills to expand my knowledge and build a bright future in the field of Information Systems.  </p>
</div>
</section>
<!-- TASK 2: Multi-Section Page with Headings (About section) -->
<section id="about">
<div class="wrap">
<h2>About me</h2> 
    <img src="Images/qq.jpg" style="float:left; width:150px; margin-right:20px; margin-bottom:10px; border-radius:10px;">

<p>Hello! My name is kevin. I am a student who loves learning new things and expressing my creativity. I enjoy listening to music, watching movies, and spending time with my family and friends. I always strive to learn, grow, and become the best version of myself. My hobbies include reading, listening to music, gaming, workout, and traveling. I enjoy these activities because they allow me to express my creativity, explore new experiences, and relax during my free time.</p>
</div>
</section>
<!-- TASK 4: Skills and hobbies -->
<section id="skills">
<div class="wrap cols">
<div class="box">
<h2>Skills</h2>
<ul class="skills">
<li>Leadership</li>
<li>Problem solving</li>
<li>Creativity</li>
  <li>Adaptability</li>
  <li>Attention to details</li>
</ul>
</div>
<div class="box">
<h2>Hobbies</h2>
<ol class="hobbies">
<li>Reading Manga</li>
<li>Wacthing Anime</li>
<li>Listening Music</li>
  <li>Workout</li>
  <li>Gaming</li>
  <li>Adventure</li>
</ol>
</div>
</div>
</section>
<!-- TASK 5: Image with alt text, as a project photo -->
<section id="Gallery">
    <div class="wrap favorite-section">

        <h2>My favorite picture</h2>

        <figure>
            <img class="photo" src="Images/bb.jpg" alt="Use data">

            <figcaption>
                I'M MY OWN<br>
                <strong><span class="enemy">ENEMY</span></strong>
            </figcaption>
        </figure>

        <audio class="my-audio" controls>
            <source src="Music/golden.mp3.m4a" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <section>
<div class="wrap">
  <h2>Something worth watching</h2>
  <video width="100%" height="315" controls>
    <source src="Music/bbbb.mp4" type="video/mp4">
    Hindi supported ang video tag sa browser mo.
  </video>
</div>
</section>

    </div>
</section>
<!-- TASK 6: Table, reframed as a resources list -->
<section id="sites">
<div class="wrap">
<h2>Sites I keep coming back to</h2>
<table>
<tr>
<th>Name</th>
<th>URL</th>
<th>Description</th>
</tr>
<tr>
<td>AIMS (Academic Information Management System) </td>
<td><a href="https://sims.antiquespride.edu.ph/aims/index.php" target="_blank">sims.antiques<br>pride.edu.ph</a></td>
<td>This is the login page for the School Management Information System (SIMS) of the University of Antique, a state university in Sibalom, Antique, Philippines, that centralizes student/academic information and streamlines administrative processes. It's used by students, faculty, and administrators for things like enrollment, grades, and academic records management.</td>
</tr>
<tr>
<td>VWSARISARISTORE Mobile Legends top-up page</td>
<td><a href="https://vwsarisaristore.com/games/mobile-legends-games" target="_blank">vwsarisaristore.com</a></td>
<td>An online game top-up/reload service (similar to a "load" or "cash-in" store) that lets players buy Mobile Legends: Bang Bang diamonds and passes for the Philippines and Indonesia regions. Users enter their in-game User ID and Zone ID, pick a diamond package or pass, then pay via GCash, ShopeePay, GrabPay, QR Ph, or account balance. It also offers top-ups for other games like PUBG Mobile and Call of Duty Mobile, plus order tracking and 24/7 WhatsApp customer support.</td>
</tr>
</table> </div>
</section>
<!-- TASK 8: Video embed, framed as a featured watch -->

<!-- TASK 7: Contact form -->
<section id="contact">
<div class="wrap">
<h2>Get in touch</h2>
<form onsubmit="return false;">
<label for="name">Name</label>
<input type="text" id="name" name="name" required>
<label for="email">Email</label>
<input type="email" id="email" name="email" required>
<label for="color">Favorite color</label>
<select id="color" name="color">
<option value="red">Red</option>
<option value="blue">Blue</option>
<option value="green">Green</option>
</select>
<button type="submit">Send message</button>
</form>
</div>
</section>
<!-- TASK 10: Footer -->
<footer>
<div class="wrap">
<p>Contact me at: <a href="mailto:bandongkevin08@gmial.com">bandongkevin08@gamail.com</a></p>
<address> Address: Importante, Tibiao, Antique<br> 
Phone: (+63) 9638-932603</address>
<p><a href="https://www.facebook.com/Ke Vin.943551" target="_blank">My Facebook Profile</a></p>
</div>
</footer>
    <script>
    let lastScrollTop = 0;
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop && currentScroll > 80) {
            // Nag-scroll pababa → itago ang navigation
            nav.classList.add("hide-nav");
        } else {
            // Nag-scroll pataas → ipakita ang navigation
            nav.classList.remove("hide-nav");
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
</script>
</body>
</html>
`
    });
