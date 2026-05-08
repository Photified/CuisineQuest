// --- 1. GAME DATA (Massive list of meals) ---
const CUISINES = [
    { 
        id: 'beef', name: "Beef", emoji: "🥩", 
        suggestions: ["Steak Frites", "Beef Stroganoff", "Pot Roast", "Beef Wellington", "Korean Beef Bowl", "Beef Stew", "Carne Asada", "Beef Brisket", "Corned Beef", "Beef Bourguignon", "Mongolian Beef", "Salisbury Steak", "Beef Enchiladas", "Prime Rib", "Philly Cheesesteak", "Beef Kebabs", "Flank Steak with Chimichurri", "Meatloaf", "Braised Short Ribs", "Beef Empanadas", "Steak Salad"] 
    }, 
    { 
        id: 'chicken', name: "Chicken", emoji: "🍗", 
        suggestions: ["Chicken Alfredo", "Roast Chicken", "Chicken Parmesan", "Lemon Pepper Chicken", "Chicken Piccata", "Chicken Marsala", "Fried Chicken", "Chicken Fajitas", "BBQ Chicken", "Chicken Pot Pie", "Orange Chicken", "Chicken Enchiladas", "Buffalo Wings", "Chicken Katsu", "Chicken Cordon Bleu", "Pesto Chicken", "Teriyaki Chicken", "Chicken Souvlaki", "Jerk Chicken", "Chicken and Waffles", "Coq au Vin"] 
    },
    { 
        id: 'pork', name: "Pork", emoji: "🍖", 
        suggestions: ["Pulled Pork", "Pork Chops", "Roasted Pork Tenderloin", "Sweet and Sour Pork", "Carnitas", "Pork Belly Bao", "BBQ Ribs", "Pork Katsu", "Sausage and Peppers", "Glazed Ham", "Pork Milanese", "Moo Shu Pork", "Pork Schnitzel", "Bratwurst & Sauerkraut", "Pork Fried Rice", "Pork Souvlaki"] 
    },
    { 
        id: 'fish', name: "Fish", emoji: "🐟", 
        suggestions: ["Grilled Salmon", "Fish Tacos", "Fish and Chips", "Baked Cod", "Seared Tuna Steaks", "Halibut Piccata", "Teriyaki Salmon", "Ceviche", "Pan-Seared Tilapia", "Fish Stew", "Mahi Mahi Mango Salsa", "Blackened Catfish", "Salmon Burgers", "Poke Bowl", "Trout Amandine", "Baja Fish Burritos", "Smoked Salmon Bagel"] 
    },
    { 
        id: 'burger', name: "Burgers", emoji: "🍔", 
        suggestions: ["Classic Cheeseburger", "Bacon Blue Cheese Burger", "Mushroom Swiss", "Black Bean Burger", "Smashburger", "Turkey Burger", "Patty Melt", "Sliders", "BBQ Bacon Burger", "Jalapeño Popper Burger", "Beyond/Impossible Burger", "Hawaiian Teriyaki Burger", "Fried Egg Burger", "Green Chile Burger"] 
    },
    { 
        id: 'pizza', name: "Pizza", emoji: "🍕", 
        suggestions: ["Margherita", "Pepperoni & Hot Honey", "BBQ Chicken", "Meat Lovers", "Veggie Supreme", "White Pizza (Bianca)", "Hawaiian", "Buffalo Chicken", "Mushroom & Truffle Oil", "Prosciutto & Arugula", "Four Cheese", "Pesto & Sun-dried Tomato", "Spinach & Feta", "Sausage & Peppers", "Fig & Goat Cheese"] 
    },
    { 
        id: 'tacos', name: "Tacos", emoji: "🌮", 
        suggestions: ["Al Pastor", "Carne Asada", "Carnitas", "Baja Fish Tacos", "Shrimp Tacos", "Chicken Tinga", "Birria Tacos", "Mushroom Tacos", "Breakfast Tacos", "Chorizo & Potato", "Sweet Potato & Black Bean", "Fried Avocado Tacos", "Barbacoa", "Cauliflower Walnut Tacos"] 
    },
    { 
        id: 'pasta', name: "Pasta", emoji: "🍝", 
        suggestions: ["Spaghetti & Meatballs", "Pesto Cavatappi", "Cacio e Pepe", "Penne alla Vodka", "Pasta Primavera", "Carbonara", "Lasagna", "Baked Ziti", "Fettuccine Alfredo", "Aglio e Olio", "Linguine & Clams", "Ravioli with Sage Butter", "Bolognese", "Shrimp Scampi", "Pasta Puttanesca", "Gnocchi with Gorgonzola", "Stuffed Shells", "Manicotti", "Lemon Ricotta Pasta", "Sausage Orecchiette"] 
    },
    { 
        id: 'stirfry', name: "Stir Fry", emoji: "🍳", 
        suggestions: ["Beef and Broccoli", "Chicken Teriyaki", "Tofu Stir Fry", "Shrimp Lo Mein", "Pad Thai", "Sweet and Sour Chicken", "Cashew Chicken", "Pepper Steak", "Vegetable Chop Suey", "Garlic Soba Noodles", "Kung Pao Chicken", "Mongolian Beef", "Dan Dan Noodles", "Drunken Noodles", "Hoisin Pork Stir Fry"] 
    },
    { 
        id: 'sandwich', name: "Sandwiches", emoji: "🥪", 
        suggestions: ["BLT", "Club Sandwich", "Reuben", "French Dip", "Philly Cheesesteak", "Turkey and Brie", "Cuban", "Meatball Sub", "Italian Grinder", "Egg Salad", "Tuna Melt", "Chicken Salad Sandwich", "Caprese Sandwich", "Pulled Pork Sandwich", "Banh Mi", "Muffuletta", "Croque Monsieur", "Pork Belly BLT"] 
    },
    { 
        id: 'grilledcheese', name: "Grilled Cheese", emoji: "🍞", 
        suggestions: ["Classic Cheddar", "Gouda & Apple", "Bacon & Tomato", "Pesto Mozzarella", "Jalapeño Popper", "Triple Cream Brie", "Kimchi Grilled Cheese", "Mac & Cheese Stuffed", "Buffalo Chicken", "Fig & Prosciutto", "French Onion Grilled Cheese", "Spinach Artichoke", "Mushroom & Gruyere"] 
    },
    { 
        id: 'eggs', name: "Eggs", emoji: "🥚", 
        suggestions: ["Denver Omelette", "Eggs Benedict", "Shakshuka", "Scrambled with Chives", "Sunny Side Up & Toast", "Quiche Lorraine", "Vegetable Frittata", "Egg Salad", "Huevos Rancheros", "Deviled Eggs", "Scotch Eggs", "Croque Madame", "Breakfast Hash", "Egg Drop Soup", "Menemen (Turkish Eggs)"] 
    },
    { 
        id: 'wraps', name: "Wraps", emoji: "🌯", 
        suggestions: ["Chicken Caesar", "Buffalo Chicken", "Turkey Club", "Falafel Wrap", "Hummus & Veggie", "Tuna Salad Wrap", "BLT Wrap", "Greek Chicken Wrap", "Southwestern Wrap", "Breakfast Wrap", "Thai Peanut Chicken Wrap", "California Burrito", "Shawarma Wrap"] 
    },
    { 
        id: 'soup', name: "Soup", emoji: "🥣", 
        suggestions: ["Tomato Basil", "Chicken Noodle", "French Onion", "Minestrone", "Butternut Squash", "Clam Chowder", "Lentil Soup", "Miso Soup", "Pho", "Potato Leek", "Broccoli Cheddar", "Tortilla Soup", "Corn Chowder", "Split Pea", "Matzo Ball", "Tom Yum", "Italian Wedding Soup", "Gazpacho", "Mushroom Barley", "Pozole"] 
    },
    { 
        id: 'chili', name: "Chili", emoji: "🍲", 
        suggestions: ["Classic Texas Red", "White Chicken Chili", "Turkey Chili", "Vegetarian Black Bean", "Spicy Beef & Kidney Bean", "Pumpkin Chili", "Three Bean Chili", "Cincinnati Chili", "Verde Pork Chili", "Smoky Chipotle Chili", "Lentil Chili", "Brisket Chili"] 
    },
    { 
        id: 'maccheese', name: "Mac & Cheese", emoji: "🧀", 
        suggestions: ["Classic Baked Mac", "Lobster Mac", "Truffle Mac", "Bacon Mac", "Jalapeño Popper Mac", "Buffalo Chicken Mac", "Four Cheese", "Pulled Pork Mac", "Vegan Cashew Mac", "Pesto Mac", "Chili Mac", "Broccoli Mac & Cheese", "Cajun Shrimp Mac"] 
    },
    { 
        id: 'hotdogs', name: "Hot Dogs", emoji: "🌭", 
        suggestions: ["Chicago Style", "Chili Cheese Dog", "New York Style (Kraut & Mustard)", "Corn Dog", "Bacon Wrapped", "Slaw Dog", "Sonoran Dog", "Pretzel Dog", "Mac & Cheese Dog", "Jalapeño Dog", "Seattle Dog (Cream Cheese & Onions)", "Pigs in a Blanket", "Bratwurst"] 
    },
    { 
        id: 'salad', name: "Salad", emoji: "🥗", 
        suggestions: ["Caesar Salad", "Cobb Salad", "Greek Salad", "Caprese", "Nicoise", "Spinach & Warm Bacon Dressing", "Waldorf", "Chef Salad", "Taco Salad", "Quinoa Bowl", "Fattoush", "Panzanella", "Southwest Chicken Salad", "Strawberry Spinach Salad", "Asian Cabbage Salad", "Beet & Goat Cheese Salad", "Wedge Salad", "Kale & Cranberry Salad"] 
    },
    { 
        id: 'bakedpotato', name: "Baked Potato", emoji: "🥔", 
        suggestions: ["Classic Loaded", "Broccoli & Cheddar", "Chili Cheese", "BBQ Chicken Stuffed", "Sour Cream & Chive", "Vegetarian Black Bean", "Bacon & Ranch", "Buffalo Chicken Stuffed", "Pulled Pork Stuffed", "Taco Stuffed", "Mushroom & Swiss Stuffed", "Philly Cheesesteak Potato"] 
    },
    { 
        id: 'friedrice', name: "Fried Rice", emoji: "🍚", 
        suggestions: ["Chicken Fried Rice", "Pork Fried Rice", "Shrimp Fried Rice", "Vegetable Fried Rice", "Kimchi Fried Rice", "Pineapple Fried Rice", "Duck Fried Rice", "Spam Fried Rice", "Thai Basil Fried Rice", "Egg Fried Rice", "Bacon Fried Rice", "Mushroom Fried Rice"] 
    },
    { 
        id: 'ramen', name: "Ramen", emoji: "🍜", 
        suggestions: ["Tonkotsu", "Shoyu", "Miso", "Shio", "Spicy Beef Ramen", "Chicken Katsu Ramen", "Vegan Ramen", "Seafood Ramen", "Tsukemen (Dipping Noodles)", "Garlic Butter Ramen", "Tan Tan Ramen", "Curry Ramen"] 
    },
    { 
        id: 'breakfast', name: "Brunch", emoji: "🥞", 
        suggestions: ["Buttermilk Pancakes", "Belgian Waffles", "French Toast", "Avocado Toast", "Breakfast Burrito", "Hash Browns & Eggs", "Crepes", "Biscuits and Gravy", "Oatmeal Bowl", "Breakfast Hash", "Chilaquiles", "Bagel & Lox", "Dutch Baby Pancake", "Smoothie Bowl", "Scones & Jam"] 
    },
    { 
        id: 'leftovers', name: "Leftovers", emoji: "🥡", 
        suggestions: ["Pizza Reheat", "Pasta Bake", "Sandwich Remix", "Fried Rice Revival", "Soup Medley", "Salad Toss", "Microwave Meal", "Leftover Tacos", "Kitchen Sink Frittata", "Snack Plate/Girl Dinner", "Leftover Quesadilla", "Stuffed Peppers (using leftovers)"] 
    },
    { 
        id: 'sushi', name: "Sushi", emoji: "🍣", 
        suggestions: ["Spicy Tuna Roll", "California Roll", "Dragon Roll", "Salmon Nigiri", "Rainbow Roll", "Spider Roll", "Yellowtail Sashimi", "Eel (Unagi) Roll", "Philadelphia Roll", "Veggie Roll", "Dynamite Roll", "Volcano Roll", "Tuna Tataki", "Chirashi Bowl"] 
    },
    { 
        id: 'curry', name: "Curry", emoji: "🍛", 
        suggestions: ["Chicken Tikka Masala", "Thai Green Curry", "Butter Chicken", "Japanese Curry", "Thai Red Curry", "Panang Curry", "Massaman Curry", "Chana Masala", "Beef Rendang", "Coconut Shrimp Curry", "Yellow Potato Curry", "Lamb Vindaloo", "Goan Fish Curry"] 
    },
    { 
        id: 'indian', name: "Indian", emoji: "🫓", 
        suggestions: ["Tandoori Chicken", "Naan & Dips", "Palak Paneer", "Samosas", "Biryani", "Aloo Gobi", "Dal Makhani", "Lamb Rogan Josh", "Malai Kofta", "Vindaloo", "Chicken Korma", "Saag Gosht", "Chole Bhature", "Paneer Tikka"] 
    },
    { 
        id: 'dumplings', name: "Dumplings", emoji: "🥟", 
        suggestions: ["Pork Potstickers", "Soup Dumplings (Xiao Long Bao)", "Chicken Gyoza", "Har Gow (Shrimp)", "Pierogi", "Shumai", "Wontons in Chili Oil", "Korean Mandu", "Nepalese Momo", "Veggie Dumplings", "Pelmeni", "Empanadas", "Manti"] 
    },
    { 
        id: 'gyros', name: "Gyros/Shawarma", emoji: "🥙", 
        suggestions: ["Traditional Lamb Gyro", "Chicken Shawarma", "Beef Gyro", "Falafel Pita", "Doner Kebab", "Halloumi Wrap", "Spicy Chicken Gyro", "Mixed Grill Plate", "Gyro Salad Bowl", "Loaded Gyro Fries", "Iskender Kebab"] 
    },
    { 
        id: 'tamales', name: "Tamales", emoji: "🫔", 
        suggestions: ["Pork Colorado", "Chicken Verde", "Jalapeño & Cheese (Rajas)", "Sweet Corn Tamales", "Beef Tamales", "Black Bean & Corn", "Mole Chicken", "Chorizo Tamales", "Pineapple Tamales", "Dessert Tamales", "Bean & Cheese", "Shrimp Tamales"] 
    },
    { 
        id: 'meatballs', name: "Meatballs", emoji: "🧆", 
        suggestions: ["Italian Meatballs", "Swedish Meatballs", "Sweet and Sour Meatballs", "Turkey Meatballs", "Porcupine Meatballs", "Greek Lamb Keftedes", "Asian Glazed Meatballs", "Meatball Stroganoff", "Spicy Chicken Meatballs", "Vegan Lentil Meatballs", "Albondigas Soup"] 
    },
    { 
        id: 'bbq', name: "BBQ", emoji: "🔥", 
        suggestions: ["BBQ Ribs", "Smoked Brisket", "Pulled Pork", "Burnt Ends", "Smoked Sausage", "BBQ Chicken Quarters", "Smoked Turkey Leg", "BBQ Beans & Meat", "Tri-Tip", "Pork Belly", "Texas Hot Links", "Smoked Salmon", "BBQ Pulled Chicken"] 
    },
    { 
        id: 'seafood', name: "Seafood Boil", emoji: "🍤", 
        suggestions: ["Garlic Butter Crab Legs", "Cajun Shrimp Boil", "New England Clambake", "Lobster Tails", "Crawfish Boil", "Mussels Marinara", "Oysters Rockefeller", "Scallop Scampi", "Fried Calamari", "Seafood Paella", "Shrimp and Grits", "Clam Linguine"] 
    },
    { 
        id: 'bento', name: "Bento Box", emoji: "🍱", 
        suggestions: ["Chicken Teriyaki Bento", "Salmon Shioyaki", "Tonkatsu Bento", "Sushi Bento", "Tempura Bento", "Karaage (Fried Chicken) Bento", "Tamagoyaki Bento", "Unagi (Eel) Bento", "Tofu Veggie Bento", "Yakiniku (Grilled Meat) Bento", "Saba (Mackerel) Bento"] 
    },
    { 
        id: 'kbbq', name: "Korean BBQ", emoji: "🥓", 
        suggestions: ["Bulgogi (Marinated Beef)", "Galbi (Short Ribs)", "Samgyeopsal (Pork Belly)", "Spicy Pork Bulgogi", "Chadolbaegi (Beef Brisket)", "Dak Galbi (Spicy Chicken)", "Bibimbap", "Japchae", "Kimchi Stew (Jjigae)", "Seafood Pancake (Haemul Pajeon)", "Tteokbokki", "Banchan Tasting Plate"] 
    }
];

