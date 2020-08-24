import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1yh5rhjEVkPOF3vFRrc_q2mdUx3pJPi4",
  authDomain: "chat-9d7ad.firebaseapp.com",
  databaseURL: "https://chat-9d7ad.firebaseio.com",
  projectId: "chat-9d7ad",
  storageBucket: "chat-9d7ad.appspot.com",
  messagingSenderId: "525509828120",
  appId: "1:525509828120:web:3f06b1c09132b49d36ad6d",
  measurementId: "G-PTWT2QYY6H",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
