import { Component, OnDestroy } from "@angular/core";
import { ResumeEntriesByType } from "./models";
import { ResumeDataService } from "./resume-data.service";
import { ResumeEntry } from "./api/v1";
import { Observable, Subject } from "rxjs";
import { filter, map, takeUntil } from "rxjs/operators";
import { AuthenticatorService } from "./authenticator.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
  // TODO support loading again - maybe use https://medium.com/angular-in-depth/angular-show-loading-indicator-when-obs-async-is-not-yet-resolved-9d8e5497dd8
  loading = false;

  title = "website";

  destroy$: Subject<boolean> = new Subject<boolean>();

  entriesByType$: Observable<ResumeEntriesByType> = this.resumeDataService
    .getEntriesByType("alecwest")
    .pipe(takeUntil(this.destroy$));

  bio: Observable<ResumeEntry> = this.entriesByType$.pipe(
    filter((entries) => entries.bio.length > 0),
    map((entries) => entries.bio[0])
  );

  name: Observable<string> = this.bio.pipe(map((bioEntry) => bioEntry.title));

  get user() {
    return this.authenticator.user;
  }

  constructor(
    private resumeDataService: ResumeDataService,
    private authenticator: AuthenticatorService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  isAuthenticated(): boolean {
    return this.authenticator.authenticated;
  }

  onLogoutClick() {
    this.authenticator.authenticator.signOut();
  }
}
