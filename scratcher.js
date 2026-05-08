// --- 1. GAME DATA (Massive list of meals) ---
const CUISINES = [
    { id: 'beef', name: "Beef", emoji: "🥩" }, 
    { id: 'chicken', name: "Chicken", emoji: "🍗" },
    { id: 'pork', name: "Pork", emoji: "🍖" },
    { id: 'fish', name: "Fish", emoji: "🐟" },
    { id: 'burger', name: "Burgers", emoji: "🍔" },
    { id: 'pizza', name: "Pizza", emoji: "🍕" },
    { id: 'tacos', name: "Tacos", emoji: "🌮" },
    { id: 'pasta', name: "Pasta", emoji: "🍝" },
    { id: 'stirfry', name: "Stir Fry", emoji: "🍳" },
    { id: 'sandwich', name: "Sandwiches", emoji: "🥪" },
    { id: 'grilledcheese', name: "Grilled Cheese", emoji: "🍞" },
    { id: 'eggs', name: "Eggs", emoji: "🥚" },
    { id: 'wraps', name: "Wraps", emoji: "🌯" },
    { id: 'soup', name: "Soup", emoji: "🥣" },
    { id: 'chili', name: "Chili", emoji: "🍲" },
    { id: 'maccheese', name: "Mac & Cheese", emoji: "🧀" },
    { id: 'hotdogs', name: "Hot Dogs", emoji: "🌭" },
    { id: 'salad', name: "Salad", emoji: "🥗" },
    { id: 'bakedpotato', name: "Baked Potato", emoji: "🥔" },
    { id: 'friedrice', name: "Fried Rice", emoji: "🍚" },
    { id: 'ramen', name: "Ramen", emoji: "🍜" },
    { id: 'breakfast', name: "Brunch", emoji: "🥞" },
    { id: 'leftovers', name: "Leftovers", emoji: "🥡" },
    { id: 'sushi', name: "Sushi", emoji: "🍣" },
    { id: 'curry', name: "Curry", emoji: "🍛" },
    { id: 'indian', name: "Indian", emoji: "🫓" },
    { id: 'dumplings', name: "Dumplings", emoji: "🥟" },
    { id: 'gyros', name: "Gyros/Shawarma", emoji: "🥙" },
    { id: 'tamales', name: "Tamales", emoji: "🫔" },
    { id: 'meatballs', name: "Meatballs", emoji: "🧆" },
    { id: 'bbq', name: "BBQ", emoji: "🔥" },
    { id: 'seafood', name: "Seafood Boil", emoji: "🍤" },
    { id: 'bento', name: "Bento Box", emoji: "🍱" },
    { id: 'kbbq', name: "Korean BBQ", emoji: "🥓" }
];

let gridData = [];
let revealedZones = []; 
let gameWon = false;

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
    // Prevent Chrome from showing the mini-infobar automatically
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Unhide our custom install button in the settings menu
    installBtn.classList.remove('hidden');
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the native install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            installBtn.classList.add('hidden'); // Hide button if they accepted
        }
        // We can only use the prompt once, so clear it
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
            
            setTimeout(() => {
                canvas.style.display = 'none'; 
                showMessage(
                    "WE HAVE A WINNER!", 
                    `<div class="winner-emoji">${cuisine.emoji}</div>
                     <p>You matched 3!</p>
                     <p>Tonight's dinner is <strong>${cuisine.name}</strong></p>`
                );
            }, 800); 
            
            return;
        }
    }
}

window.onload = initializeGame;