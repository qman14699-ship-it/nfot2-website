/* Coffee Journal data - edit your drinks, prices, ratings, café and dates here.
   rating: number out of 10 (or null = "Not rated yet")
   art: 'heart' | 'drizzle' | 'foam' | 'none'   (only used when there is no photo)
   strength / sweet: 1 to 5      creamy (optional): 1 to 5
   type: 'Hot' or 'Iced'
   Photos: put them in Images/coffee/ named like the drink, e.g. Images/coffee/americano.jpg
           (lowercase, dashes for spaces: salted-caramel-macchiato.jpg) or set img: 'path' yourself. */
/* Coffee Journal data ... 
   ... */
var COFFEE_BG = 'Images/coffee-bg.png';
var CAFE = 'Grumpy Mama Caf\u00E9';
var COFFEE = [
    {
        name: 'Americano', price: '\u20B170', type: 'Hot', cafe: CAFE, date: 'Oct 30, 2026',
        desc: 'Espresso topped with hot water. Bold, clean and simple.',
        strength: 4, milk: 'None', sweet: 1,
        liquid: '#3b2314', top: '#5a3a22', art: 'none', img: 'Images/americano.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Cappuccino', price: '\u20B180', type: 'Hot', cafe: CAFE, date: 'Oct 30, 2026',
        desc: 'Espresso with steamed milk and a thick layer of foam.',
        strength: 3, milk: 'Steamed milk + foam', sweet: 2,
        liquid: '#a9743f', top: '#efe0c8', art: 'foam', img: 'Images/Cappuccino.jpg',
        rating: 9, verdict: 'Balanced ang kape at gatas, makapal at creamy ang foam.'
    },
    {
        name: 'Cheesecake Latte', price: '\u20B190', type: 'Hot', cafe: CAFE, date: 'Oct 29, 2026',
        desc: 'Creamy latte with a sweet cheesecake flavor.',
        strength: 2, milk: 'Steamed milk', sweet: 4,
        liquid: '#c89a62', top: '#f3e3c3', art: 'heart', img: 'Images/Cheesecake Latte.png',
        rating: null, verdict: ''
    },
    {
        name: 'French Vanilla', price: '\u20B190', type: 'Hot', cafe: CAFE, date: 'Oct 29, 2026',
        desc: 'Smooth latte with sweet, creamy vanilla.',
        strength: 2, milk: 'Steamed milk', sweet: 4,
        liquid: '#c08a55', top: '#f1e2c6', art: 'heart', img: 'Images/French Vanilla.jpg',
        rating: 9, verdict: 'Smooth at hindi nakakaumay, swabe ang vanilla.'
    },
    {
        name: 'Midnight Crumble Espresso', price: '\u20B190', type: 'Hot', cafe: CAFE, date: 'Oct 29, 2026',
        desc: 'A dark, strong espresso with a sweet crumble touch.',
        strength: 5, milk: 'None', sweet: 2,
        liquid: '#2a170d', top: '#4a2c18', art: 'foam', img: 'Images/Midnight Crumble Espresso.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Pumpkin Spice', price: '\u20B195', type: 'Hot', cafe: CAFE, date: 'Oct 28, 2026',
        desc: 'Warm autumn latte with pumpkin and spices.',
        strength: 2, milk: 'Steamed milk', sweet: 4,
        liquid: '#b9702f', top: '#e9c48f', art: 'drizzle', img: 'Images/Pumpkin Spice.jpg',drizzle: '#7a4a1e',
        rating: null, verdict: ''
    },
    {
        name: 'Roasted Hazelnut', price: '\u20B190', type: 'Hot', cafe: CAFE, date: 'Oct 28, 2026',
        desc: 'Nutty, toasty latte with roasted hazelnut flavor.',
        strength: 3, milk: 'Steamed milk', sweet: 3,
        liquid: '#9a6238', top: '#e6cfa8', art: 'heart', img: 'Images/Roasted Hazelnut.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Salted Caramel Macchiato', price: '\u20B190', type: 'Hot', cafe: CAFE, date: 'Oct 27, 2026',
        desc: 'Espresso and milk with sweet caramel and a pinch of salt.',
        strength: 3, milk: 'Steamed milk', sweet: 4,
        liquid: '#b07a3c', top: '#f0dcb4', art: 'drizzle', img: 'Images/Salted Caramel Macchiato.jpg',drizzle: '#c98a2b',
        rating: null, verdict: ''
    },
    {
        name: 'Spanish Latte', price: '\u20B190', type: 'Hot', cafe: CAFE,
        desc: 'Sweet and creamy latte made with condensed milk.',
        strength: 2, milk: 'Steamed milk + condensed milk', sweet: 5,
        liquid: '#c9a070', top: '#f5e8cf', art: 'heart', img: 'Images/Spanish Latte.jpg',
        rating: 9, verdict: 'Matamis at creamy, perfect kapag gusto mo ng comfort drink.'
    },
    {
        name: 'White Chocolate Latte', price: '\u20B190', type: 'Hot', cafe: CAFE,
        desc: 'Rich, creamy latte with melted white chocolate.',
        strength: 2, milk: 'Steamed milk', sweet: 5,
        liquid: '#d9bf94', top: '#fbf1de', art: 'heart', img: 'Images/White Chocolate Latte.jpg',
        rating: 9, verdict: 'Rich at dessert-like, ang sarap ng white chocolate.'
    },

   {
        name: 'Iced Americano', price: '\u20B190', type: 'Iced', cafe: CAFE,
        desc: 'Espresso over cold water and ice. Bold, clean and refreshing.',
        strength: 4, milk: 'None', sweet: 1,
        liquid: '#3b2314', top: '#5a3a22', art: 'none', img: 'Images/Iced Americano.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced Biscoff Latte', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'Cold latte with sweet, caramelized Biscoff cookie flavor.',
        strength: 2, milk: 'Cold milk', sweet: 5,
        liquid: '#b88455', top: '#f0dcbc', art: 'drizzle', drizzle: '#9a5a26', img: 'Images/Iced Biscoff Latte.png',
        rating: null, verdict: ''
    },
    {
        name: 'Iced Cheesecake Latte', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'Creamy iced latte with a sweet cheesecake flavor.',
        strength: 2, milk: 'Cold milk', sweet: 4,
        liquid: '#c89a62', top: '#f3e3c3', art: 'heart',img: 'Images/Iced Cheesecake Latte.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced French Vanilla', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'Smooth iced latte with sweet, creamy vanilla.',
        strength: 2, milk: 'Cold milk', sweet: 4,
        liquid: '#c08a55', top: '#f1e2c6', art: 'heart',img: 'Images/Iced French Vanilla.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced Midnight Crumble Espresso', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'A dark, strong iced espresso with a sweet crumble touch.',
        strength: 5, milk: 'None', sweet: 2,
        liquid: '#2a170d', top: '#4a2c18', art: 'foam',img: 'Images/Iced Midnight Crumble Espresso.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced Pumpkin Spice', price: '\u20B1130', type: 'Iced', cafe: CAFE,
        desc: 'Cold autumn latte with pumpkin and spices.',
        strength: 2, milk: 'Cold milk', sweet: 4,
        liquid: '#b9702f', top: '#e9c48f', art: 'drizzle', drizzle: '#7a4a1e',img: 'Images/Iced Pumpkin Spice.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced Roasted Hazelnut', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'Nutty, toasty iced latte with roasted hazelnut flavor.',
        strength: 3, milk: 'Cold milk', sweet: 3,
        liquid: '#9a6238', top: '#e6cfa8', art: 'heart',img: 'Images/Iced Roasted Hazelnut.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced Salted Caramel Macchiato', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'Iced espresso and milk with sweet caramel and a pinch of salt.',
        strength: 3, milk: 'Cold milk', sweet: 4,
        liquid: '#b07a3c', top: '#f0dcb4', art: 'drizzle', drizzle: '#c98a2b',img: 'Images/Iced Salted Caramel Macchiato.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced Spanish Latte', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'Sweet and creamy iced latte made with condensed milk.',
        strength: 2, milk: 'Cold milk + condensed milk', sweet: 5,
        liquid: '#c9a070', top: '#f5e8cf', art: 'heart',img: 'Images/Iced Spanish Latte.jpg',
        rating: null, verdict: ''
    },
    {
        name: 'Iced White Chocolate Latte', price: '\u20B1125', type: 'Iced', cafe: CAFE,
        desc: 'Rich, creamy iced latte with melted white chocolate.',
        strength: 2, milk: 'Cold milk', sweet: 5,
        liquid: '#d9bf94', top: '#fbf1de', art: 'heart',img: 'Images/Iced White Chocolate Latte.jpg',
        rating: null, verdict: ''
    }
];


