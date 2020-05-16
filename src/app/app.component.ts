import { Component, OnInit } from '@angular/core';
import { SheetsService, SheetsServiceResponse, Sheet } from './sheets.service';

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
        { sheetName: 'AboutMe', start: 'A', end: 'B' },
        { sheetName: 'Education', start: 'A', end: 'G' },
        { sheetName: 'WorkHistory', start: 'A', end: 'G' },
        { sheetName: 'Skills', start: 'A', end: 'B' },
        { sheetName: 'Projects', start: 'A', end: 'D' }
      )
      .subscribe((resp) => {
        console.log(resp);
        this.sheetsData = resp;
      });
  }

  getPageName(sheet: Sheet): string {
    return sheet.range.split('!')[0].replace(/([a-z])([A-Z])/, '$1 $2');
  }

  isRowCommented(row: string[]) {
    return row.some(element => element.includes('#'));
  }

  isLargeText(element: string) {
    return element.includes('>');
  }

  getIconClass(element: string) {
    return {
      technical: 'code',
      personal: 'user'
    }[element];
  }
}

