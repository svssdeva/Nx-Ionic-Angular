import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'app-two',
  webDir: '../../dist/apps/app-two',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
