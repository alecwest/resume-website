import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { ResumeEntriesByType } from '../models';
import { ResumeEntry } from '../api/v1';
import { ResumeDataService } from '../resume-data.service';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-nav',
  template: `
    <ul class="nav">
      <li class="nav-item" *ngFor="let type of entryTypes | async">
        <a class="nav-link" href="#{{ type }}">{{ type | titlecase }}</a>
      </li>
    </ul>
  `,
  imports: [TitleCasePipe, CommonModule]
})
export class NavComponent implements OnDestroy {
  @HostBinding('class') classes = 'subnav';
  @HostBinding('role') roles = 'navigation';

  destroy$: Subject<boolean> = new Subject<boolean>();

  // TODO there's a bit of duplication here from the profile component...
  entriesByType$: Observable<ResumeEntriesByType> = this.resumeDataService
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

  constructor(
    private resumeDataService: ResumeDataService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
