import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SheetRange } from './models';
import { Observable } from 'rxjs';

const SHEETS_API_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1ApMZjOSf4HLBVSRa0Rmb0AFW2MNNAvH4abzVTkGkEWk/values';
const KEY = 'AIzaSyCeL3mq1JY9OI6iuMxT-TN2334OM1YwSTo';

@Injectable({
  providedIn: 'root',
})
export class SheetsService {
  constructor(private http: HttpClient) {}

  // +"/sheetName!start:end"
  getSheet(sheet: SheetRange): Observable<any> {
    const url = `${SHEETS_API_URL}/${this.formatSheetRangeParam(
      sheet
    )}&key=${KEY}`;
    return this.http.get(url);
  }

  getSheets(...sheets: SheetRange[]): Observable<any> {
    const ranges = sheets.map(
      (sheet) => `&ranges=${this.formatSheetRangeParam(sheet)}`
    ).join('');
    const url = `${SHEETS_API_URL}:batchGet?key=${KEY}${ranges}`;
    return this.http.get(url);
  }

  private formatSheetRangeParam(sheet: SheetRange) {
    return `${sheet.sheetName}!${sheet.start}:${sheet.end}`;
  }
}
