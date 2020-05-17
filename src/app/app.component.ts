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
        { sheetName: 'Projects', start: 'A', end: 'E' }
      )
      .subscribe((resp) => {
        console.log(resp);
        this.sheetsData = resp;
      });
  }

  getColumnNames(sheet: Sheet): string[] {
    return sheet.values[0].filter((column, index) => {
      return !this.isLargeText(column) && !this.columnIsEmpty(sheet, index);
    });
  }

  columnIsEmpty(sheet: Sheet, columnIndex: number): boolean {
    return sheet.values.slice(1).every(row => {
      return columnIndex >= row.length || row[columnIndex] === '';
    });
  }

  getDataRows(sheet: Sheet): string[][] {
    return sheet.values.slice(1);
  }

  getRowCells(sheet: Sheet, rowIndex: number): string[] {
    const columns = sheet.values[0];
    return this.getDataRows(sheet)[rowIndex].filter((_, index) => {
      return !this.isLargeText(columns[index]);
    });
  }

  getPageName(sheet: Sheet): string {
    return sheet.range.split('!')[0].replace(/([a-z])([A-Z])/, '$1 $2');
  }

  isDataGridSheet(sheet: Sheet): boolean {
    return sheet.values.some(row => row.some(cell => this.isLargeText(cell)));
  }

  isRowCommented(row: string[]) {
    return row.some((element) => element.includes('#'));
  }

  isLargeText(element: string) {
    return element.includes('>');
  }

  getDetailCells(sheet: Sheet, rowIndex: number): string[] {
    const columns = sheet.values[0];
    return this.getDataRows(sheet)[rowIndex].filter((_, index) => {
      return this.isLargeText(columns[index]);
    });
  }

  getIconClass(element: string) {
    return {
      technical: 'code',
      personal: 'user',
    }[element];
  }
}
