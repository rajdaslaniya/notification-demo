import { useEffect, useState } from "react";
import { Button, Toast } from "react-bootstrap";
import EditorSection from "./EditorSection";
import { getFirebaseToken, onMessageListener } from "./firebase/config";
import PDFWithQRCode from "./PDFWithQRCode";

const App = () => {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    if (token) return;
    (async () => {
      try {
        const res = await getFirebaseToken();
        console.log(res);
        setToken(res);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token]);

  onMessageListener()
    .then((data) => {
      setShow(true);
      setNotification({
        title: data?.notification?.title,
        body: data?.notification?.body,
      });
      console.log(data);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="container">
      {token && "Notification permission enabled 👍🏻"}
      {!token && "Need notification permission ❗️ "}
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        animation
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">{notification?.title}</strong>
        </Toast.Header>
        <Toast.Body className="text-start">{notification?.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
      </header>
      <br />
      <EditorSection />
      <br />
      <PDFWithQRCode />
    </div>
  );
};

export default App;
