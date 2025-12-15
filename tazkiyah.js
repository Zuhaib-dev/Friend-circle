const arabicEl = document.getElementById("hadithArabic");
const englishEl = document.getElementById("hadithEnglish");
const sourceEl = document.getElementById("hadithSource");
const refreshBtn = document.getElementById("refreshHadith");

async function fetchHadith() {
  arabicEl.textContent = "Loading...";
  englishEl.textContent = "";
  sourceEl.textContent = "";

  try {
    const random = Math.floor(Math.random() * 300) + 1;
    const res = await fetch(
      `https://api.hadith.gading.dev/books/muslim?range=${random}-${random}`
    );
    const data = await res.json();

    const hadith = data.data.hadiths[0];

    arabicEl.textContent = hadith.arab;
    englishEl.textContent = hadith.id;
    sourceEl.textContent = `— Sahih Muslim | Hadith ${hadith.number}`;
  } catch (error) {
    arabicEl.textContent = "Failed to load hadith.";
    englishEl.textContent = "Please try again later.";
  }
}

refreshBtn.addEventListener("click", fetchHadith);

// Load on page start
fetchHadith();
