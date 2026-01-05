/* STICK HERO GAME - ENHANCED 
  Includes: Particle System, Audio Synthesis, and Smoother Physics
*/

// --- AUDIO CONTROLLER (Synthesizer) ---
// This generates sounds on the fly so you don't need external mp3 files.
class AudioController {
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.6; // Volume
    this.masterGain.connect(this.ctx.destination);
  }

  playTone(freq, type, duration) {
    if (this.ctx.state === "suspended") this.ctx.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      this.ctx.currentTime + duration
    );
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playStretch() {
    // Rising pitch
    if (this.ctx.state === "suspended") this.ctx.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playStickHit() {
    this.playTone(150, "square", 0.1);
  }
  playPerfect() {
    this.playTone(600, "sine", 0.3);
    setTimeout(() => this.playTone(800, "sine", 0.4), 100);
  }
  playScore() {
    this.playTone(400, "sine", 0.2);
  }
  playFall() {
    // 1. Ensure audio context is active (browsers sometimes sleep it)
    if (this.ctx.state === "suspended") this.ctx.resume();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // 2. Use 'sawtooth' for a buzzier, arcade-style sound
    osc.type = "sawtooth";

    // 3. Start High (800Hz) and drop Low (100Hz) - Classic cartoon fall
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.6);

    // 4. Volume control
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }
}

const audio = new AudioController();

// --- GAME CONFIGURATION ---
Array.prototype.last = function () {
  return this[this.length - 1];
};
Math.sinus = function (degree) {
  return Math.sin((degree / 180) * Math.PI);
};

// State
let phase = "waiting"; // waiting | stretching | turning | walking | transitioning | falling
let lastTimestamp;
let heroX;
let heroY;
let sceneOffset;

let platforms = [];
let sticks = [];
let trees = [];
let particles = []; // For particle effects

let score = 0;
let highScore = localStorage.getItem("stickHeroHighScore") || 0;

// Settings
const canvasWidth = 375;
const canvasHeight = 375;
const platformHeight = 100;
const heroDistanceFromEdge = 10;
const paddingX = 100;
const perfectAreaSize = 10;
const backgroundSpeedMultiplier = 0.2;

const stretchingSpeed = 4;
const turningSpeed = 4;
const walkingSpeed = 4;
const transitioningSpeed = 2;
const fallingSpeed = 2;

const heroWidth = 17;
const heroHeight = 30;

// DOM Elements
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const introductionElement = document.getElementById("introduction");
const perfectElement = document.getElementById("perfect");
const restartButton = document.getElementById("restart");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highscore");
const pauseButton = document.getElementById("pause");
const containerElement = document.querySelector(".container");

// Canvas Size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let paused = false;

// --- INITIALIZATION ---
resetGame();

function resetGame() {
  phase = "waiting";
  lastTimestamp = undefined;
  sceneOffset = 0;
  score = 0;

  introductionElement.style.opacity = 1;
  perfectElement.style.opacity = 0;
  restartButton.style.display = "none";
  scoreElement.innerText = score;
  highScoreElement.innerText = "Best: " + highScore;

  // Clean start
  platforms = [{ x: 50, w: 50 }];
  generatePlatform();
  generatePlatform();
  generatePlatform();
  generatePlatform();

  sticks = [{ x: platforms[0].x + platforms[0].w, length: 0, rotation: 0 }];
  trees = [];
  particles = [];

  for (let i = 0; i < 10; i++) generateTree();

  heroX = platforms[0].x + platforms[0].w - heroDistanceFromEdge;
  heroY = 0;

  draw();
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("stickHeroHighScore", highScore);
    highScoreElement.innerText = "Best: " + highScore;
  }
}

function generateTree() {
  const minimumGap = 30;
  const maximumGap = 150;
  const lastTree = trees[trees.length - 1];
  let furthestX = lastTree ? lastTree.x : 0;
  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));
  const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
  const color = treeColors[Math.floor(Math.random() * 3)];
  trees.push({ x, color });
}

function generatePlatform() {
  const minimumGap = 40;
  const maximumGap = 200;
  const minimumWidth = 20;
  const maximumWidth = 100;

  const lastPlatform = platforms[platforms.length - 1];
  let furthestX = lastPlatform.x + lastPlatform.w;
  const x =
    furthestX +
    minimumGap +
    Math.floor(Math.random() * (maximumGap - minimumGap));
  const w =
    minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));

  platforms.push({ x, w });
}

// --- PARTICLE SYSTEM ---
function createParticles(x, y, color) {
  for (let i = 0; i < 20; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 1.0,
      color: color || `hsl(${Math.random() * 360}, 100%, 50%)`,
    });
  }
}

function updateParticles() {
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.2; // Gravity
    p.life -= 0.05;
  });
  particles = particles.filter((p) => p.life > 0);
}

