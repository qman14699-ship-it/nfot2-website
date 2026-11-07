/* ============================================================
   MY CODE LIBRARY  (tap "Coding" on the Home page)
   Each project is one block. To add a project: copy a block, change the words,
   put a comma after the block before it.

   lang       'html' or 'python'
   name       title shown in the list
   sub        small text under the title in the list
   icon       tree, palette, heart, globe, loop or code (small line icon for the list)
   file       file name used by "Download Project"
   desc       short description under the title
   created    date (leave '' to hide)
   category   shown in the Category box
   difficulty Easy / Medium / Hard (leave '' to hide)
   details    text in "Project Details"
   output     (python only) what the program prints
   code       the full source code between the backticks
              (if your code has a backtick ` or ${ write it as \` and \${ )
   ============================================================ */
var CODE_PROJECTS = [

    /* ---------------------------------------------------------- */
    {
        lang: 'python', name: 'Number Tree', sub: 'Python • Loops', icon: 'tree',
        file: 'number_tree.py',
        desc: 'A simple Python program that creates a beautiful number tree pattern using loops.',
        created: 'Nov 1, 2025', category: 'Loops & Patterns', difficulty: 'Easy',
        details: 'This program demonstrates the use of nested loops in Python to create a number tree pattern.',
        output: 'Enter the number of rows: 5\n    1\n   121\n  12321\n 1234321\n123454321',
        code: `rows = int(input("Enter the number of rows: "))
for i in range(1, rows + 1):
    for j in range(i, rows):
        print(" ", end="")
    for k in range(1, i + 1):
        print(k, end="")
    for l in range(i - 1, 0, -1):
        print(l, end="")
    print()
`
    },

    /* ---------------------------------------------------------- */
    {
        lang: 'html', name: 'Color Value', sub: 'HTML • Color Picker', icon: 'palette',
        file: 'color-value.html',
        desc: 'A page that shows the different CSS color formats: RGB, RGBA, HEX, HSL, HSLA and a gradient.',
        created: '', category: 'CSS Colors', difficulty: 'Easy',
        details: 'This project shows how colors and transparency work in CSS using rgb(), rgba(), hex, hsl(), hsla() and linear-gradient().',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Color Values</title>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 30px;
    background: linear-gradient(
        80deg,
        #8ec5fc,
        #e0c3fc,
        #fbc2eb
    );
  }

  div {
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 8px;
    color: white;
    border: 4px solid ;
    border-image:linear-gradient(to right,yellow,green,white) 1;
  }

  .label {
    display: block;
    font-size: 12px;
    font-family: monospace;
    opacity: 0.75;
    margin-top: 4px;
  }

  /* RGB */
  .rgb {
    background-color: rgb(143, 197, 252);
  }

  /* RGBA (alpha = transparency) */
  .rgba1 { background-color: rgba(143, 197, 252, 0.2); color: black; }
  .rgba2 { background-color: rgba(143, 197, 252, 0.4); color: black; }
  .rgba3 { background-color: rgba(143, 197, 252, 0.6); }
  .rgba4 { background-color: rgba(143, 197, 252, 0.8); }

  /* HEX */
  .hex {
    background-color: #8e9de5;
  }

  /* HSL */
  .hsl {
    background-color: hsl(270, 60%, 75%);
  }

  /* HSLA (alpha = transparency) */
  .hsla1 { background-color: hsla(280, 60%, 70%, 0.2); color: black; }
  .hsla2 { background-color: hsla(280, 70%, 70%, 0.4); color: black; }
  .hsla3 { background-color: hsla(280, 70%, 70%, 0.6); }
  .hsla4 { background-color: hsla(280, 70%, 70%, 0.8); }

  /* GRADIENT */
  .gradient {
    background: linear-gradient(to right,  purple, blue);
    color: black;
  }
</style>
</head>
<body>

  <div class="rgb">Kevin Bandong<span class="label">rgb(143, 197, 252)</span></div>

  <div class="rgba1">Kevin Bandong<span class="label">rgba(143, 197, 252, 0.2)</span></div>
  <div class="rgba2">Kevin Bandong<span class="label">rgba(143, 197, 252, 0.4)</span></div>
  <div class="rgba3">Kevin Bandong<span class="label">rgba(143, 197, 252, 0.6)</span></div>
  <div class="rgba4">Kevin Bandong<span class="label">rgba(143, 197, 252, 0.8)</span></div>

  <div class="hex">Kevin Bandong<span class="label">#8e9de5</span></div>

  <div class="hsl">Kevin Bandong<span class="label">hsl(270, 60%, 75%)</span></div>

  <div class="hsla1">Kevin Bandong<span class="label">hsla(280, 60%, 70%, 0.2)</span></div>
  <div class="hsla2">Kevin Bandong<span class="label">hsla(280, 70%, 70%, 0.4)</span></div>
  <div class="hsla3">Kevin Bandong<span class="label">hsla(280, 70%, 70%, 0.6)</span></div>
  <div class="hsla4">Kevin Bandong<span class="label">hsla(280, 70%, 70%, 0.8)</span></div>

  <div class="gradient">Kevin Bandong<span class="label">linear-gradient(to right, purple, blue)</span></div>

</body>
</html>
`
    }

    /* more projects: code-foryou.js, code-webpage.js (or add a block here) */
];
