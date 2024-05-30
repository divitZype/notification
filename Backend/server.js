//4/0AdLIrYddifbQdlw1c4nFZgFJvj-KItKRVYvu9Wx5yKIqCTkczDEX0KB_ybszqbLaML1T7g

//access token : ya29.a0AXooCgv6nEV0lBTyl-Wp_-Pk_Qcqb0n3cTvDR9Jrav0NYWK9C_s9kIeAHEwPm4FP8P6hDwcXVOqOw3H3AlpFKjDXf2WSeKrfLoSjFSntTgMALzALAKI0NODaH_gEzRYi2mLw3dX5GcXu189tGUuU5TUYIACDNj0xpaRCaCgYKAZASARASFQHGX2MiGjoUCfsLv62xRcbgwNiCOg0171
// refresh acces token : 1//04EkVM7cgziWBCgYIARAAGAQSNwF-L9IrQEtDHqQo-SiIEBgXy9WNHPqS0cEtqrBQ9Vt3y8rGTatr66hKHHgf4QQjiBE5AAbhal0

import http from "http";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import path from "path";
import { fileURLToPath } from "url";

const firebaseApp = initializeApp({
  credential: admin.credential.cert("service-file.json"),
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
  console.log("p0");
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("p1");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, appatestKey,content-type"
  );
  console.log("p2");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  if (req.method === "GET" && req.url === "/") {
    const message = {
      data: {},
      notification: {
        title: "Basic Notification",
        body: "This is a basic notification sent from the server!",
        image:
          "https://www.kasandbox.org/programming-images/avatars/leaf-blue.png",
      },
      android: {
        priority: "high",
        notification: {
          channel_id: "channel_id_foreground",
        },
      },
      token:
        "c7Li585ERyiCd4UWcQoW-b:APA91bHoPVER2tZdFzwvBvfNIzV09wv-eAC0s24Nex5pM6lfoDXsgBQWEbDcYbIX5x2Y_1fia7JUpiqDC9hQtv0TlYhioM4WGcD66LSbKb9C9Fn3FZBqi6fW6OsBBA0vIb3ErjzE8Qwx",
    };
    res.statusCode = 200;
    getMessaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
    res.end("Hello World\n");
  } else {
    res.statusCode = 404;
    res.end("Not Found\n");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
