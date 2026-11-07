/* My Code Library - project: For You (kept in its own file so every file stays small) */
CODE_PROJECTS.push({
        lang: 'html', name: 'For You', sub: 'HTML • Animation', icon: 'heart',
        file: 'for-you.html',
        desc: 'An animated beating heart. Tap it to open a message, play music and send floating hearts.',
        created: '', category: 'Animation', difficulty: 'Medium',
        details: 'This project uses CSS animations and JavaScript to open a message pop-up, play a song and create floating hearts when the heart is tapped.',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>For You ❤️</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&family=Dancing+Script:wght@700&display=swap" rel="stylesheet">

<style>
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

body{
  background:radial-gradient(
    circle at center,
    #ffdde1 0%,
    #ff8fab 100%
  );

  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;

  font-family:'Poppins',sans-serif;
  overflow:hidden;
}

/* =========================
   MAIN HEART
========================= */

.heart-main{
  width:140px;
  height:140px;
  background:#ff2a6d;

  transform:rotate(-45deg);

  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;

  cursor:pointer;

  animation:beat 1s ease-in-out infinite;

  box-shadow:
    0 0 40px rgba(255,42,109,0.5),
    0 20px 40px rgba(0,0,0,0.15);
}

.heart-main::before,
.heart-main::after{
  content:"";

  width:140px;
  height:140px;

  background:#ff2a6d;

  border-radius:50%;

  position:absolute;
}

.heart-main::before{
  top:-70px;
  left:0;
}

.heart-main::after{
  top:0;
  left:70px;
}

.heart-main span{
  transform:rotate(45deg);

  color:white;
  font-size:14px;
  font-weight:700;

  z-index:3;

  letter-spacing:1px;
  text-align:center;
  line-height:1.2;
}

@keyframes beat{
  0%,100%{
    transform:rotate(-45deg) scale(1);
  }

  50%{
    transform:rotate(-45deg) scale(1.2);
  }
}


/* =========================
   TAP TEXT
========================= */

.tap-text{
  position:absolute;

  bottom:80px;
  left:50%;

  transform:translateX(-50%);

  color:#a4163a;

  font-size:13px;
  font-weight:500;

  animation:bounce 1.5s infinite;

  background:rgba(255,255,255,0.7);

  padding:8px 18px;

  border-radius:20px;

  backdrop-filter:blur(5px);
}

@keyframes bounce{
  0%,100%{
    transform:translate(-50%,0);
  }

  50%{
    transform:translate(-50%,-8px);
  }
}


/* =========================
   OUTPUT / POPUP
========================= */

.output{
  position:fixed;

  inset:0;

  background:rgba(20,10,15,0.6);

  backdrop-filter:blur(15px);

  display:none;

  align-items:center;
  justify-content:center;

  z-index:100;

  padding:20px;
}

.output.show{
  display:flex;
}

.output-card{
  background:white;

  width:100%;
  max-width:400px;

  border-radius:30px;

  padding:35px 30px;

  text-align:center;

  animation:pop 0.6s cubic-bezier(
    0.68,-0.55,
    0.27,1.55
  );

  box-shadow:
    0 30px 80px rgba(0,0,0,0.25);

  max-height:85vh;

  overflow-y:auto;
}

@keyframes pop{
  0%{
    transform:scale(0);
  }

  100%{
    transform:scale(1);
  }
}


/* =========================
   MESSAGE
========================= */

.output-card h2{
  font-family:'Dancing Script',cursive;

  font-size:34px;

  color:#ff2a6d;
}

.output-card p{
  font-size:13.5px;

  color:#555;

  line-height:1.8;

  margin-top:15px;

  text-align:left;

  background:#fff5f7;

  padding:18px;

  border-radius:18px;
}


/* =========================
   MUSIC BAR
========================= */

.music-bar{
  margin-top:18px;

  background:#1a1a1a;

  border-radius:15px;

  padding:12px 15px;

  display:flex;

  align-items:center;

  gap:12px;

  color:white;
}

.music-bar .icon{
  width:36px;
  height:36px;

  background:#ff4d6d;

  border-radius:50%;

  display:flex;

  align-items:center;
  justify-content:center;

  animation:rotate 3s linear infinite;
}

@keyframes rotate{
  0%{
    transform:rotate(0);
  }

  100%{
    transform:rotate(360deg);
  }
}

.music-bar small{
  font-size:11px;

  opacity:0.7;
}

.music-bar b{
  font-size:12px;

  display:block;
}


/* =========================
   CLOSE BUTTON
========================= */

.close-btn{
  margin-top:20px;

  background:#1a1a1a;

  color:white;

  border:none;

  padding:13px 28px;

  border-radius:25px;

  font-weight:600;

  width:100%;

  cursor:pointer;
}

.close-btn:hover{
  background:#ff2a6d;
}


/* =========================
   FLOATING HEARTS
========================= */

.mini-heart{
  position:absolute;

  pointer-events:none;

  animation:floatUp 3s linear forwards;
}

@keyframes floatUp{
  0%{
    transform:translateY(0);

    opacity:1;
  }

  100%{
    transform:
      translateY(-600px)
      scale(1.5);

    opacity:0;
  }
}
</style>
</head>


<body>


<!-- =========================
     MAIN HEART
========================= -->

<div class="heart-main" onclick="openOutput()">

  <span><center>
    TAP ME<br>
    💖
  </span></center>

</div>


<div class="tap-text">
  👆 Tap the heart
</div>


<!-- =========================
     OUTPUT / MESSAGE
========================= -->

<div
  class="output"
  id="output"
  onclick="closeOutput()"
>

  <div
    class="output-card"
    onclick="event.stopPropagation()"
  >

    <h2>
      Someone
    </h2>


    <p>

      Yam<br><br>

      Every little moment with you makes me want to make you mine, today and always.
<br><br>

      I don't need grand gestures I just want to hold your hand and build something real with you.<br><br>

      Even when I'm scared, I'll keep trying to show you how much you mean to me.<br><br>
      
      From morning walks to late-night talks, I want to be the one who makes you mine.


    </p>


    <!-- =========================
         MUSIC PLAYER
    ========================= -->

    <div class="music-bar">

      <div class="icon">
        🎵
      </div>

      <div>

        <b>
          Playing: Make You Mine Put Your Hand in My Mind
        </b>

        <small>
          For Yam💖
        </small>

      </div>

      <div
        style="
          margin-left:auto;
          font-size:18px;
        "
      >
        ❤️
      </div>

    </div>


    <!-- =========================
         AUDIO
    ========================= -->

    <audio id="myMusic" loop>

      <source
        src="Music/bbb.mp3"
        type="audio/mpeg"
      >

    </audio>


    <!-- =========================
         CLOSE BUTTON
    ========================= -->

    <button
      class="close-btn"
      onclick="closeOutput()"
    >
      Keep drawing my eyes to you🥺
    </button>

  </div>

</div>


<script>

/* =========================
   GET MUSIC
========================= */

let music = document.getElementById("myMusic");


/* =========================
   OPEN MESSAGE
========================= */

function openOutput(){
  console.log(\`Roses are red
Violets are blue
At first when I met you
I didn't fall for you yet

But....

Not all roses are red
And violets are never really blue
I try to tell myself I don't like you
But I can't hide what I really feel for you

I tried to ignore my feelings
But my heart still beats for you
I made this poem just to show
How much I like you

But then again

Not all roses are red
And violets will never be blue
When I finally confess to you
Please don't hurt my feelings.\`);
  
  /* Show the message */
  document.getElementById("output").classList.add("show");
  
  console.log("");


  /* Play music */

  music.play().catch(function(error){
    
    console.log(
      "Music could not play:",
      error
    );
    

  });


  /* Create floating hearts */

  createHearts();

}


/* =========================
   CLOSE MESSAGE
========================= */

function closeOutput(){

  /* Hide message */

  document
    .getElementById("output")
    .classList
    .remove("show");


  /* Stop music */

  music.pause();

  /* Start from beginning */

  music.currentTime = 0;

}


/* =========================
   FLOATING HEARTS
========================= */

function createHearts(){

  for(let i = 0; i < 15; i++){

    let heart =
      document.createElement("div");

    heart.className = "mini-heart";

    heart.innerHTML = "❤️";

    heart.style.left =
      Math.random() * 100 + "%";

    heart.style.bottom =
      "0px";

    heart.style.fontSize =
      (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
      (2 + Math.random() * 2) + "s";

    document.body.appendChild(heart);


    /* Remove after animation */

    setTimeout(function(){

      heart.remove();

    },4000);

  }

}

</script>

</body>
</html>
`
    });
