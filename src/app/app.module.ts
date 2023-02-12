import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { provideHttpClient } from "@angular/common/http";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApiModule, Configuration } from "./api/v1";
import { CdsModule } from "@cds/angular";
import { AmplifyAuthenticatorModule } from "@aws-amplify/ui-angular";
import { LoginComponent } from "./login/login.component";
import { EditComponent } from "./edit/edit.component";
import { ProfileComponent } from "./profile/profile.component";

import { environment } from "../environments/environment";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ApiModule.forRoot(
      () =>
        new Configuration({
          credentials: { api_key: environment?.apiGateway?.apiKey },
        })
    ),
    CdsModule,
    AmplifyAuthenticatorModule,
    LoginComponent,
    EditComponent,
    ProfileComponent,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
