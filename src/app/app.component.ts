import { Component, OnInit } from '@angular/core';
import { SheetsService } from './sheets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'website';

  constructor(private sheetsService: SheetsService) { }

  ngOnInit() {
    this.sheetsService.getSheets(
      {sheetName: 'basic-info', start: 'A2', end: 'B'},
      {sheetName: 'education', start: 'A2', end: 'G'},
      {sheetName: 'work-experience', start: 'A2', end: 'G'},
      {sheetName: 'skills', start: 'A2', end: 'B'},
      {sheetName: 'projects', start: 'A2', end: 'D'},
    ).subscribe(resp => {
      console.log(resp);
    });
  }
}
