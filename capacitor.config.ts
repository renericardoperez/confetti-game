import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.2rhop.confettiGame',
  appName: 'mobile-app-poc',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
