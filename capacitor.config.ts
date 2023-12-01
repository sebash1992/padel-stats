import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'padel.stats',
  appName: 'padleStats',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
