import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDEAP3KhLJFZ4Ue6PciWjDCs6sXG_QGSnw",
  authDomain: "prodct-faf35.firebaseapp.com",
  databaseURL: "https://prodct-faf35-default-rtdb.firebaseio.com",
  projectId: "prodct-faf35",
  storageBucket: "prodct-faf35.appspot.com",
  messagingSenderId: "370783154226",
  appId: "1:370783154226:web:d847c19c5bffbe920c4c2b",
  measurementId: "G-8TVED2HCNV",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

const getFirebaseToken = async () => {
  try {
    const res = await getToken(messaging, {
      vapidKey:
        "BHuu8-7DleniWF2lsTufyVBaysqECcNoiTfgNzyS_CkwhQyT24OlGEBU5qNB3P70g0C4xrmxyYX5zwdjFAUNbUg",
    });
    return res;
  } catch (e) {
    console.log(e);
    return "";
  }
};

export { firebaseApp, getFirebaseToken, onMessageListener };
