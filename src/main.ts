import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

// Load cds icons https://core.clarity.design/foundation/icons/
import {
  ClarityIcons,
  flameIcon,
  loginIcon,
  pencilIcon,
  banIcon,
  pdfFileIcon,
} from "@cds/core/icon";
ClarityIcons.addIcons(flameIcon, loginIcon, pencilIcon, banIcon, pdfFileIcon);

// Load AWS Amplify
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

// Attempted workaround for dev vs production redirects: https://github.com/aws-amplify/amplify-cli/issues/2792#issuecomment-573445998
const redirectSignInOptions = awsconfig.oauth.redirectSignIn.split(",");
const redirect = environment.production
  ? redirectSignInOptions.find((s) => s.includes("alecnwest"))
  : redirectSignInOptions.find((s) => s.includes("localhost"));
awsconfig.oauth.redirectSignIn = redirect;
awsconfig.oauth.redirectSignOut = redirect;

// Load AWS Amplify
Amplify.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