function drawParticles() {
  particles.forEach((p) => {
    ctx.save();
    ctx.translate(p.x, p.y + canvasHeight - platformHeight);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.life;
    ctx.fillRect(-2, -2, 4, 4);
    ctx.restore();
  });
}

// --- INPUT HANDLERS ---
function startStretch() {
  if (paused) return;
  if (phase === "waiting") {
    lastTimestamp = undefined;
    introductionElement.style.opacity = 0;
    phase = "stretching";
    // Initialize audio on first interaction
    if (audio.ctx.state === "suspended") audio.ctx.resume();
    window.requestAnimationFrame(animate);
  }
}

function stopStretch() {
  if (paused) return;
  if (phase === "stretching") {
    phase = "turning";
  }
}

// Desktop
window.addEventListener("mousedown", startStretch);
window.addEventListener("mouseup", stopStretch);

// Mobile
window.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.tagName !== "BUTTON") {
      // Prevent firing on buttons
      e.preventDefault();
      startStretch();
    }
  },
  { passive: false }
);

window.addEventListener(
  "touchend",
  (e) => {
    if (e.target.tagName !== "BUTTON") {
      e.preventDefault();
      stopStretch();
    }
  },
  { passive: false }
);

// Restart Button Logic
restartButton.addEventListener("click", function (event) {
  event.stopPropagation(); // Stop click from bubbling to window
  resetGame();
  restartButton.style.display = "none";
});

// Pause Button Logic
pauseButton.addEventListener("click", function (event) {
  event.stopPropagation();
  paused = !paused;
  pauseButton.innerText = paused ? "RESUME" : "PAUSE";

  if (!paused) {
    // RESET TIMESTAMP to prevent jumping
    lastTimestamp = undefined;
    window.requestAnimationFrame(animate);
  }
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw();
});

// --- MAIN LOOP ---
function animate(timestamp) {
  if (paused) return;

  if (!lastTimestamp) {
    lastTimestamp = timestamp;
    window.requestAnimationFrame(animate);
    return;
  }

  let dt = timestamp - lastTimestamp;

  switch (phase) {
    case "waiting":
      return; // Stop loop
    case "stretching":
      sticks.last().length += dt / stretchingSpeed;
      if (sticks.last().length % 10 < 2) audio.playStretch(); // Sound effect
      break;
    case "turning":
      sticks.last().rotation += dt / turningSpeed;
      if (sticks.last().rotation > 90) {
        sticks.last().rotation = 90;

        const [nextPlatform, perfectHit] = thePlatformTheStickHits();
        if (nextPlatform) {
          // HIT!
          audio.playStickHit();
          score += perfectHit ? 2 : 1;
          scoreElement.innerText = score;

          if (perfectHit) {
            audio.playPerfect();
            perfectElement.style.opacity = 1;
            // Add shake
            containerElement.classList.add("shake");
            setTimeout(() => containerElement.classList.remove("shake"), 300);

            // Add particles
            createParticles(nextPlatform.x + nextPlatform.w / 2, 0);

            setTimeout(() => (perfectElement.style.opacity = 0), 1000);
          } else {
            audio.playScore();
          }

          generatePlatform();
          generateTree();
          generateTree();
        } else {
          // MISS!
          audio.playStickHit();
        }
        phase = "walking";
      }
      break;
    case "walking":
      heroX += dt / walkingSpeed;
      const [nextPlatform] = thePlatformTheStickHits();

      if (nextPlatform) {
        // Walking on platform
        const maxHeroX = nextPlatform.x + nextPlatform.w - heroDistanceFromEdge;
        if (heroX > maxHeroX) {
          heroX = maxHeroX;
          phase = "transitioning";
        }
      } else {
        // Walking on stick (and about to fall)
        const maxHeroX = sticks.last().x + sticks.last().length + heroWidth;
        if (heroX > maxHeroX) {
          heroX = maxHeroX;

          // --- THIS IS THE TRIGGER ---
          audio.playFall();
          // ---------------------------

          phase = "falling";
        }
      }
      break;
      break;
    case "transitioning":
      sceneOffset += dt / transitioningSpeed;
      const [nextP] = thePlatformTheStickHits();
      if (sceneOffset > nextP.x + nextP.w - paddingX) {
        sticks.push({ x: nextP.x + nextP.w, length: 0, rotation: 0 });
        phase = "waiting";
      }
      break;
    case "falling":
      if (sticks.last().rotation < 180)
        sticks.last().rotation += dt / turningSpeed;

      heroY += dt / fallingSpeed;
      const maxHeroY =
        platformHeight + 100 + (window.innerHeight - canvasHeight) / 2;

      if (heroY > maxHeroY) {
        restartButton.style.display = "block"; // Show restart button
        // Force button to be visible and on top
        restartButton.style.transform = "translate(-50%, -50%) scale(1)";
        updateHighScore();
        return;
      }
      break;
  }

  updateParticles();
  draw();
  window.requestAnimationFrame(animate);
  lastTimestamp = timestamp;
}

