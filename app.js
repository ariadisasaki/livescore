import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getMessaging, getToken } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbpEd505ulnzXF6mAJBdmn9QxLUILJ7CI",
  authDomain: "ariadishut-9ce02.firebaseapp.com",
  projectId: "ariadishut-9ce02",
  storageBucket: "ariadishut-9ce02.firebasestorage.app",
  messagingSenderId: "8919216472",
  appId: "1:8919216472:web:f6790f6483a96d3e9fb52d"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js');
  navigator.serviceWorker.register('/sw.js');
}

document.getElementById("enableNotif").onclick = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "BH6HIwupiJGxDW99LqZI5vVFKn-HE3kAaQZm35Ae00TtCUilbKYYDw36MPJz7B62e2Otmn2WSi1V_a8LrZIsJiA"
    });
    alert("Notifikasi aktif!");
    console.log(token);
  }
};

async function loadMatches() {

const res = await fetch("https://livescore.ariadishut.workers.dev/");
const data = await res.json();

const container = document.getElementById("matches");
container.innerHTML = "";

data.response.forEach(match => {

const live = match.fixture.status.short === "1H" ||
             match.fixture.status.short === "2H";

container.innerHTML += `
<div class="match">
<div>
${live ? '<span class="live">LIVE</span>' : ''}
${match.teams.home.name} vs ${match.teams.away.name}
</div>
<div>
${match.goals.home ?? 0} - ${match.goals.away ?? 0}
</div>
</div>
`;
});
}

loadMatches();
setInterval(loadMatches, 30000);
