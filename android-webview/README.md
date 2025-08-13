# Android WebView App

This is a minimal [Expo](https://expo.dev/) project that wraps the existing web application in a WebView so it can be distributed as an Android APK.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

## Building an APK

To create a production APK, install the Expo Application Services (EAS) CLI and run:

```bash
npx expo build:android --type apk
```

Replace the URL in `App.js` with the deployed address of the web application before building.