function thePlatformTheStickHits() {
  if (sticks.last().rotation != 90) return [undefined, false];
  const stickFarX = sticks.last().x + sticks.last().length;

  const platformTheStickHits = platforms.find(
    (p) => p.x < stickFarX && stickFarX < p.x + p.w
  );

  if (
    platformTheStickHits &&
    platformTheStickHits.x + platformTheStickHits.w / 2 - perfectAreaSize / 2 <
      stickFarX &&
    stickFarX <
      platformTheStickHits.x + platformTheStickHits.w / 2 + perfectAreaSize / 2
  )
    return [platformTheStickHits, true];

  return [platformTheStickHits, false];
}

function draw() {
  ctx.save();
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  drawBackground();

  // Center scene
  ctx.translate(
    (window.innerWidth - canvasWidth) / 2 - sceneOffset,
    (window.innerHeight - canvasHeight) / 2
  );

  drawPlatforms();
  drawHero();
  drawSticks();
  drawParticles(); // Draw particles

  ctx.restore();
}

function drawPlatforms() {
  platforms.forEach(({ x, w }) => {
    ctx.fillStyle = "black";
    ctx.fillRect(
      x,
      canvasHeight - platformHeight,
      w,
      platformHeight + (window.innerHeight - canvasHeight) / 2
    );

    // Draw perfect center
    if (sticks.last().x < x) {
      ctx.fillStyle = "#e84656"; // Red center
      ctx.fillRect(
        x + w / 2 - perfectAreaSize / 2,
        canvasHeight - platformHeight,
        perfectAreaSize,
        perfectAreaSize
      );
    }
  });
}

function drawHero() {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.translate(
    heroX - heroWidth / 2,
    heroY + canvasHeight - platformHeight - heroHeight / 2
  );

  drawRoundedRect(
    -heroWidth / 2,
    -heroHeight / 2,
    heroWidth,
    heroHeight - 4,
    5
  );

  // Legs
  const legDistance = 5;
  ctx.beginPath();
  ctx.arc(legDistance, 11.5, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-legDistance, 11.5, 3, 0, Math.PI * 2);
  ctx.fill();

  // Bandana
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.arc(5, -7, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e84656";
  ctx.fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
  ctx.beginPath();
  ctx.moveTo(-9, -14.5);
  ctx.lineTo(-17, -18.5);
  ctx.lineTo(-14, -8.5);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-10, -10.5);
  ctx.lineTo(-15, -3.5);
  ctx.lineTo(-5, -7);
  ctx.fill();

  ctx.restore();
}

function drawRoundedRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.fill();
}

function drawSticks() {
  sticks.forEach((stick) => {
    ctx.save();
    ctx.translate(stick.x, canvasHeight - platformHeight);
    ctx.rotate((Math.PI / 180) * stick.rotation);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -stick.length);
    ctx.stroke();
    ctx.restore();
  });
}

function drawBackground() {
  var gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
  gradient.addColorStop(0, "#BBD691");
  gradient.addColorStop(1, "#FEF1E1");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // Parallax Hills
  drawHill(100, 10, 1, "#95C629");
  drawHill(70, 20, 0.5, "#659F1C");

  trees.forEach((tree) => drawTree(tree.x, tree.color));
}

function drawHill(baseHeight, amplitude, stretch, color) {
  ctx.beginPath();
  ctx.moveTo(0, window.innerHeight);
  ctx.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
  for (let i = 0; i < window.innerWidth; i++) {
    ctx.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
  }
  ctx.lineTo(window.innerWidth, window.innerHeight);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawTree(x, color) {
  ctx.save();
  ctx.translate(
    (-sceneOffset * backgroundSpeedMultiplier + x) * 1,
    getTreeY(x, 100, 10)
  );
  ctx.fillStyle = "#7D833C";
  ctx.fillRect(-1, -5, 2, 5);
  ctx.beginPath();
  ctx.moveTo(-5, -5);
  ctx.lineTo(0, -30);
  ctx.lineTo(5, -5);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function getHillY(windowX, baseHeight, amplitude, stretch) {
  const sineBaseY = window.innerHeight - baseHeight;
  return (
    Math.sinus((sceneOffset * backgroundSpeedMultiplier + windowX) * stretch) *
      amplitude +
    sineBaseY
  );
}

function getTreeY(x, baseHeight, amplitude) {
  const sineBaseY = window.innerHeight - baseHeight;
  return Math.sinus(x) * amplitude + sineBaseY;
}
