/* ============================================================
   MANHWA LIST  (tap "Manhwa" on the home page, then tap a cover)
   Put the cover pictures in Images/ (manhwa1.jpg, manhwa2.jpg ...)
   rating  = score shown in the details      mc = main character
   art     = art style                       story = short story
   overall = overall rating out of 10 (the stars)
   The ratings are MY scores - change them to yours if you want.
   ============================================================ */
const MANHWA = [
    { title: "Myst, Might, Mayhem", cover: 'Images/manhwa1.jpg', g1: '#7f1d1d', g2: '#0f172a',
      rating: "9.0 / 10",
      mc: "Jeong, a killer who enjoys killing, who takes the place of the third young master Mok Gyeongwoon",
      art: "Very sharp, highly detailed murim art with powerful action panels, by Kim Tae-Hyung. Many readers call it some of the best art in a current series.",
      story: "Jeong is a serial killer who gets out of prison by becoming the double of Mok Gyeongwoon, the third young master of the Mok Sword Manor. After killing the real young master, he decides to live as him. It is a dark, tense murim story about a fake who has to survive inside a great sword clan.",
      overall: 9 },

    { title: "Absolute Regression", cover: 'Images/manhwa2.jpg', g1: '#92400e', g2: '#0f172a',
      rating: "8.5 / 10",
      mc: "Mugeuk Geom, the son of the Heavenly Demon (Cheonma)",
      art: "Clean, easy-to-follow martial arts art with dramatic action scenes, by Park Jin-Hwan. Not the flashiest, but it fits the story well.",
      story: "The swordsman Mugi Hwa has beaten every lord of Murim, even the Heavenly Demon. Mugeuk Geom, the demon’s son, uses a forbidden ritual to go back in time. This time he wants to fix old mistakes, unite his people, and prepare for the coming bloodtide.",
      overall: 8.5 },

    { title: "Return of the Mount Hua Sect", cover: 'Images/manhwa3.jpg', g1: '#b45309', g2: '#0f172a',
      rating: "9.5 / 10",
      mc: "Chung Myung, the Plum Blossom Sword Saint, now in the body of a young beggar",
      art: "Beautiful, polished art by Studio LICO. Smooth sword fights, expressive faces, and a lot of humor in the character reactions.",
      story: "Chung Myung, the 13th disciple of the Mount Hua Sect, dies after defeating the Heavenly Demon. A hundred years later he wakes up in the body of a street kid and finds that his beloved sect has almost disappeared. He sets out to bring Mount Hua back to its former glory.",
      overall: 9.5 },

    { title: "Pick Me Up, Infinite Gacha", cover: 'Images/manhwa4.jpg', g1: '#4c1d95', g2: '#0f172a',
      rating: "9.2 / 10",
      mc: "Han Seo-jin, a gamer who is pulled into the game as a weak 1-star hero",
      art: "Very detailed, colorful fantasy art by Wasakbasak. Often described as top tier and stunning.",
      story: "Han Seo-jin used to treat 1-star heroes in the hard gacha game Pick Me Up as nothing but fodder. Then he is transported into the game as one of them. Now he must grow stronger, rank up, and defeat the player who controls him like a god.",
      overall: 9 },

    { title: "Her Summon", cover: 'Images/manhwa5.jpg', g1: '#be185d', g2: '#0f172a',
      rating: "8.0 / 10",
      mc: "Jin-Kyung, a shut-in otaku who becomes the strongest summoned being",
      art: "Very polished, glossy fantasy art with detailed monsters and characters. Many readers praise the art more than the plot, and it is a bit fan-service heavy.",
      story: "Jin-Kyung was a girl-group fan who ended up with social anxiety after an online scandal. He is then summoned to another world, where his anxiety disappears and he turns out to be the strongest summoned being. The story follows him and the weak but hopeful summoner who called him.",
      overall: 8 },

    { title: "I Am the Fated Villain", cover: 'Images/manhwa6.jpg', g1: '#1e3a8a', g2: '#0f172a',
      rating: "7.8 / 10",
      mc: "Gu Changge, a transmigrator who becomes the villain of a cultivation world",
      art: "Clean cultivation-manhua style with bright, flashy power effects.",
      story: "Gu Changge wakes up in a martial world as the villain who is supposed to be destroyed by the chosen \"Sons of Fate\". He has a system that lets him harvest their luck, so he decides to fully embrace the villain role and become the strongest.",
      overall: 7.5 },

    { title: "Nano Machine", cover: 'Images/manhwa7.jpg', g1: '#0e7490', g2: '#0f172a',
      rating: "8.8 / 10",
      mc: "Cheon Yeo-woon, the unwanted son of the Demonic Cult leader",
      art: "Sleek murim art with a sci-fi touch and polished, flowing action, by Geumgang Bulgoe.",
      story: "Cheon Yeo-woon is the illegitimate son of the Demonic Cult leader and is treated as the lowest of the bloodline. A descendant from the future injects him with a nanomachine, and his body and life change. With this future technology he rises against his enemies and grows into a martial arts monster.",
      overall: 8.5 },

    { title: "Legend of the Northern Blade", cover: 'Images/manhwa8.jpg', g1: '#334155', g2: '#0f172a',
      rating: "9.1 / 10",
      mc: "Jin Mu-won, the last heir of the Northern Heavenly Sect",
      art: "Detailed, realistic murim art with cinematic fights and a strong sense of cold, snowy atmosphere, by Hae and Min.",
      story: "The Northern Heavenly Sect protected the world for decades, but its leader Jin Kwan-ho is accused of working with the enemy and disbands the sect to protect his son. Jin Mu-won grows up without family and without martial arts, until he finds the techniques his father secretly left behind and starts to rebuild the sect’s legacy.",
      overall: 9 },

    { title: "The World After The End", cover: 'Images/manhwa9.jpg', g1: '#7c2d12', g2: '#0f172a',
      rating: "8.6 / 10",
      mc: "Jaehwan, an ordinary man who climbs a 100-floor tower",
      art: "Dark, gritty action art by Undead Gamja, with intense monster fights.",
      story: "Giant towers suddenly appear all over the world and monsters pour out. Jaehwan and the other Walkers are told to climb to the top floor to save humanity, but things are not what they seem. When he learns the truth behind the tower, he vows to destroy the system and the world that betrayed him.",
      overall: 8.5 },

    { title: "Omniscient Reader’s Viewpoint", cover: 'Images/manhwa10.jpg', g1: '#4338ca', g2: '#0f172a',
      rating: "9.4 / 10",
      mc: "Kim Dokja, the only reader who finished the web novel",
      art: "Dynamic, electric panels with strong character expressions and big action moments, by Sleepy-C (Redice Studio).",
      story: "Kim Dokja is an office worker whose only hobby is a web novel that nobody else reads. The day the novel ends, the world turns into the story and deadly \"scenarios\" begin. Because he is the only one who knows what will happen, he has to decide whether to stay a reader or step up as a protagonist.",
      overall: 9.5 },

    { title: "Reaper of the Drifting Moon", cover: 'Images/manhwa11.jpg', g1: '#7f1d1d', g2: '#0f172a',
      rating: "8.6 / 10",
      mc: "Pyo Wol, an orphan who is trained to become a human weapon",
      art: "Dark, moody martial arts art by Inkyo. Often called top tier, with great character designs.",
      story: "Pyo Wol is an orphan who wakes up locked in a dark room, then finds out that masked people have kidnapped 300 children to train them as human weapons. Only a few of the strongest will be chosen, so he has to survive, stay calm, and find a way to break free.",
      overall: 8.5 },

    { title: "The Beginning After The End", cover: 'Images/manhwa12.jpg', g1: '#0f766e', g2: '#0f172a',
      rating: "8.9 / 10",
      mc: "Arthur Leywin, the reborn King Grey",
      art: "Colorful fantasy art. It started with Fuyuki23 and has had a few artist changes, currently MGK-story.",
      story: "King Grey was the strongest ruler in his world, but he was lonely and died too early. He is reborn as Arthur Leywin in a world of magic and monsters called Dicathen. This time he wants to correct his past mistakes and protect the people he loves.",
      overall: 9 },

    { title: "Magic Emperor", cover: 'Images/manhwa13.jpg', g1: '#581c87', g2: '#0f172a',
      rating: "8.0 / 10",
      mc: "Zhuo Fan, a betrayed Demon Emperor reborn as a servant boy",
      art: "Chinese manhua style with bright, flashy cultivation and magic effects.",
      story: "Zhuo Yifan, the feared Demon Emperor, is betrayed and killed, and then wakes up in the body of a servant boy named Zhuo Fan. He has to live with the boy’s memories and lead his weakened family back to the top, using his old knowledge and cunning mind.",
      overall: 8 },

    { title: "Solo Leveling Ragnarok", cover: 'Images/manhwa14.jpg', g1: '#312e81', g2: '#0f172a',
      rating: "8.3 / 10",
      mc: "Sung Suho, the son of Sung Jinwoo and Cha Hae-in",
      art: "Glossy dark-fantasy action art by Jin (Redice Studio), in the same style as the original Solo Leveling.",
      story: "This is the sequel to Solo Leveling. After the fall of one of the Absolute Ones, the others look to fill the empty power, and gates start spilling monsters into the world again. Sung Suho, the son of Sung Jinwoo, must answer the call, conquer the shadow dungeon, and learn about his father’s legacy.",
      overall: 8 },

    { title: "Revenge of the Iron-Blooded Sword Hound", cover: 'Images/manhwa15.jpg', g1: '#991b1b', g2: '#0f172a',
      rating: "8.7 / 10",
      mc: "Vikir Van Baskerville, a loyal “hound” who was betrayed and executed",
      art: "Bold, sharp action art by Seol Arang, with intense sword fights.",
      story: "Vikir was the loyal hunting hound of the Baskerville clan, doing assassinations and spy work for them. His reward was a false accusation of treason and the guillotine. Given another chance, he goes back to the past and sharpens his fangs, ready to take revenge on the clan that betrayed him.",
      overall: 8.5 }

    /* add more: copy one block above, put a comma after the block before it */
];
