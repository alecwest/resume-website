import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SheetsService, ParsedSheet, RowData } from './sheets.service';
import { Email } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'website';

  sheetsData: ParsedSheet[];

  aboutSheet: ParsedSheet;

  name: string;

  email: Email;

  phone: string;

  @ViewChild('dataGrid') dataGridTemplate: TemplateRef<any>;
  @ViewChild('iconGrid') iconGridTemplate: TemplateRef<any>;
  @ViewChild('table') tableTemplate: TemplateRef<any>;
  @ViewChild('verticalTable') verticalTableTemplate: TemplateRef<any>;

  loading = false;

  constructor(private sheetsService: SheetsService) {}

  ngOnInit() {
    this.loading = true;
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
        console.log(resp);
        this.sheetsData = resp;
        this.aboutSheet = this.sheetsData.find((sheet) =>
          sheet.sheetName.includes('About')
        );
        this.name = this.getName();
        this.email = this.getEmail();
        this.phone = this.getPhone();
        this.loading = false;
      });
  }

  private getName(): string {
    return this.aboutSheet.values[0].name;
  }

  private getEmail(): Email {
    const email: string = this.aboutSheet.values[0].email;
    const parsed = email.split(/[@.]/);
    return {
      name: parsed[0],
      domain: parsed[1],
      tld: parsed[2],
    } as Email;
  }

  private getPhone(): string {
    const phone: string = this.aboutSheet.values[0].phone;
    return phone;
  }

  getTableSheets(): ParsedSheet[] {
    return this.sheetsData.filter(
      (sheet) => !sheet.sheetName.includes('About')
    );
  }

  getColumnNames(sheet: ParsedSheet): string[] {
    return sheet.metadata.columns;
  }

  getLargeColumnNames(sheet: ParsedSheet): string[] {
    return sheet.metadata.largeTextColumns;
  }

  getDataLayout(sheet: ParsedSheet): TemplateRef<any> {
    switch (sheet.metadata.layout) {
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
}
