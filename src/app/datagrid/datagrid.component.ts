import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ResumeEntry } from '../api/v1';
import { TextComponent } from '../text/text.component';
import { ViewFriendlyPipe } from '../view-friendly.pipe';

interface FlattenedEntry extends ResumeEntry {
  [key: string]: any;
}

/**
 * TODO:
 * 4. Merge rows? (all adtran title rows)
 */

@Component({
  standalone: true,
  selector: 'app-datagrid',
  templateUrl: './datagrid.component.html',
  styleUrls: ['./datagrid.component.scss'],
  imports: [
    ClarityModule,
    ViewFriendlyPipe,
    TextComponent,
    CommonModule
  ]
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
    })
    .sort((a, b) => {
      const aParsed = Date.parse(a.endDate.replace(/[\\\/]/g, '-'));
      const bParsed = Date.parse(b.endDate.replace(/[\\\/]/g, '-'));
      return a.endDate === 'present' ? -1 : bParsed - aParsed;
    });
    if (this.flattenedEntries.length > 0) {
      const firstEntry = this.flattenedEntries[0];
      this.columnNames = Object.keys(firstEntry)
        .filter((entryKey) => {
          return typeof firstEntry[entryKey] === 'string';
        })
        .filter((entryKey) => !['id', 'type', 'user'].includes(entryKey))
        .sort((a, b) => {
          const order = { title: -1, startDate: 2, endDate: 3 };
          return (order[a] || 0) - (order[b] || 0);
        });

      this.detailColumns = Object.keys(firstEntry).filter((entryKey) => {
        return Array.isArray(firstEntry[entryKey]);
      }).sort((a, b) => {
        const order = { description: -1 };
        return (order[a] || 0) - (order[b] || 0);
      });
    }
  }
}
