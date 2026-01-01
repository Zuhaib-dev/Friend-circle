// --- Configuration & Data ---

const images = [
  // Yousmarg photos 2025
  { src: "main photo.jpg", alt: "Whisper the mountains whisper peace and the meadows speak magic – Yousmarg." },
  { src: "wazwan party (2).jpg", alt: "Where the mountains whisper peace and the meadows speak magic – Yousmarg." },
  { src: "wazwan party (3).jpg", alt: "This view = therapy for free." },
  { src: "wazwan party (5).jpg", alt: "Every step here feels like a scene from a dream." },
  { src: "wazwan party (1).jpg", alt: "Every step here feels like a scene from a dream." },
  
  // Solo pics
  { src: "yous (1).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (2).jpg", alt: "Learning to enjoy my own company, one solo trip at a time." },
  { src: "yous (3).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (4).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (5).jpg", alt: "Shoulder seat: reserved for the queen only(Luna)🐱" },
  { src: "yous (6).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (7).jpg", alt: "One man. Infinite journeys." },
  { src: "yous (8).jpg", alt: "Every scar, every smile – this is my story in one frame." },
  { src: "yous (9).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (10).jpg", alt: "Learning to enjoy my own company, one solo trip at a time." },
  { src: "yous (11).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (12).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (13).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (14).jpg", alt: "Every scar, every smile – this is my story in one frame." },
  { src: "yous (15).jpg", alt: "Learning to enjoy my own company, one solo trip at a time." },
  { src: "yous (16).jpg", alt: "Learning to enjoy my own company, one solo trip at a time." },
  { src: "yous (17).jpg", alt: "Sometimes the best company is your own reflection." },
  { src: "yous (18).jpg", alt: "Learning to enjoy my own company, one solo trip at a time." },
  { src: "yous (19).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (20).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (21).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (22).jpg", alt: "Confidence looks better in natural light" },
  { src: "yous (23).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (24).jpg", alt: "Confidence looks better in natural light" },
  { src: "yous (25).jpg", alt: "Every scar, every smile – this is my story in one frame." },
  { src: "yous (26).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (27).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (28).jpg", alt: "Every scar, every smile – this is my story in one frame." },
  { src: "yous (29).jpg", alt: "One man. Infinite journeys." },
  { src: "yous (30).jpg", alt: "Just me, the moment, and the mountain breeze." },
  { src: "yous (31).jpg", alt: "Learning to enjoy my own company, one solo trip at a time." },

  // July 2025
  { src: "astanmarg.jpg", alt: "Breathtaking views from Astanmarg 🌄✨" },
  { src: "badipoora party.jpg", alt: "Where the sky kisses the mountains." },
  { src: "badipoora party (1).jpg", alt: "Peace embraces your soul." },
  { src: "badipoora party (2).jpg", alt: "Astanmarg vibes." },
  { src: "badipoora party (3).jpg", alt: "Nature's best." },

  // May 2024
  { src: "may2024 (1).jpg", alt: "Grace in the presence." },
  { src: "may2024 (2).jpg", alt: "Timeless moments." },
  { src: "may2024 (3).jpg", alt: "Effortlessly captured." },
  { src: "may2024 (4).jpg", alt: "Mountain serenity." },
  { src: "may2024 (5).jpg", alt: "Natural beauty." },
  { src: "may2024 (6).jpg", alt: "Grace and pose." },
  { src: "may2024 (7).jpg", alt: "Captured moments." },
  { src: "may2024 (8).jpg", alt: "Timeless." },
  { src: "may2024 (9).jpg", alt: "Presence." },
  { src: "may2024 (10).jpg", alt: "Effortless." },

  { src: "photo.jpg", alt: "Group photo in Machikhanen Haijen" },
  { src: "photo1.jpg", alt: "Group photo in Machikhanen Haijen" },
  { src: "Tehseen akbar/new.jpg ", alt: "Photo by Tehseen" },
  { src: "Tehseen akbar/new1.jpg", alt: "Gulmarg by Tehseen" },
  { src: "Tehseen akbar/new2.jpg", alt: "Doodhpathri by Tehseen" },
  
  // Ramazan
  { src: "wazwan party (6).jpg", alt: "Ramadan 2025 pics🤞" },
  { src: "wazwan party (4).jpg", alt: "Ramadan 2025 pics🤞" },

  // Tehseen Akbar Series
  { src: "Tehseen akbar/new3.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new4.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new17.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new7.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new8.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new18.jpg", alt: "Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new22.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new33.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new34.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new36.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new39.jpg", alt: "Photo by Tehseen Bin Akbar" },

  // Others
  { src: "photo3.jpg", alt: "Sahil and Sameem by Zuhaib" },
  { src: "photo4.jpg", alt: "Sahil and Sameem at Mandikhal" },
  { src: "photo5.jpg", alt: "Sameem" },
  { src: "photo7.jpg", alt: "Group photo at Dharkhal" },
  { src: "photo8.jpg", alt: "Aqib edited by Zuhaib" },
  { src: "Aqib.jpg", alt: "Aqib by Zuhaib" },
  { src: "muba.jpg", alt: "Mubashir" },
  { src: "muba1.jpg", alt: "Mubashir" },
  { src: "muba2.jpg", alt: "Mubashir" },
  { src: "photo9.jpg", alt: "Faisal by Zuhaib" },
  { src: "photo10.jpg", alt: "Selfie by Aqib at Dharkhal" },
  { src: "photo10.2.jpg", alt: "Selfie by Aqib at Dharkhal" },
  { src: "photo11.jpg", alt: "Sahil by Aqib" },
  { src: "photo13.jpg", alt: "Badipoora Widder chicken party" },
  { src: "photo14.jpg", alt: "Musaib at Machikhanen" },
  { src: "photo15.jpg", alt: "Tatakoti MT by Mursalien" },
  { src: "photo16.jpg", alt: "Yousmarg by Aqib" },
  
  // More Tehseen
  { src: "Tehseen akbar/new6.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new11.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new12.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new16.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new20.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new26.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new31.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new32.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new37.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new38.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new40.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new44.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new45.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new46.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new47.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new50.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new51.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new52.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new53.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new54.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new59.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new60.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new65.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new66.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new67.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new68.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new70.jpg", alt: "Photo by Tehseen Bin Akbar" },
  { src: "Tehseen akbar/new79.jpg", alt: "Sahil Javeed" },
  
  { src: "photo30.jpg", alt: "Zubair at Mandikhal Haijen" },
  { src: "zubair.jpg", alt: "Zubair" },
  { src: "zubair1.jpg", alt: "Zubair" },
  { src: "Tehseen akbar/new69.jpg", alt: "Tehseen" },
  { src: "Tehseen akbar/new72.jpg", alt: "Shahid Khan" },
  { src: "Tehseen akbar/new77.jpg", alt: "Shahid Khan" },
  { src: "janna (1).jpg", alt: "Tehseen Bin Akbar" },
  { src: "janna (2).jpg", alt: "Tehseen Bin Akbar" },
  { src: "janna (3).jpg", alt: "Tehseen Bin Akbar" },
  { src: "janna (4).jpg", alt: "Tehseen Bin Akbar" },
  { src: "janna (5).jpg", alt: "Tehseen Bin Akbar" },
  { src: "mavin.jpg", alt: "Mavin with Friend Circle" },

  // Food & Scenery
  { src: "photo18.jpg", alt: "Cooking chicken at Mandikhal" },
  { src: "photo19.jpg", alt: "Cooking chicken at Mandikhal" },
  { src: "photo20.jpg", alt: "Cooking chicken at Mandikhal" },
  { src: "photo21.jpg", alt: "Cooking chicken at Mandikhal" },
  { src: "photo22.jpg", alt: "Cooking chicken at Mandikhal" },
  { src: "photo23.jpg", alt: "Cooking chicken at Badipoora" },
  { src: "photo24.jpg", alt: "Cooking chicken at Badipoora" },
  { src: "photo25.jpg", alt: "Dharkhal" },
  { src: "photo26.jpg", alt: "Nilnag Lake by Aqib" },
  { src: "photo27.jpg", alt: "Nilnag Lake by Aqib" },
  { src: "photo28.jpg", alt: "Nilnag Lake by Aqib" },
  { src: "photo29.jpg", alt: "Cooking chicken at Badipoora" },
  
  // Edited / Misc
  { src: "edit1 (1).jpg", alt: "Machikhanen by Zuhaib" },
  { src: "edit1 (2).jpg", alt: "Haijen vibes" },
  { src: "edit1 (4).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (3).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (5).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (6).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (7).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (8).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (9).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (10).jpg", alt: "Haijen by Zuhaib" },
  { src: "edit1 (11).jpg", alt: "Photo by Zuhaib" },
  { src: "edit1 (12).jpg", alt: "Photo by Zuhaib" },
  { src: "edit1 (13).jpg", alt: "Photo by Zuhaib" },
  { src: "umar.enc", alt: "Umer Ayoub" },
  { src: "Haseeb.webp", alt: "Haseeb" },

  { src: "Haziq.webp", alt: "Haziq" },
  { src: "Haziq1.jpg", alt: "Haziq" },
  { src: "Bilmam.jpg", alt: "Bilal Bhat" },
  { src: "Bilmam2.jpg", alt: "Bilal Bhat" },
  { src: "Faisal.jpg", alt: "Furqan" },
  { src: "Faisal1.jpg", alt: "Furqan" },
  { src: "Faisal2.jpg", alt: "Furqan" },
  { src: "Faisal3.jpg", alt: "Furqan" },
  { src: "Faisal4.jpg", alt: "Furqan" },
  { src: "Faisal5.jpeg", alt: "Furqan" },
  { src: "Naveed.webp", alt: "Naveed" },
  { src: "Naveed1.webp", alt: "Naveed" },
  { src: "Naveed2.webp", alt: "Naveed" },
  
  { src: "tehseen (1).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (2).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (3).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (4).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (5).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (6).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (7).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (8).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (9).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (10).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (11).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (12).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (13).jpg", alt: "Tehseen Bin Akbar" },
  { src: "tehseen (14).jpg", alt: "Tehseen Bin Akbar" },
  
  { src: "Sameem4.webp", alt: "Sameem" },
  { src: "Sameem1.webp", alt: "Sameem" },
  { src: "Sameem2.webp", alt: "Sameem" },
  { src: "Sameem3.webp", alt: "Sameem" },
  { src: "Farhan (1).jpg", alt: "Farhan" },
  { src: "Farhan (2).jpg", alt: "Farhan" },
  { src: "Farhan (3).jpg", alt: "Farhan" },
  { src: "sahil (1).jpg", alt: "Sahil Javid at Tosamaidan" },
  { src: "sahil (2).jpg", alt: "Sahil Javid at Tosamaidan" },
  { src: "sahil (3).jpg", alt: "Sahil Javid at Tosamaidan" },
  { src: "sahil (4).jpg", alt: "Sahil Javid at Tosamaidan" },
  
  { src: "swim (1).jpg", alt: "Night swim adventure! 🌌💦" },
  { src: "Group Photo📍.jpg", alt: "Friendship started 2016 💫🚀" },
  { src: "swim.jpeg", alt: "River vibes & friendship goals 🌊✨" },
  
  { src: "amir shafi (1).jpeg", alt: "Amir Shafi: Trekking enthusiast" },
  { src: "amir shafi (2).jpeg", alt: "Amir Shafi" },
  { src: "amir shafi (3).jpeg", alt: "Amir Shafi" },
  { src: "amir shafi (4).jpeg", alt: "Group adventure" },
  { src: "amir shafi (5).jpeg", alt: "Group adventure" },
  { src: "amir shafi (6).jpeg", alt: "Group adventure" },
  { src: "amir shafi (7).jpeg", alt: "Group adventure" },
  { src: "amir shafi (8).jpeg", alt: "Group adventure" },
  { src: "amir shafi (9).jpeg", alt: "Amir Shafi" },
  { src: "amir shafi (10).jpeg", alt: "Group adventure" },
  { src: "mudasir.webp", alt: "Off-roading & photography." },
  { src: "mudasir2.webp", alt: "Off-roading & photography." },
  { src: "Mudasir Hameed.webp", alt: "Off-roading & photography." },
];

