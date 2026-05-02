import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kuboyako.app',
  appName: 'KUBOYAKO',
  webDir: 'dist',
  server: {
    url: 'https://www.kuboyako.com',
    cleartext: true
  }
};

export default config;
