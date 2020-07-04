import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SheetRange } from './models';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const KEY = 'AIzaSyCeL3mq1JY9OI6iuMxT-TN2334OM1YwSTo';

const SHEETS_URL_PREFIX = 'https://sheets.googleapis.com/v4/spreadsheets';

export interface Metadata {
  layout: string;
  header: string;
  columns: string[];
  largeTextColumns: string[];
}

export interface Sheets {
  spreadsheetId: string;
  valueRanges: Sheet[];
}

export interface Sheet {
  majorDimension: string;
  range: string;
  values: string[][];
}

export interface RowData {
  [key: string]: string;
}

export interface ParsedSheet {
  metadata: Metadata;
  sheetName: string;
  values: RowData[];
}

@Injectable({
  providedIn: 'root',
})
export class SheetsService {
  constructor(private http: HttpClient) {}

  getSheet(spreadsheetId: string, sheet: SheetRange): Observable<Sheet> {
    const url = `${SHEETS_URL_PREFIX}/${spreadsheetId}/values/${this.formatSheetRangeParam(
      sheet
    )}&key=${KEY}`;
    return this.http.get<Sheet>(url);
  }

  getSheets(
    spreadsheetId: string,
    ...sheets: SheetRange[]
  ): Observable<ParsedSheet[]> {
    function parseMetadata(sheet: Sheet): Metadata {
      const headers = sheet.values[0];
      const values = sheet.values.slice(1);
      const metadataKeyValue: any = {};
      headers.forEach((header, index) => {
        if (header.includes('metadata')) {
          const metadataKey = header.split(':')[1];
          const metadataValue = values[0][index];
          metadataKeyValue[metadataKey] = metadataValue;
        }
      });
      return {
        header: metadataKeyValue.header,
        columns: metadataKeyValue.columns.split(','),
        largeTextColumns: metadataKeyValue.largeTextColumns
          ? metadataKeyValue.largeTextColumns.split(',')
          : [],
        layout: metadataKeyValue.layout,
      };
    }

    const ranges = sheets
      .map((sheet) => `&ranges=${this.formatSheetRangeParam(sheet)}`)
      .join('');
    const url = `${SHEETS_URL_PREFIX}/${spreadsheetId}/values:batchGet?key=${KEY}${ranges}`;

    return this.http.get<Sheets>(url).pipe(
      map((resp: Sheets) => {
        return resp.valueRanges.map((sheet) => {
          const metadata = parseMetadata(sheet);
          const columns = sheet.values[0];
          const values = sheet.values.slice(1);
          return {
            metadata,
            sheetName: sheet.range.split('!')[0],
            values: values.map(row => {
              return row.reduce((rowObj, currCell, index) => {
                return {
                  ...rowObj,
                  [columns[index]]: currCell
                };
              }, {});
            })
          } as ParsedSheet;
        });
      })
    );
  }

  getSpreadsheet(spreadsheetId: string): Observable<any> {
    const url = `${SHEETS_URL_PREFIX}/${spreadsheetId}?key=${KEY}&includeGridData=true`;
    return this.http.get(url);
  }

  private formatSheetRangeParam(sheet: SheetRange) {
    return `${sheet.sheetName}!${sheet.start}:${sheet.end}`;
  }
}
