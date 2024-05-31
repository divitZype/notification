To effectively debug your React Native application, follow these steps to integrate and use React Native Debugger:

## 1. Download React Native Debugger

- Visit the [React Native Debugger releases page](https://github.com/jhen0409/react-native-debugger/releases).
- Download the appropriate version of the debugger based on your operating system (Windows, macOS, or Linux).

## 2. Install and Open React Native Debugger

- After downloading, install React Native Debugger by following the installation instructions specific to your operating system.
- Open React Native Debugger once the installation is complete.

## 3. Set Up Your React Native App

- Ensure your React Native application is running either on a physical device or an emulator.

## 4. Set Up ADB Reverse (for Android)

- Open your terminal and run the following command to set up port forwarding between your device/emulator and your development machine:

  ```sh
  adb reverse tcp:8081 tcp:8081
  ```

- This command ensures that your app can communicate with the development server.

## 5. Open Debugging Options Modal

- For a physical device, shake the device.
- For an Android emulator on macOS, press `cmd + m`.
- For an iOS simulator on macOS, press `cmd + d`.
- For an Android emulator on Windows or Linux, press `ctrl + m`.

  This action will open the debugging options modal.

## 6. Enable Remote Debugging

- In the debugging options modal, select **Debug JS Remotely**.
- This will open a new tab in your default browser (debugger-ui). Close this tab.
- Manually open React Native Debugger to connect it with your application.

## 7. Verify the Connection

- In React Native Debugger, you should see the logs and debugging interface for your application, indicating that the connection is successful.

## 8. Check API Requests

- Right-click on the left part of the screen and click **Enable Network Inspect**.

## 9. Adding Breakpoints

- Navigate to the **Sources** section in React Native Debugger.
- Click on **Add Workspace**. This is a one-time setup process.
- Select your project folder and add it to the workspace.

## Summary

By following these steps, you can seamlessly integrate React Native Debugger with your React Native application, providing a powerful toolset for debugging and improving your development workflow.
