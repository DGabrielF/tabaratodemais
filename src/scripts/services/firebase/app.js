import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlIBip8jjskybK589D56n51yZWaOYMat8",
  authDomain: "projects-data-center.firebaseapp.com",
  projectId: "projects-data-center",
  storageBucket: "projects-data-center.firebasestorage.app",
  messagingSenderId: "427326358125",
  appId: "1:427326358125:web:9c59481a7725b7474ef564"
};

export const app = initializeApp(firebaseConfig);