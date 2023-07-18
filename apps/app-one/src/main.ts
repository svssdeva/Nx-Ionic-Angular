import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment.development';
import {SharedConfigService as ConfigService} from '@deva/shared';
platformBrowserDynamic()
  .bootstrapModule(AppModule).then((appRef) => {
    const configService = appRef.injector.get(ConfigService);
    configService.setConfig(environment);
  }).catch((err) => console.error(err));
