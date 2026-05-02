import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kuboyako.app',
  appName: 'KUBOYAKO',
  webDir: 'dist',
  server: {
    url: 'https://www.kuboyako.com',
    cleartext: true
  },
  android: {
    adjustMarginsForEdgeToEdge: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#02050A",
      showSpinner: true,
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
