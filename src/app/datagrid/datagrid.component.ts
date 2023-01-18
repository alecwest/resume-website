import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResumeEntry } from '../api/v1';

@Component({
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss']
})
export class DatagridComponent implements OnChanges {


  @Input()
  resumeEntries: ResumeEntry[];

  // @Input()
  columnNames: string[];

  getDetailColumns(entry: ResumeEntry): string[] {
    return Object.keys(entry).filter(entryKey => {
      return Array.isArray(entry[entryKey]);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.columnNames = ["title", "startDate", "endDate"];
  }
}
