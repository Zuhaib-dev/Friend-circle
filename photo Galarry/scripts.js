// Array of gallery images
const images = [
  // Yousmarg photos 2025
  {
    src: "main photo.jpg",
    alt: "whisper the mountains whisper peace and the meadows speak magic – Yousmarg.",
  },
  {
    src: "wazwan party (2).jpg",
    alt: "Where the mountains whisper peace and the meadows speak magic – Yousmarg.",
  },
  { src: "wazwan party (3).jpg", alt: "This view = therapy for free." },
  {
    src: "wazwan party (5).jpg",
    alt: "Every step here feels like a scene from a dream.",
  },
  {
    src: "wazwan party (1).jpg",
    alt: "Every step here feels like a scene from a dream.",
  },
  // solo pics of the above one
  {
    src: "yous (1).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  {
    src: "yous (2).jpg",
    alt: "Learning to enjoy my own company, one solo trip at a time.",
  },
  {
    src: "yous (3).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  { src: "yous (4).jpg", alt: "Confidence looks better in natural light." },
  {
    src: "yous (5).jpg",
    alt: "Shoulder seat: reserved for the queen only(Luna)🐱",
  },
  { src: "yous (6).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (7).jpg", alt: "One man. Infinite journeys." },
  {
    src: "yous (8).jpg",
    alt: "Every scar, every smile – this is my story in one frame.",
  },
  {
    src: "yous (9).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  {
    src: "yous (10).jpg",
    alt: "Learning to enjoy my own company, one solo trip at a time.",
  },
  { src: "yous (11).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (12).jpg", alt: "Confidence looks better in natural light." },
  {
    src: "yous (13).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  {
    src: "yous (14).jpg",
    alt: "Every scar, every smile – this is my story in one frame.",
  },
  {
    src: "yous (15).jpg",
    alt: "Learning to enjoy my own company, one solo trip at a time.",
  },
  {
    src: "yous (16).jpg",
    alt: "Learning to enjoy my own company, one solo trip at a time.",
  },
  {
    src: "yous (17).jpg",
    alt: "Sometimes the best company is your own reflection.",
  },
  {
    src: "yous (18).jpg",
    alt: "Learning to enjoy my own company, one solo trip at a time.",
  },
  {
    src: "yous (19).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  { src: "yous (20).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (21).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (22).jpg", alt: "Confidence looks better in natural light" },
  { src: "yous (23).jpg", alt: "Confidence looks better in natural light." },
  { src: "yous (24).jpg", alt: "Confidence looks better in natural light" },
  {
    src: "yous (25).jpg",
    alt: "Every scar, every smile – this is my story in one frame.1",
  },
  {
    src: "yous (26).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  {
    src: "yous (27).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  {
    src: "yous (28).jpg",
    alt: "Every scar, every smile – this is my story in one frame.",
  },
  { src: "yous (29).jpg", alt: "One man. Infinite journeys." },
  {
    src: "yous (30).jpg",
    alt: "Just me, the moment, and the mountain breeze.",
  },
  {
    src: "yous (31).jpg",
    alt: "Learning to enjoy my own company, one solo trip at a time.",
  },
  // July 2025 new Images
  {
    src: "astanmarg.jpg",
    alt: "Breathtaking views from Astanmarg 🌄✨ – where the sky kisses the mountains and peace embraces your soul.",
  },
  {
    src: "badipoora party.jpg",
    alt: "Breathtaking views from Astanmarg 🌄✨ – where the sky kisses the mountains and peace embraces your soul.",
  },
  {
    src: "badipoora party (1).jpg",
    alt: "Breathtaking views from Astanmarg 🌄✨ – where the sky kisses the mountains and peace embraces your soul.",
  },
  {
    src: "badipoora party (2).jpg",
    alt: "Breathtaking views from Astanmarg 🌄✨ – where the sky kisses the mountains and peace embraces your soul.",
  },
  {
    src: "badipoora party (3).jpg",
    alt: "Breathtaking views from Astanmarg 🌄✨ – where the sky kisses the mountains and peace embraces your soul.",
  },
  {
    src: "may2024 (1).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (2).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (3).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (4).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (5).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (6).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (7).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (8).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },
  {
    src: "may2024 (9).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured.🌄✨",
  },
  {
    src: "may2024 (10).jpg",
    alt: "Grace isn’t just in the pose, it’s in the presence. Timeless moments, effortlessly captured. 🌄✨",
  },

  { src: "photo.jpg", alt: "Group photo in Machikhanen Haijen " },
  { src: "photo1.jpg", alt: "Group photo in Machikhanen Haijen" },
  {
    src: "Tehseen akbar/new.jpg ",
    alt: "Photo  taken by Tehseen, showcasing the scenic beauty of the region",
  },
  {
    src: "Tehseen akbar/new1.jpg",
    alt: "Photo of Gulmarg, taken by Tehseen, showcasing the scenic beauty of the region",
  },
  {
    src: "Tehseen akbar/new2.jpg",
    alt: "Photo of Doodhpathri, taken by Tehseen, showcasing the scenic beauty of the region",
  },
  // Ramazan party photos
  { src: "wazwan party (6).jpg", alt: "Ramadan 2025 pics🤞" },
  { src: "wazwan party (4).jpg", alt: "Ramadan 2025 pics🤞" },

  { src: "Tehseen akbar/new3.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new4.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new17.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new7.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new8.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new18.jpg", alt: "Photo of tehseen Bin Akbar" },
  { src: "Tehseen akbar/new22.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new33.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new34.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new36.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new39.jpg", alt: "Photo taken by tehseen Bin Akbar" },

  {
    src: "photo3.jpg",
    alt: "photo of Sahil and Sameem taken by Zuhaib at Dharkhal Haijen",
  },
  {
    src: "photo4.jpg",
    alt: "photo of Sahil and Sameem taken by ZUhaib at Mandikhal Haijen",
  },
  { src: "photo5.jpg", alt: "photo of Sameem" },
  // { src: "photo6.jpg", alt: "Group photo at Dharkhal" },
  { src: "photo7.jpg", alt: "Group photo at Dharkhal" },
  { src: "photo8.jpg", alt: "photo of Aqib taken and edited by Zuhaib" },
  { src: "Aqib.jpg", alt: "photo of Aqib taken by Zuhaib" },
  { src: "muba.jpg", alt: "photo of Mubashir " },
  { src: "muba1.jpg", alt: "photo of Mubashir " },
  { src: "muba2.jpg", alt: "photo of Mubashir " },
  { src: "photo9.jpg", alt: "photo of Faisal taken by Zuahib" },
  { src: "photo10.jpg", alt: "photo of myself taken by Aqib at Dharkhal" },
  { src: "photo10.2.jpg", alt: "photo of myself taken by Aqib at Dharkhal" },
  { src: "photo11.jpg", alt: "photo of Sahil taken by Aqib " },
  {
    src: "photo13.jpg",
    alt: "Group photo at Badipoora Widder while eatting chicken",
  },
  { src: "photo14.jpg", alt: "Photo of Musaib at Machikhanen" },
  { src: "photo15.jpg", alt: "photo of Tatakoti MT taken By Mursalien" },
  { src: "photo16.jpg", alt: "photo taken by Aqib at Yousmarg" },
  { src: "Tehseen akbar/new6.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new11.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new12.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new16.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new20.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new26.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new31.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new32.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new37.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new38.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new40.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new44.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new45.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new46.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new47.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new50.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new51.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new52.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new53.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new54.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new59.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new60.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new65.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new66.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new67.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new68.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new70.jpg", alt: "Photo taken by tehseen Bin Akbar" },
  { src: "Tehseen akbar/new79.jpg", alt: "Photo of Sahil Javeed" },
  { src: "photo30.jpg", alt: "Photo of Zubair at Mandikhal Haijen" },
  { src: "zubair.jpg", alt: "Photo of Zubair " },
  { src: "zubair1.jpg", alt: "Photo of Zubair " },
  { src: "Tehseen akbar/new69.jpg", alt: "Photo of tehseen" },
  { src: "Tehseen akbar/new72.jpg", alt: "Photo of Shahid Khan" },
  { src: "Tehseen akbar/new77.jpg", alt: "Photo of Shahid Khan" },
  { src: "janna (1).jpg", alt: "Photo of Tehseen Bin Akbar" },
  { src: "janna (2).jpg", alt: "Photo of Tehseen Bin Akbar" },
  { src: "janna (3).jpg", alt: "Photo of Tehseen Bin Akbar" },
  { src: "janna (4).jpg", alt: "Photo of Tehseen Bin Akbar" },
  { src: "janna (5).jpg", alt: "Photo of Tehseen Bin Akbar" },
  {
    src: "mavin.jpg",
    alt: "Mavin enjoying the adventure with Friend Circle, spreading positivity and energy",
  },

  {
    src: "photo18.jpg",
    alt: "photo of chicken cooked at the Mandikhal Haijen",
  },
  {
    src: "photo19.jpg",
    alt: "photo of chicken cooked at the Mandikhal Haijen",
  },
  {
    src: "photo20.jpg",
    alt: "photo of chicken cooked at the Mandikhal Haijen",
  },
  {
    src: "photo21.jpg",
    alt: "photo of chicken cooked at the Mandikhal Haijen",
  },
  {
    src: "photo22.jpg",
    alt: "photo of chicken cooked at the Mandikhal Haijen",
  },
  {
    src: "photo23.jpg",
    alt: "photo of chicken cooked in the Badipoora Widder",
  },
  {
    src: "photo24.jpg",
    alt: "photo of chicken cooked in the Badipoora Widder",
  },
  { src: "photo25.jpg", alt: "photo of Dharkhal" },
  { src: "photo26.jpg", alt: "photo of Nilnag Lake taken by Aqib" },
  { src: "photo27.jpg", alt: "photo of Nilnag Lake taken by Aqib" },
  { src: "photo28.jpg", alt: "photo of Nilnag Lake taken by Aqib" },
  {
    src: "photo29.jpg",
    alt: "photo of chicken cooked in the Badipoora Widder",
  },
  {
    src: "edit1 (1).jpg",
    alt: "photo of Machikhanen taken and edited by Zuhaib",
  },
  { src: "edit1 (2).jpg", alt: "Image 13 description" },
  // { src: "haijen4.jpg", alt: "Image 13 description" },
  { src: "edit1 (4).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (3).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (5).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (6).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (7).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (8).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (9).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (10).jpg", alt: "photo taken by Zuhaib at Haijen " },
  { src: "edit1 (11).jpg", alt: "photo taken by Zuhaib" },
  { src: "edit1 (12).jpg", alt: "photo taken by Zuhaib" },
  { src: "edit1 (13).jpg", alt: "photo taken by Zuhaib" },
  // { src: "haijen17.jpg", alt: "Image 13 description" },
  { src: "umar.enc", alt: "Photo of Umer Ayoub " },
  { src: "Haseeb.webp", alt: "Photo of Haseeb" },

  { src: "Haziq.webp", alt: "photo of Haziq" },
  { src: "Haziq1.jpg", alt: "photo of Haziq" },
  { src: "Bilmam.jpg", alt: "photo of Bilal Bhat" },
  { src: "Bilmam2.jpg", alt: "photo of Bilal Bhat" },
  { src: "Faisal.jpg", alt: "photo of Furqan" },
  { src: "Faisal1.jpg", alt: "photo of Furqan" },
  { src: "Faisal2.jpg", alt: "photo of Furqan" },
  { src: "Faisal3.jpg", alt: "photo of Furqan" },
  { src: "Faisal4.jpg", alt: "photo of Furqan" },
  { src: "Faisal5.jpeg", alt: "photo of Furqan" },
  { src: "Naveed.webp", alt: "photo of Naveed" },
  { src: "Naveed1.webp", alt: "photo of Naveed" },
  { src: "Naveed2.webp", alt: "photo of Naveed" },
  { src: "tehseen (1).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (2).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (3).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (4).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (5).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (6).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (7).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (8).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (9).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (10).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (11).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (12).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (13).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "tehseen (14).jpg", alt: "photo taken by Tehseen Bin Akbar" },
  { src: "Sameem4.webp", alt: "photo of Sameem" },
  { src: "Sameem1.webp", alt: "photo of Sameem" },
  { src: "Sameem2.webp", alt: "photo of Sameem" },
  { src: "Sameem3.webp", alt: "photo of Sameem" },
  { src: "Farhan (1).jpg", alt: "photo of Farhan" },
  { src: "Farhan (2).jpg", alt: "photo of Farhan" },
  { src: "Farhan (3).jpg", alt: "photo of Farhan" },
  { src: "sahil (1).jpg", alt: "photo of Sahil Javid at Tosamaidan" },
  { src: "sahil (2).jpg", alt: "photo of Sahil Javid at Tosamaidan" },
  { src: "sahil (3).jpg", alt: "photo of Sahil Javid at Tosamaidan" },
  { src: "sahil (4).jpg", alt: "photo of Sahil Javid at Tosamaidan" },
  {
    src: "swim (1).jpg",
    alt: "Dive into a night swim adventure in the river! 🌌💦 Have a blast with friends, creating unforgettable memories under the stars. 🌟😄",
  },
  {
    src: "Group Photo📍.jpg",
    alt: "A timeless memory from 2016—our bond began here, filled with laughter, adventures, and unbreakable friendships that continue to grow. 💫🚀 #FriendshipGoals",
  },
  {
    src: "swim.jpeg",
    alt: "Amidst the crowd, our Friend Circle makes every splash count—bonding, laughing, and creating memories in the heart of the river. 🌊✨ #FriendshipGoals #RiverVibes",
  },
  {
    src: "amir shafi (1).jpeg",
    alt: "Amir Shafi: Trekking & volleyball enthusiast",
  },
  {
    src: "amir shafi (2).jpeg",
    alt: "Amir Shafi: Trekking & volleyball enthusiast",
  },
  {
    src: "amir shafi (3).jpeg",
    alt: "Amir Shafi: Trekking & volleyball enthusiast",
  },
  { src: "amir shafi (4).jpeg", alt: "Group adventure & memories." },
  { src: "amir shafi (5).jpeg", alt: "Group adventure & memories." },
  { src: "amir shafi (6).jpeg", alt: "Group adventure & memories." },
  { src: "amir shafi (7).jpeg", alt: "Group adventure & memories." },
  { src: "amir shafi (8).jpeg", alt: "Group adventure & memories." },
  {
    src: "amir shafi (9).jpeg",
    alt: "Amir Shafi: Trekking & volleyball enthusiast",
  },
  { src: "amir shafi (10).jpeg", alt: "Group adventure & memories." },
  { src: "mudasir.webp", alt: "Off-roading & photography lover." },
  { src: "mudasir2.webp", alt: "Off-roading & photography lover." },
  { src: "Mudasir Hameed.webp", alt: "Off-roading & photography lover." },
];

// DOM Elements
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const caption = document.getElementById("caption");
const closeBtn = document.getElementById("close");

// Lazy load images using IntersectionObserver
function lazyLoadImage(img) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        img.onload = () => img.classList.add("loaded");
        obs.unobserve(img);
      }
    });
  });
  observer.observe(img);
}

// Create gallery
images.forEach(({ src, alt }) => {
  const img = document.createElement("img");
  img.dataset.src = src;
  img.alt = alt;
  img.loading = "lazy";
  img.className = "gallery-img";

  // Click to open modal
  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = src;
    caption.innerText = alt;
  });

  gallery.appendChild(img);
  lazyLoadImage(img);
});

// Close modal
closeBtn.addEventListener("click", () => (modal.style.display = "none"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") modal.style.display = "none";
});

// Hide preloader
window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");
  loader.style.display = "none";
});
