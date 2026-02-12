importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDbpEd505ulnzXF6mAJBdmn9QxLUILJ7CI",
  authDomain: "ariadishut-9ce02.firebaseapp.com",
  projectId: "ariadishut-9ce02",
  messagingSenderId: "8919216472",
  appId: "1:8919216472:web:f6790f6483a96d3e9fb52d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon-192.png"
  });
});
