// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAVceMJoW6Zku3A4o8ycU6GZo0mt5MTtIw",
  authDomain: "kavach-23-a3959.firebaseapp.com",
  projectId: "kavach-23-a3959",
  storageBucket: "kavach-23-a3959.appspot.com",
  messagingSenderId: "536105131175",
  appId: "1:536105131175:web:a83fb42f3238ecf1f44f82",
  measurementId: "G-LTB6J7P3BC"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});