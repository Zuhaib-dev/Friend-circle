document.addEventListener("DOMContentLoaded", () => {
  // 1. PRELOADER LOGIC
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    // Minimum wait time of 1 second for branding
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 700); // Wait for fade out
      }
    }, 800);
  });

  // 2. CONSOLE WELCOME MESSAGE
  console.log(
    "%c Friend Circle %c V2.0 Loaded ",
    "background:#f43f5e; color:white; font-weight:bold; padding: 4px; border-radius: 3px 0 0 3px;",
    "background:#064e3b; color:white; font-weight:bold; padding: 4px; border-radius: 0 3px 3px 0;"
  );
});
document.addEventListener("DOMContentLoaded", () => {
  // --- NAVIGATION LOGIC ---
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("close-drawer-btn");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const navContainer = document.getElementById("nav-container");

  // 1. Open Menu
  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      drawer.classList.remove("translate-x-full");
      overlay.classList.remove("hidden");
      // Small timeout to allow display:block to apply before opacity transition
      setTimeout(() => {
        overlay.classList.remove("opacity-0");
      }, 10);
    });
  }

  // 2. Close Menu (Function)
  function closeMenu() {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("opacity-0");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);

  // 3. Navbar Scroll Effect (Shrink & Glass intensifies)
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navContainer.classList.remove("py-3");
      navContainer.classList.add(
        "py-2",
        "bg-white/90",
        "shadow-emerald-900/10"
      );
      navContainer.classList.remove("bg-white/70");
    } else {
      navContainer.classList.add("py-3", "bg-white/70");
      navContainer.classList.remove(
        "py-2",
        "bg-white/90",
        "shadow-emerald-900/10"
      );
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. PRELOADER & WELCOME ---
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 700);
      }
    }, 800);
  });

  console.log(
    "%c Friend Circle %c V2.0 Loaded ",
    "background:#f43f5e; color:white; font-weight:bold; padding: 4px; border-radius: 3px 0 0 3px;",
    "background:#064e3b; color:white; font-weight:bold; padding: 4px; border-radius: 0 3px 3px 0;"
  );

  // --- 2. NAVIGATION LOGIC ---
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("close-drawer-btn");
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");
  const navContainer = document.getElementById("nav-container");

  if (mobileBtn) {
    mobileBtn.addEventListener("click", () => {
      drawer.classList.remove("translate-x-full");
      overlay.classList.remove("hidden");
      setTimeout(() => {
        overlay.classList.remove("opacity-0");
      }, 10);
    });
  }

  function closeMenu() {
    drawer.classList.add("translate-x-full");
    overlay.classList.add("opacity-0");
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (overlay) overlay.addEventListener("click", closeMenu);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navContainer.classList.remove("py-3", "bg-white/70");
      navContainer.classList.add(
        "py-2",
        "bg-white/90",
        "shadow-emerald-900/10"
      );
    } else {
      navContainer.classList.add("py-3", "bg-white/70");
      navContainer.classList.remove(
        "py-2",
        "bg-white/90",
        "shadow-emerald-900/10"
      );
    }
  });

  // --- 3. DYNAMIC TEAM RENDERER ---
  renderTeamGrid();
});
function renderTeamGrid() {
  const teamGrid = document.getElementById("team-grid");
  if (!teamGrid) return;

  const teamMembers = [
    {
      name: "Zuhaib Rashid",
      role: "Founder & Adventurer",
      desc: "Passionate about web development and adventure. Leads the crew with a love for exploring new places and exciting projects.",
      img: "profile picturs/xuhaib.gif.gif",
      color: "rose",
      instagram: "https://www.instagram.com/zoh.aib__/",
      portfolio: "http://zuhaibrashid.com/",
    },
    {
      name: "Aqib",
      role: "Offroad Specialist",
      desc: "Multi-talented with a knack for offroad biking, fishing, and cooking. An adventurous soul.",
      img: "profile picturs/aqib 1.jpg",
      color: "emerald",
      instagram: "https://www.instagram.com/itx_aqib_45",
    },
    {
      name: "Sahil Mushtaq",
      role: "Gamer & Athlete",
      desc: "Loves online games and volleyball. His energetic spirit makes him fun and engaging.",
      img: "profile picturs/Sahil mushtaq.jpg",
      color: "slate",
      instagram: "https://www.instagram.com/sahill_2032",
    },
    {
      name: "Furqan",
      role: "Sportsman",
      desc: "Excels in cricket and volleyball. His refined taste in food adds elegance to his personality.",
      img: "profile picturs/Furqan.jpg",
      color: "teal",
      instagram: "https://www.instagram.com/fasu20790",
    },
    {
      name: "Tehseen Bin Akbar",
      role: "Filmmaker",
      desc: "Passionate about filmmaking, photography, traveling, and event management.",
      img: "profile picturs/tehseen.jpg",
      color: "purple",
      instagram: "https://www.instagram.com/tehseenbinakba",
    },
    {
      name: "Musaib",
      role: "Spiritual Guide",
      desc: "A respected Imam known for guiding the crew spiritually and leading prayers with dedication.",
      img: "profile picturs/musaib.jpg",
      color: "emerald",
      instagram: "https://www.instagram.com/musaebahmed",
    },
    {
      name: "Sahil Javeed",
      role: "Explorer",
      desc: "Known for his great sense of humor and love for adventures and fishing.",
      img: "profile picturs/sahil javeed.jpg",
      color: "cyan",
      instagram: "https://www.instagram.com/sahil.4024",
    },
    {
      name: "Zubair",
      role: "Explorer",
      desc: "Adventurous and curious. Loves exploring new places and has a kind nature.",
      img: "profile picturs/zubair.jpg",
      color: "blue",
      facebook: "https://www.facebook.com/profile.php?id=100052350402534",
    },
    {
      name: "Muhammed Mubashir",
      role: "Jungle Tracker",
      desc: "Adventure enthusiast who loves jungles, swimming, and tracking in nature.",
      img: "profile picturs/mubashir.jpg",
      color: "green",
      facebook: "https://www.facebook.com/profile.php?id=100023662695866",
    },
    {
      name: "Haziq",
      role: "Head Chef",
      desc: "Our chef during tours. Loves exploring, meeting new people, and cooking amazing meals.",
      img: "profile picturs/Haziq.webp",
      color: "orange",
      instagram: "https://www.instagram.com/hazik__lone",
    },
    {
      name: "Shahid Khan",
      role: "Cricket Enthusiast",
      desc: "Passionate about cricket and exploring new places.",
      img: "profile picturs/shahid khan.jpg",
      color: "red",
      instagram: "https://www.instagram.com/_shahid._khan_",
    },
    {
      name: "Naveed",
      role: "Motorhead",
      desc: "Loves cars, off-roading, and exploring new places.",
      img: "profile picturs/naveed.webp",
      color: "blue",
      instagram: "https://www.instagram.com/nav_jatt____",
    },
    {
      name: "Farhan",
      role: "Gamer & Athlete",
      desc: "Enjoys video games, volleyball, and adventure.",
      img: "profile picturs/farhan.jpg",
      color: "indigo",
      instagram: "https://www.instagram.com/farhan_fayaz_71",
    },
    {
      name: "Umer",
      role: "Future Cop",
      desc: "Loves wandering and cricket. Dreams of becoming a cop.",
      img: "profile picturs/umar.enc",
      color: "gray",
      facebook: "https://www.facebook.com/profile.php?id=100076668668005",
    },
    {
      name: "Sameem",
      role: "Sportsman",
      desc: "Talented in cricket and volleyball with a great sense of humor.",
      img: "profile picturs/sameem.jpg",
      color: "lime",
      instagram: "https://www.instagram.com/captain__s123",
    },
    {
      name: "Bilal Bhat",
      role: "Nature Lover",
      desc: "Well-skilled with a deep love for nature. Inspires the group with experience.",
      img: "profile picturs/Bilmam.jpg",
      color: "emerald",
      facebook:
        "https://media.tenor.com/WfZD9HMO5sIAAAAM/hum-pe-toh-hai-hi-nau-arpit-bala.gif",
    },
    {
      name: "Mudasir Hameed",
      role: "Photographer & Offroader",
      desc: "Enjoys photography, exploring new places, and off-roading adventures.",
      img: "profile picturs/Mudasir Hameed.webp",
      color: "amber",
      instagram: "https://www.instagram.com/_abubakar313_/",
    },
    {
      name: "Amir Shafi",
      role: "Trekker",
      desc: "Fun-loving team player passionate about trekking and volleyball.",
      img: "profile picturs/amir shafi (2).jpeg",
      color: "violet",
      instagram: "https://www.instagram.com/amir_writes2/",
    },
    {
      name: "Mir Mavin",
      role: "The Energy",
      desc: "Adventurous spirit bringing fresh energy and laughter to every journey.",
      img: "profile picturs/mavin.jpg",
      color: "yellow",
      instagram: "https://www.instagram.com/mir.mavin",
    },
  ];

  // --- COLOR MAP ---
  const colorMap = {
    rose: {
      text: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
      glow: "from-rose-400 to-pink-600",
      shadow: "hover:shadow-rose-900/10",
    },
    emerald: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      glow: "from-emerald-400 to-green-600",
      shadow: "hover:shadow-emerald-900/10",
    },
    purple: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      glow: "from-purple-400 to-indigo-600",
      shadow: "hover:shadow-purple-900/10",
    },
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      glow: "from-blue-400 to-cyan-600",
      shadow: "hover:shadow-blue-900/10",
    },
    orange: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
      glow: "from-orange-400 to-red-600",
      shadow: "hover:shadow-orange-900/10",
    },
    slate: {
      text: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-100",
      glow: "from-gray-400 to-slate-600",
      shadow: "hover:shadow-slate-900/10",
    },
    teal: {
      text: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-100",
      glow: "from-teal-400 to-emerald-600",
      shadow: "hover:shadow-teal-900/10",
    },
    yellow: {
      text: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-100",
      glow: "from-yellow-400 to-orange-500",
      shadow: "hover:shadow-yellow-900/10",
    },
  };

  // --- RENDER LOOP ---
  teamGrid.innerHTML = teamMembers
    .map((member, index) => {
      const c = colorMap[member.color] || colorMap["emerald"]; // Fallback color

      // Generate Social Buttons
      let socialHTML = "";

      // Instagram
      if (member.instagram) {
        socialHTML += `
                <a href="${member.instagram}" target="_blank" aria-label="Instagram"
                   class="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-purple-600 transition-all duration-300 shadow-sm hover:-translate-y-1">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>`;
      }

      // Portfolio
      if (member.portfolio) {
        socialHTML += `
                <a href="${member.portfolio}" target="_blank" aria-label="Portfolio"
                   class="w-10 h-10 rounded-full bg-white border border-stone-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-600 transition-all duration-300 shadow-sm hover:-translate-y-1">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                </a>`;
      }

      // Return Card HTML
      return `
        <div class="group relative bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-2xl ${
          c.shadow
        } transition-all duration-500 hover:-translate-y-2 border border-stone-100 hover:${
        c.border
      } overflow-hidden team-card-animate" style="animation-delay: ${
        index * 100
      }ms">
            
            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer-sweep z-20 pointer-events-none"></div>
            
            <div class="absolute -bottom-6 -right-6 text-${
              member.color
            }-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 transform rotate-12 scale-150 pointer-events-none">
                <svg class="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2C10.5,2.5 9,4 9,6C9,8 10.5,9.5 12,10C13.5,9.5 15,8 15,6C15,4 13.5,2.5 12,2M12,22C13.5,21.5 15,20 15,18C15,16 13.5,14.5 12,14C10.5,14.5 9,16 9,18C9,20 10.5,21.5 12,22M6,12C6.5,13.5 8,15 10,15C12,15 13.5,13.5 14,12C13.5,10.5 12,9 10,9C8,9 6.5,10.5 6,12M18,12C17.5,10.5 16,9 14,9C12,9 10.5,10.5 10,12C10.5,13.5 12,15 14,15C16,15 17.5,13.5 18,12Z"/></svg>
            </div>

            <div class="relative z-10 flex flex-col h-full">
                <div class="relative w-24 h-24 mx-auto mb-5">
                    <div class="absolute inset-0 rounded-full bg-gradient-to-tr ${
                      c.glow
                    } blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <img src="${member.img}" alt="${
        member.name
      }" class="relative w-full h-full rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500" loading="lazy">
                </div>

                <div class="text-center flex-1">
                    <h3 class="font-bold text-xl text-emerald-950 font-display mb-1 group-hover:${
                      c.text
                    } transition-colors">${member.name}</h3>
                    
                    <div class="inline-block px-3 py-1 ${
                      c.bg
                    } rounded-full border ${c.border} mb-4 mt-1">
                        <p class="text-[10px] font-bold ${
                          c.text
                        } uppercase tracking-widest">${member.role}</p>
                    </div>
                    
                    <p class="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                        ${member.desc}
                    </p>
                </div>

                <div class="flex justify-center gap-3 pt-5 border-t border-stone-50 mt-auto">
                    ${socialHTML}
                </div>
            </div>
        </div>
        `;
    })
    .join("");
}
// ==========================================
// SECTION 6: STATS COUNTER ANIMATION
// ==========================================
const statsSection = document.getElementById("stats");
const counters = document.querySelectorAll(".counter");
let started = false; // To ensure animation runs only once

