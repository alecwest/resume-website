import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SheetsService, Sheets, Sheet, ParsedSheet } from './sheets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'website';

  sheetsData: ParsedSheet[];

  @ViewChild('dataGrid') dataGridTemplate: TemplateRef<any>;
  @ViewChild('iconGrid') iconGridTemplate: TemplateRef<any>;
  @ViewChild('table') tableTemplate: TemplateRef<any>;
  @ViewChild('verticalTable') verticalTableTemplate: TemplateRef<any>;

  constructor(private sheetsService: SheetsService) {}

  ngOnInit() {
    this.sheetsService
      .getSheets(
        '1G5HQaVM-T6NYPFtO-MuflVcZB2EbqmCHnkQwh33egYY',
        { sheetName: 'AboutMe', start: 'A', end: 'Z' },
        { sheetName: 'Education', start: 'A', end: 'Z' },
        { sheetName: 'WorkHistory', start: 'A', end: 'Z' },
        { sheetName: 'Skills', start: 'A', end: 'Z' },
        { sheetName: 'Languages', start: 'A', end: 'Z' },
        { sheetName: 'Projects', start: 'A', end: 'Z' },
        { sheetName: 'Websites', start: 'A', end: 'Z' }
      )
      .subscribe((resp) => {
        this.sheetsData = resp;
      });
  }

  getColumnNames(sheet: ParsedSheet): string[] {
    return sheet.metadata.columns;
  }

  columnIsEmpty(sheet: Sheet, columnIndex: number): boolean {
    return sheet.values.slice(1).every((row) => {
      return columnIndex >= row.length || row[columnIndex] === '';
    });
  }

  getDataLayout(sheet: ParsedSheet): TemplateRef<any> {
    switch (sheet.metadata.layout) {
      case 'dataGrid': return this.dataGridTemplate;
      case 'iconGrid': return this.iconGridTemplate;
      case 'table': return this.tableTemplate;
      case 'verticalTable': return this.verticalTableTemplate;
      default: return this.tableTemplate;
    }
  }

  getDataRows(sheet: ParsedSheet): string[][] {
    return sheet.values.slice(1);
  }

  getRowCells(sheet: ParsedSheet, rowIndex: number): string[] {
    const columns = sheet.values[0];
    return this.getDataRows(sheet)[rowIndex].filter((_, index) => {
      return !this.isLargeText(columns[index]);
    });
  }

  getPageName(sheet: Sheet): string {
    return sheet.range.split('!')[0].replace(/([a-z])([A-Z])/, '$1 $2');
  }

  isLargeText(element: string) {
    return element.length > 60;
  }

  getDetailCells(sheet: ParsedSheet, rowIndex: number): string[] {
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
