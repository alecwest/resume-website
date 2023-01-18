import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SheetsService, ParsedSheet, RowData } from './sheets.service';
import { Email, ResumeEntriesByType } from './models';
import { ResumeDataService } from './resume-data.service';
import { ResumeEntry } from './api/v1';
import { Observable, Subject } from 'rxjs';
import { filter, map, share, shareReplay, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'website';

  sheetsData: ParsedSheet[];

  aboutSheet: ParsedSheet;

  email: Email;

  phone: string;

  resume: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  entriesByType$: Observable<ResumeEntriesByType> = this.resumeDataService.getEntriesByUser("alecwest").pipe(
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

  loading = false;

  constructor(private sheetsService: SheetsService, private resumeDataService: ResumeDataService) {}

  ngOnInit() {
    this.loading = true;
    this.sheetsService
      .getSheets(
        '1G5HQaVM-T6NYPFtO-MuflVcZB2EbqmCHnkQwh33egYY',
        { sheetName: 'AboutMe', start: 'A', end: 'Z' },
        { sheetName: 'WorkHistory', start: 'A', end: 'Z' },
        { sheetName: 'Education', start: 'A', end: 'Z' },
        { sheetName: 'Projects', start: 'A', end: 'Z' },
        { sheetName: 'Skills', start: 'A', end: 'Z' },
        { sheetName: 'Languages', start: 'A', end: 'Z' },
        { sheetName: 'Websites', start: 'A', end: 'Z' }
      )
      .subscribe((resp) => {
        this.sheetsData = resp;
        this.aboutSheet = this.sheetsData.find((sheet) =>
          sheet.sheetName.includes('About')
        );
        this.resume = this.getResume();
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getResume(): string {
    const resume: string = this.aboutSheet.values[0].resume;
    return resume;
  }

  getTableSheets(): ParsedSheet[] {
    return this.sheetsData;
  }

  getColumnNames(sheet: ParsedSheet): string[] {
    return sheet.metadata.columns;
  }

  getLargeColumnNames(sheet: ParsedSheet): string[] {
    return sheet.metadata.largeTextColumns;
  }

  getDataRows(sheet: ParsedSheet): RowData[] {
    return sheet.values;
  }

  getIconClass(element: string) {
    return {
      technical: 'code',
      personal: 'user',
    }[element];
  }
}
