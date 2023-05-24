importScripts(
  "https://www.gstatic.com/firebasejs/9.8.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.8.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDEAP3KhLJFZ4Ue6PciWjDCs6sXG_QGSnw",
  authDomain: "prodct-faf35.firebaseapp.com",
  databaseURL: "https://prodct-faf35-default-rtdb.firebaseio.com",
  projectId: "prodct-faf35",
  storageBucket: "prodct-faf35.appspot.com",
  messagingSenderId: "370783154226",
  appId: "1:370783154226:web:d847c19c5bffbe920c4c2b",
  measurementId: "G-8TVED2HCNV",
});

const initMessaging = firebase.messaging();

// initMessaging.onBackgroundMessage(function (payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   return self.registration.showNotification(notificationTitle, notificationOptions);
// });
