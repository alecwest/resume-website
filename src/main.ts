import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Load cds icons https://core.clarity.design/foundation/icons/
import { ClarityIcons, flameIcon } from '@cds/core/icon';
ClarityIcons.addIcons(flameIcon);

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
