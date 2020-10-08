import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBL3USq_TbUuyH_7auxEHLD3aE6POdGThw",
  authDomain: "crown-clothing-eaab6.firebaseapp.com",
  databaseURL: "https://crown-clothing-eaab6.firebaseio.com",
  projectId: "crown-clothing-eaab6",
  storageBucket: "crown-clothing-eaab6.appspot.com",
  messagingSenderId: "679771561372",
  appId: "1:679771561372:web:97379b1746df47e5697c59",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
