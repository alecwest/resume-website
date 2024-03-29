import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from "@aws-amplify/ui-angular";
import { ClarityModule } from "@clr/angular";
import { HeaderComponent } from "../header/header.component";

@Component({
  standalone: true,
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [
    AmplifyAuthenticatorModule,
    RouterModule,
    HeaderComponent,
    ClarityModule,
  ],
})
export class LoginComponent implements OnInit {
  private redirectPath: string;

  constructor(
    private authenticator: AuthenticatorService,
    private router: Router,
  ) {
    this.redirectPath =
      this.router
        .getCurrentNavigation()
        .previousNavigation?.finalUrl.toString() || "";
  }

  ngOnInit(): void {
    this.authenticator.subscribe((callback) => {
      if (callback.authStatus === "authenticated") {
        this.router.navigateByUrl(this.redirectPath);
      }
    });
  }
}
