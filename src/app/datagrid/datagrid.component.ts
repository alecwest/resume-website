import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ResumeEntry } from "../api/v1";

interface FlattenedEntry extends ResumeEntry {
  [key: string]: any;
}

/**
 * TODO:
 * 1. Exclude certain columns
 * 2. Improve column names
 * 3. Make detail view look better
 * 4. Merge rows? (all adtran title rows)
 * 5. Read and sort dates better
 */

@Component({
  selector: "app-datagrid",
  templateUrl: "./datagrid.component.html",
  styleUrls: ["./datagrid.component.scss"],
})
export class DatagridComponent implements OnChanges {
  @Input()
  resumeEntries: ResumeEntry[];

  columnNames: string[];
  detailColumns: string[];

  protected flattenedEntries: FlattenedEntry[];

  ngOnChanges(changes: SimpleChanges): void {
    this.flattenedEntries = this.resumeEntries.map((entry) => {
      const flattened = { ...entry, ...entry.details };
      delete flattened.details;
      return flattened;
    });
    if (this.flattenedEntries.length > 0) {
      const firstEntry = this.flattenedEntries[0];
      this.columnNames = Object.keys(firstEntry).filter((entryKey) => {
        return typeof firstEntry[entryKey] === "string";
      });
      this.detailColumns = Object.keys(firstEntry).filter((entryKey) => {
        return Array.isArray(firstEntry[entryKey]);
      });
    }
  }
}
