# notification
## need to do a POC on migrating from  firebase legacy to HTTP v1

# Frontend Flow
You will need to create firebase project and add ios and android apps to it 

set up fire base in your react native project 

```bash
npm i @react-native-firebase/app
npm i @react-native-firebase/messaging
```

### after install install it in ios using command pod install

add google-services.json in build/app of android in react native
similarly add GoogleService-info.plist in xcode under main project

add 
```classpath 'com.google.gms:google-services:4.4.1'  ```
in depency list in android/build.gradle
add 
```apply plugin: 'com.google.gms.google-services'``` 
in android/app/build.gradle

add below lines in AppDelegate.mm
``` bash
#import "AppDelegate.h"
#import <Firebase.h> // Add this line
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"FirebaseNotification";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  [FIRApp configure]; // Add this line
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
```

### In App.tsx generate a fcm token for the device

``` bash 
import messaging from '@react-native-firebase/messaging';
 const fcmToken = await messaging().getToken();
  //store this token in your device an also send it to backend via an API


// for android ask user for permission in App.tsx
 import {PermissionsAndroid} from 'react-native';
 PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

//for ios ask user for permission in App.tsx
const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

```
# Backend Flow

```bash
npm i firebase

npm i firebase-admin
```


## create a service-file.json from project setting in firebase and paste it in your backend server

#### initialize firebase in backend

```bash
import { initializeApp } from "firebase-admin/app";
const firebaseApp = initializeApp({
  credential: admin.credential.cert("service-file.json"),
});


// sending a notification from backend 

import { getMessaging } from "firebase-admin/messaging";
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
        "cpdYnpKeTWSDDtZRjASu-U:APA91bFJIPPFK5sp1CVX-hoCfXNYIKUfq4ajRdGD-J3ZGvP6ujkHb-w75tI8JE0g0R-o0vT2qf6uG1wO36ROAS4K1xj8eCgajB3we7VpSmWi30duXVhusfs_1oxeTfr6zeUNV5YzoNVP",
    };

   getMessaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
```
#### Now as per the document given by firebase the latest version of firebase-admin (Firebase Admin SDK) uses HTTP v1 (https://firebase.google.com/docs/cloud-messaging/migrate-v1)
#### It also refreshed the bearer token automaticlly once it is expired

## below is the curl if you want to send notification using a API 

```bash
curl --location 'https://fcm.googleapis.com/v1/projects/my-zype/messages:send' \
--header 'Authorization: Bearer your-google-account-token' \
--header 'Content-Type: application/json' \
--data '{
"message":{
   "data":{},
   "notification": {
    "title": "Basic Notification",
    "body": "This is a basic notification sent from the server!",
    "image":"https://www.kasandbox.org/programming-images/avatars/leaf-blue.png"
    
  },
   "android": {
        "priority": "high",
        "notification": {
          "channel_id": "channel_id_foreground"
        }
      },
   "token":"c7Li585ERyiCd4UWcQoW-b:APA91bHoPVER2tZdFzwvBvfNIzV09wv-eAC0s24Nex5pM6lfoDXsgBQWEbDcYbIX5x2Y_1fia7JUpiqDC9hQtv0TlYhioM4WGcD66LSbKb9C9Fn3FZBqi6fW6OsBBA0vIb3ErjzE8Qwx"
}}'
```

### You need to generate your bearer token from here using google account 

## Steps to get Authentication Bearer:

Got to Google OAuth Playground: https://developers.google.com/oauthplayground
In the "Input your own scopes" for FCM use this url: https://www.googleapis.com/auth/firebase.messaging
Tap Authorize API.
Pick correct user for authorisation and allow access.
In the Step 2: Exchange authorization code for tokens tap Exchange authorisation code for tokens.
Access token is your Bearer.

