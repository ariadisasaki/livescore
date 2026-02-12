const API_URL = "https://livescore.ariadishut.workers.dev";

const matchesContainer = document.getElementById("matches");
const loading = document.getElementById("loading");
const filterSelect = document.getElementById("leagueFilter");
const themeToggle = document.getElementById("themeToggle");

// 🌙 Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// 🔄 Load Matches
async function loadMatches() {
  const league = filterSelect.value;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    loading.style.display = "none";
    matchesContainer.innerHTML = "";

    let matches = data.response;

    // Filter Liga 1 Indonesia
    if (league !== "all") {
      matches = matches.filter(m => m.league.id == league);
    }

    if (!matches || matches.length === 0) {
      matchesContainer.innerHTML = "<p>Tidak ada pertandingan.</p>";
      return;
    }

    matches.forEach(match => {
      const isLive = match.fixture.status.short === "1H" ||
                     match.fixture.status.short === "2H" ||
                     match.fixture.status.short === "LIVE";

      const el = document.createElement("div");
      el.className = "match";

      el.innerHTML = `
        <div class="league">
          <img src="${match.league.flag || match.league.logo}" width="18">
          ${match.league.name}
          ${isLive ? '<span class="live"> LIVE</span>' : ''}
        </div>

        <div class="teams">
          <div class="team">
            <img src="${match.teams.home.logo}" width="22">
            ${match.teams.home.name}
          </div>

          <div class="score">
            ${match.goals.home} - ${match.goals.away}
          </div>

          <div class="team" style="justify-content: flex-end;">
            ${match.teams.away.name}
            <img src="${match.teams.away.logo}" width="22">
          </div>
        </div>

        <div style="font-size:12px; text-align:center; margin-top:6px;">
          ${match.fixture.status.elapsed || 0}' 
        </div>
      `;

      matchesContainer.appendChild(el);
    });

  } catch (err) {
    loading.innerHTML = "Gagal memuat data";
    console.error(err);
  }
}

filterSelect.addEventListener("change", loadMatches);

loadMatches();
setInterval(loadMatches, 60000);