let gridData = [];
let revealedZones = []; 
let gameWon = false;

// Helper function to get 3 random suggestions
function getRandomSuggestions(suggestionsArray, count = 3) {
    if (!suggestionsArray || suggestionsArray.length === 0) return [];
    const shuffled = [...suggestionsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// --- 2. UI CONTROLLERS & PWA LOGIC ---
const uiOverlay = document.getElementById('ui-overlay');
const playAgainBtn = document.getElementById('play-again-btn');
const underGrid = document.getElementById('under-grid');

// Settings Elements
const settingsBtn = document.getElementById('settings-btn');
const settingsOverlay = document.getElementById('settings-overlay');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const installBtn = document.getElementById('install-btn');

playAgainBtn.addEventListener('click', () => { window.location.reload(); });

settingsBtn.addEventListener('click', () => { settingsOverlay.classList.add('active'); });
closeSettingsBtn.addEventListener('click', () => { settingsOverlay.classList.remove('active'); });

function showMessage(title, body) {
    uiOverlay.classList.add('active');
    document.getElementById('message-title').innerText = title;
    document.getElementById('message-body').innerHTML = body; 
}

// PWA Installation Logic
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBtn.classList.add('hidden');
        }
        deferredPrompt = null;
    }
});


// --- 3. GAME INITIALIZATION ---
function initializeGame() {
    generateGridData();
    renderGrid();
    initCanvasScratch();
}