function startCounting() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = 200; // Lower is slower

    const updateCount = () => {
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20); // Speed of refresh
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

if (statsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !started) {
        startCounting();
        started = true;
      }
    },
    { threshold: 0.5 }
  ); // Start when 50% of section is visible

  observer.observe(statsSection);
}
// ==========================================
// SECTION 7: PRAYER TIMES WIDGET
// ==========================================
const prayerGrid = document.getElementById("prayer-times-grid");
const hijriEl = document.getElementById("hijri-date");
const gregEl = document.getElementById("gregorian-date");
const nextTimerEl = document.getElementById("next-prayer-timer");

if (prayerGrid) {
  async function fetchPrayerTimes() {
    try {
      // Srinagar, India | Method 1 (Karachi) | School 1 (Hanafi)
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=Srinagar&country=India&method=1&school=1`
      );
      const data = await res.json();

      if (data.code === 200) {
        const timings = data.data.timings;
        const date = data.data.date;

        // 1. Update Dates
        hijriEl.textContent = `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year}`;
        gregEl.textContent = date.readable;

        // 2. Render Times
        const prayers = [
          { name: "Fajr", time: timings.Fajr, icon: "🌅" },
          { name: "Dhuhr", time: timings.Dhuhr, icon: "☀️" },
          { name: "Asr", time: timings.Asr, icon: "🌤️" },
          { name: "Maghrib", time: timings.Maghrib, icon: "🌇" },
          { name: "Isha", time: timings.Isha, icon: "🌙" },
        ];

        prayerGrid.innerHTML = prayers
          .map((p) => {
            // Simple 12h converter
            let [h, m] = p.time.split(":");
            let suffix = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
            let time12 = `${h}:${m} ${suffix}`;

            return `
                        <div class="flex justify-between items-center p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-emerald-100 group">
                            <div class="flex items-center gap-3">
                                <span class="text-xl group-hover:scale-110 transition-transform">${p.icon}</span>
                                <span class="font-bold text-emerald-900">${p.name}</span>
                            </div>
                            <span class="font-mono font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">${time12}</span>
                        </div>
                        `;
          })
          .join("");

        // 3. Logic for "Next Prayer"
        updateNextPrayer(timings);
      }
    } catch (e) {
      prayerGrid.innerHTML =
        '<p class="text-center text-rose-500">Failed to load prayer times.</p>';
    }
  }

  function updateNextPrayer(timings) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const prayerList = [
      { name: "Fajr", val: timeToMin(timings.Fajr) },
      { name: "Dhuhr", val: timeToMin(timings.Dhuhr) },
      { name: "Asr", val: timeToMin(timings.Asr) },
      { name: "Maghrib", val: timeToMin(timings.Maghrib) },
      { name: "Isha", val: timeToMin(timings.Isha) },
    ];

    let next = prayerList.find((p) => p.val > currentMinutes);
    if (!next) next = prayerList[0]; // Next day Fajr

    nextTimerEl.textContent = next.name;
  }

  function timeToMin(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  }

  fetchPrayerTimes();
}
// PWA Script
const CACHE_NAME = "friendcircle-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  // add other assets you want cached
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  // optional: cleanup old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cn) => {
          if (cn !== CACHE_NAME) {
            return caches.delete(cn);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
document.addEventListener("DOMContentLoaded", () => {
  const timelineSection = document.getElementById("journey-timeline");
  const progressLine = document.getElementById("timeline-progress");
  const timelineItems = document.querySelectorAll(".timeline-item");

  if (timelineSection && progressLine) {
    window.addEventListener("scroll", () => {
      const sectionTop = timelineSection.offsetTop;
      const sectionHeight = timelineSection.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 1. Handle Progress Line Height
      // Start filling when the section hits the middle of the screen
      const startPoint = sectionTop - windowHeight / 2;
      const endPoint = sectionTop + sectionHeight - windowHeight / 2;

      let percentage = (scrollY - startPoint) / (endPoint - startPoint);

      // Clamp between 0 and 1
      percentage = Math.max(0, Math.min(1, percentage));

      // Update height
      progressLine.style.height = `${percentage * 100}%`;

      // 2. Handle Item Activation (Fade in)
      timelineItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        // Trigger when item is in the bottom 20% of the viewport
        if (itemTop < windowHeight * 0.8) {
          item.classList.add("active");
        } else {
          // Optional: Remove class to make it fade out when scrolling back up
          // item.classList.remove("active");
        }
      });
    });
  }
});
