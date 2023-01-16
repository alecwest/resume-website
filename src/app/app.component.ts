import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SheetsService, ParsedSheet, RowData } from './sheets.service';
import { Email, ResumeEntriesByType } from './models';
import { ResumeDataService } from './resume-data.service';
import { ResumeEntry } from './api/v1';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'website';

  sheetsData: ParsedSheet[];

  aboutSheet: ParsedSheet;

  email: Email;

  phone: string;

  resume: string;

  entriesByType$: Observable<ResumeEntriesByType> = this.resumeDataService.getEntriesByUser("alecwest").pipe(
    map(resp => ResumeEntriesByType.fromResumeEntries(resp.Items))
  );

  bio: Observable<ResumeEntry> = this.entriesByType$.pipe(
    filter(entries => entries.bio.length > 0),
    map(entries => entries.bio[0])
  )

  name: Observable<string> = this.bio.pipe(map(bioEntry => bioEntry.title));

  intro: Observable<string[]> = this.bio.pipe(map(bioEntry => bioEntry.details.description));

  headshot: Observable<string> = this.bio.pipe(
    filter(entry => entry.details.images.length > 0),
    map(bioEntry => bioEntry.details.images[0])
  );

  @ViewChild('headerCard') headerCardTemplate: TemplateRef<any>;
  @ViewChild('dataGrid') dataGridTemplate: TemplateRef<any>;
  @ViewChild('iconGrid') iconGridTemplate: TemplateRef<any>;
  @ViewChild('table') tableTemplate: TemplateRef<any>;
  @ViewChild('verticalTable') verticalTableTemplate: TemplateRef<any>;

  loading = false;

  constructor(private sheetsService: SheetsService, private resumeDataService: ResumeDataService) {}

  ngOnInit() {
    this.loading = true;
    this.headshot.subscribe(url => document.querySelector('#favIcon').setAttribute('href', url));
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

  getDataLayout(sheet: ParsedSheet): TemplateRef<any> {
    switch (sheet.metadata.layout) {
      case 'headerCard':
        return this.headerCardTemplate;
      case 'dataGrid':
        return this.dataGridTemplate;
      case 'iconGrid':
        return this.iconGridTemplate;
      case 'table':
        return this.tableTemplate;
      case 'verticalTable':
        return this.verticalTableTemplate;
      default:
        return this.tableTemplate;
    }
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

  isUrl(element: string): boolean {
    return element.includes('.com');
  }
}
