import { CommonModule } from "@angular/common";
import { Component, HostBinding, OnDestroy } from "@angular/core";
import { CdsModule } from "@cds/angular";
import { ClarityModule } from "@clr/angular";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { ResumeEntry } from "../api/v1";
import { AuthenticatorService } from "../authenticator.service";
import { CardComponent } from "../card/card.component";
import { HeaderComponent } from "../header/header.component";
import { ResumeEntriesByType } from "../models";
import { NavComponent } from "../nav/nav.component";
import { NewEntryComponent } from "../new-entry/new-entry.component";
import { ResumeDataService } from "../resume-data.service";

@Component({
  standalone: true,
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  imports: [
    CdsModule,
    CommonModule,
    ClarityModule,
    CardComponent,
    NewEntryComponent,
    NavComponent,
    HeaderComponent,
  ],
})
export class ProfileComponent implements OnDestroy {
  @HostBinding("class") classes = "content-container";

  destroy$: Subject<boolean> = new Subject<boolean>();

  entriesByType$: Observable<ResumeEntriesByType> = this.resumeDataService
    .getEntriesByType("alecwest")
    .pipe(takeUntil(this.destroy$));

  entryTypes: Observable<ResumeEntry.TypeEnum[]> = this.entriesByType$.pipe(
    map(
      (entry) =>
        Object.keys(entry).sort((a, b) => {
          const order = { bio: -1 };
          return (order[a] || 0) - (order[b] || 0);
        }) as ResumeEntry.TypeEnum[],
    ),
  );

  get canEdit(): boolean {
    return this.authenticator.canEdit;
  }

  constructor(
    private resumeDataService: ResumeDataService,
    private authenticator: AuthenticatorService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
