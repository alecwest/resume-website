import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ClarityModule } from "@clr/angular";
import { Observable, Subject, filter, map, takeUntil } from "rxjs";
import { ResumeEntry } from "../api/v1";
import { AuthenticatorService } from "../authenticator.service";
import { ResumeEntriesByType } from "../models";
import { ResumeDataService } from "../resume-data.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, ClarityModule, RouterModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  entriesByType$: Observable<ResumeEntriesByType> = this.resumeDataService
    .getEntriesByType("alecwest")
    .pipe(takeUntil(this.destroy$));

  bio: Observable<ResumeEntry> = this.entriesByType$.pipe(
    filter((entries) => entries.bio.length > 0),
    map((entries) => entries.bio[0]),
  );

  name: Observable<string> = this.bio.pipe(map((bioEntry) => bioEntry.title));

  get user() {
    return this.authenticator.user;
  }

  constructor(
    private resumeDataService: ResumeDataService,
    private authenticator: AuthenticatorService,
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
