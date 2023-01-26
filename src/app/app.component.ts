import { Component, OnDestroy } from '@angular/core';
import { ParsedSheet } from './sheets.service';
import { Email, ResumeEntriesByType } from './models';
import { ResumeDataService } from './resume-data.service';
import { ResumeEntry } from './api/v1';
import { Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  // TODO support loading again - maybe use https://medium.com/angular-in-depth/angular-show-loading-indicator-when-obs-async-is-not-yet-resolved-9d8e5497dd8
  loading = false;

  title = 'website';

  sheetsData: ParsedSheet[];

  aboutSheet: ParsedSheet;

  email: Email;

  phone: string;

  resume: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  entriesByType$: Observable<ResumeEntriesByType> = this.resumeDataService.getEntriesByUser('alecwest').pipe(
    shareReplay(1),
    takeUntil(this.destroy$),
    map(resp => ResumeEntriesByType.fromResumeEntries(resp.Items)),
    tap(_ => this.loading = false)
  );

  bio: Observable<ResumeEntry> = this.entriesByType$.pipe(
    filter(entries => entries.bio.length > 0),
    map(entries => entries.bio[0])
  );

  name: Observable<string> = this.bio.pipe(map(bioEntry => bioEntry.title));

  entryTypes: Observable<ResumeEntry.TypeEnum[]> = this.entriesByType$.pipe(map(entry => Object.keys(entry) as ResumeEntry.TypeEnum[]));

  entryLayout: Observable<{[type: string]: string}> = this.entriesByType$.pipe(
    map(entriesByType => {
      return Object.keys(entriesByType)
        .reduce<{[type: string]: string}>((accumulator, type) => {
          const entries: ResumeEntry[] = entriesByType[type];
          if (type === ResumeEntry.TypeEnum.Bio) {
            accumulator[type] = 'headerCard';
          } else if (entries.every(entry => entry.details && Object.values(entry.details)
            .some(entryDetailValue => Array.isArray(entryDetailValue)))) {
            // for every entry, there is some value in the details section that is an array
            accumulator[type] = 'newDataGrid';
          } else if (entries.every(entry => entry.details.proficiency)) { // TODO consider using something more generic like "ranking"
            accumulator[type] = 'list';
          } else {
            accumulator[type] = 'wip';
          }
          return accumulator;
        }, {});
    })
  );

  getType(type: ResumeEntry.TypeEnum): Observable<ResumeEntry[]> {
    return this.entriesByType$.pipe(map(entriesByType => entriesByType[type]));
  }

  constructor(private resumeDataService: ResumeDataService) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