// --- DOM Elements ---
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalImg = document.getElementById("modalImg");
const caption = document.getElementById("caption");
const closeBtn = document.getElementById("close");
const preloader = document.getElementById("preloader");

// --- Initialization ---

// 1. Hide Preloader on Load
window.addEventListener("load", () => {
  preloader.style.opacity = "0";
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});

// 2. Intersection Observer for Lazy Loading
const observerOptions = {
  root: null,
  rootMargin: "50px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => {
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
        // Remove skeleton/bg color from parent
        img.parentElement.classList.remove("bg-gray-200", "animate-pulse");
      };
      obs.unobserve(img);
    }
  });
}, observerOptions);

// 3. Render Gallery
images.forEach(({ src, alt }) => {
  // Container for Masonry Item
  const card = document.createElement("div");
  // Tailwind classes for masonry item (break-inside-avoid is crucial)
  card.className = "relative mb-4 break-inside-avoid rounded-2xl overflow-hidden group cursor-zoom-in shadow-md hover:shadow-xl transition-all duration-300 bg-gray-200 animate-pulse";

  // Image Element
  const img = document.createElement("img");
  img.dataset.src = src;
  img.alt = alt;
  img.className = "w-full h-auto object-cover opacity-0 transition-opacity duration-500 transform group-hover:scale-110 duration-700 ease-in-out";
  
  // Overlay (Pinterest style)
  const overlay = document.createElement("div");
  overlay.className = "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4";
  
  const text = document.createElement("p");
  text.className = "text-white text-sm font-handwriting font-bold tracking-wide truncate w-full";
  text.innerText = alt.length > 50 ? alt.substring(0, 50) + "..." : alt;
  
  overlay.appendChild(text);
  card.appendChild(img);
  card.appendChild(overlay);

  // Event Listener for Modal
  card.addEventListener("click", () => openModal(src, alt));

  gallery.appendChild(card);
  observer.observe(img);
});

// --- Modal Logic ---

function openModal(src, text) {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("no-scroll"); // Prevent background scrolling
  
  // Small timeout to allow display:flex to apply before transition
  setTimeout(() => {
    modalBackdrop.classList.remove("opacity-0");
    modalImg.src = src;
    caption.innerText = text;
    
    // Image pop-in effect
    modalImg.classList.remove("scale-95", "opacity-0");
    modalImg.classList.add("scale-100", "opacity-100");
  }, 10);
}

function closeModal() {
  modalBackdrop.classList.add("opacity-0");
  modalImg.classList.remove("scale-100", "opacity-100");
  modalImg.classList.add("scale-95", "opacity-0");
  
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("no-scroll");
    modalImg.src = ""; // Clear src to stop video/heavy load if needed
  }, 300); // Wait for transition
}

// Close events
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});