import { Component, OnInit } from '@angular/core';
import { SheetsService } from './sheets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'website';

  sheetsData: SheetsServiceResponse;

  constructor(private sheetsService: SheetsService) {}

  ngOnInit() {
    this.sheetsService
      .getSheets(
        { sheetName: 'AboutMe', start: 'A2', end: 'B' },
        { sheetName: 'Education', start: 'A2', end: 'G' },
        { sheetName: 'WorkHistory', start: 'A2', end: 'G' },
        { sheetName: 'Skills', start: 'A2', end: 'B' },
        { sheetName: 'Projects', start: 'A2', end: 'D' }
      )
      .subscribe((resp) => {
        console.log(resp);
        this.sheetsData = resp;
      });
  }

  getPageName(sheet: Sheet): string {
    return sheet.range.split('!')[0].replace(/([a-z])([A-Z])/, '$1 $2');
  }
}

export interface SheetsServiceResponse {
  spreadsheetId: string;
  valueRanges: Sheet[];
}

export interface Sheet {
  majorDimension: string;
  range: string;
  values: string[];
}

