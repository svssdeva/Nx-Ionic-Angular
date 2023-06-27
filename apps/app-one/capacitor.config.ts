import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'appOne',
  webDir: '../../dist/apps/app-one',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