function generateGridData() {
    const shuffledMaster = [...CUISINES].sort(() => 0.5 - Math.random());
    const possibleWinners = shuffledMaster.slice(0, 4);
    const fillers = shuffledMaster.slice(4, 14);

    let tempGrid = [];
    
    // 4 copies of the 4 winners (16 cells)
    possibleWinners.forEach(cuisine => {
        for (let i = 0; i < 4; i++) tempGrid.push(cuisine);
    });

    // 2 copies of the 10 fillers (20 cells)
    fillers.forEach(cuisine => {
        for (let i = 0; i < 2; i++) tempGrid.push(cuisine);
    });

    gridData = tempGrid.sort(() => 0.5 - Math.random());
}

function renderGrid() {
    underGrid.innerHTML = '';
    gridData.forEach(cuisine => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.innerHTML = `<div>${cuisine.emoji}</div>`;
        underGrid.appendChild(cell);
    });
}

// --- 4. INSTANT SNAP MECHANICS & KITCHEN AESTHETIC ---
function initCanvasScratch() {
    const canvas = document.getElementById('main-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 500; 
    canvas.height = 500; 

    // Draw the "Ceramic Tile" cover
    ctx.fillStyle = '#f4f1ea'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ghosted Plate & Silverware Watermark
    ctx.save(); 
    ctx.globalAlpha = 0.25; 
    ctx.font = '280px Arial'; 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#8e9e82'; 
    
    ctx.fillText('🍽️', canvas.width / 2, canvas.height / 2 + 10); 
    
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore(); 
    
    // Draw Tile Grout lines (6x6)
    ctx.strokeStyle = '#e0dcd3'; 
    ctx.lineWidth = 3;
    const step = canvas.width / 6;
    
    for(let i = 1; i < 6; i++) {
        ctx.beginPath(); ctx.moveTo(i * step, 0); ctx.lineTo(i * step, 500); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * step); ctx.lineTo(500, i * step); ctx.stroke();
    }

    ctx.fillStyle = '#6b7a5f'; 
    ctx.font = 'bold 32px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TAP TO REVEAL', canvas.width/2, canvas.height/2);

    let isInteracting = false;

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = e.type.includes('touch') ? (e.touches[0] || e.changedTouches[0]).clientX : e.clientX;
        let clientY = e.type.includes('touch') ? (e.touches[0] || e.changedTouches[0]).clientY : e.clientY;
        return {
            x: (clientX - rect.left) * (canvas.width / rect.width),
            y: (clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function processInteraction(e) {
        if (gameWon) return;
        
        const pos = getPosition(e);
        const zoneW = canvas.width / 6; 
        const zoneH = canvas.height / 6;
        
        const col = Math.floor(pos.x / zoneW);
        const row = Math.floor(pos.y / zoneH);
        
        if (col < 0 || col > 5 || row < 0 || row > 5) return; 
        
        const zoneIndex = row * 6 + col; 

        if (!revealedZones.includes(zoneIndex)) {
            ctx.clearRect(col * zoneW - 1, row * zoneH - 1, zoneW + 2, zoneH + 2);
            revealedZones.push(zoneIndex);
            checkForWin(canvas);
        }
    }

    canvas.addEventListener('mousedown', (e) => { isInteracting = true; processInteraction(e); }); 
    canvas.addEventListener('mousemove', (e) => { if (isInteracting) processInteraction(e); });
    window.addEventListener('mouseup', () => { isInteracting = false; }); 
    
    canvas.addEventListener('touchstart', (e) => { 
        isInteracting = true; 
        e.preventDefault(); 
        processInteraction(e); 
    }, { passive: false }); 
    
    canvas.addEventListener('touchmove', (e) => { 
        if (isInteracting) {
            e.preventDefault(); 
            processInteraction(e); 
        }
    }, { passive: false }); 
    window.addEventListener('touchend', () => { isInteracting = false; });
}

// --- 5. WIN LOGIC & FULL REVEAL ---
function checkForWin(canvas) {
    if (gameWon) return;

    const revealedCounts = {};
    
    for (let zoneIndex of revealedZones) {
        const cuisine = gridData[zoneIndex];
        revealedCounts[cuisine.id] = (revealedCounts[cuisine.id] || 0) + 1;
        
        if (revealedCounts[cuisine.id] === 3) {
            gameWon = true;
            canvas.style.opacity = '0';

            // Fetch exactly 3 random suggestions
            const topSuggestions = getRandomSuggestions(cuisine.suggestions, 3);
            let suggestionsHTML = "";

            if (topSuggestions.length > 0) {
                suggestionsHTML = `
                    <div class="suggestions-list">
                        <p><strong>Chef's Suggestions:</strong></p>
                        <ul>
                            ${topSuggestions.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            setTimeout(() => {
                canvas.style.display = 'none'; 
                showMessage(
                    "WE HAVE A WINNER!", 
                    `<div class="winner-emoji">${cuisine.emoji}</div>
                     <p>You matched 3!</p>
                     <p>Tonight's dinner is <strong>${cuisine.name}</strong></p>
                     ${suggestionsHTML}`
                );
            }, 800); 
            
            return;
        }
    }
}

window.onload = initializeGame;