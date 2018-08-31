
import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCfbal29QEhe6gq48uk6G1CqsjtQ7FIuMM",
    authDomain: "pivo-659e3.firebaseapp.com",
    databaseURL: "https://pivo-659e3.firebaseio.com",
    projectId: "pivo-659e3",
    storageBucket: "pivo-659e3.appspot.com",
    messagingSenderId: "821716729847"
};
firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDataBase = firebase.database();
export default firebase;