import { Injectable } from "@angular/core";
import { AuthenticatorService as AwsAuthenticatorService } from "@aws-amplify/ui-angular";

/**
 * A wrapper around the AWS Authenticator Service to share frequently used checks against it.
 */
@Injectable({
  providedIn: "root",
})
export class AuthenticatorService {
  constructor(public authenticator: AwsAuthenticatorService) {}

  get authenticated(): boolean {
    return this.authenticator.authStatus === "authenticated";
  }

  get user() {
    return this.authenticator.user;
  }

  /**
   * Frontend validation for whether the current user can perform edits
   */
  get canEdit(): boolean {
    return (
      this.authenticated &&
      this.authenticator.user
        ?.getSignInUserSession()
        ?.getAccessToken()
        ?.payload["cognito:groups"]?.includes("entry/edit/any")
    );
  }
}
