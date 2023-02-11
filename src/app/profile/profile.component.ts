import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { CdsModule } from "@cds/angular";
import { ClarityModule } from "@clr/angular";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { ResumeEntry } from '../api/v1';
import { CardComponent } from "../card/card.component";
import { ResumeEntriesByType } from "../models";
import { ResumeDataService } from "../resume-data.service";

@Component({
  standalone: true,
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  imports: [CdsModule, CommonModule, ClarityModule, CardComponent],
})
export class ProfileComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  entriesByType$: Observable<
    ResumeEntriesByType
  > = this.resumeDataService
    .getEntriesByType("alecwest")
    .pipe(takeUntil(this.destroy$));

  entryTypes: Observable<ResumeEntry.TypeEnum[]> = this.entriesByType$.pipe(
    map(
      (entry) =>
        Object.keys(entry).sort((a, b) => {
          const order = { bio: -1 };
          return (order[a] || 0) - (order[b] || 0);
        }) as ResumeEntry.TypeEnum[]
    )
  );

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
}
