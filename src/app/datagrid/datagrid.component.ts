import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ResumeEntry } from '../api/v1';
import { Editable } from '../editable';
import { ResumeDataService } from '../resume-data.service';
import { TextComponent } from '../text/text.component';
import { ViewFriendlyPipe } from '../view-friendly.pipe';
import { EditableComponent } from '../editable/editable.component';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SavableComponent } from '../savable/savable.component';

interface FlattenedEntry extends ResumeEntry {
  [key: string]: unknown;
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
    CommonModule,
    EditableComponent,
    ReactiveFormsModule,
    FormsModule,
    SavableComponent
  ]
})
export class DatagridComponent extends Editable implements OnChanges {
  @Input()
  resumeEntries: ResumeEntry[];

  @ViewChild('datagridEditForm', { static: false })
  datagridEditForm: FormGroupDirective;


  columnNames: string[];
  detailColumns: string[];

  protected flattenedEntries: FlattenedEntry[];
  protected allColumns: string[];

  constructor(resumeDataService: ResumeDataService, changeDetectorRef: ChangeDetectorRef) {
    super(resumeDataService, changeDetectorRef);
  }

  ngOnChanges(): void {
    this.resumeEntries = this.resumeEntries.sort((a, b) => {
      const aParsed = Date.parse(a.endDate.replace(/[\\/]/g, '-'));
      const bParsed = Date.parse(b.endDate.replace(/[\\/]/g, '-'));
      return a.endDate === 'present' ? -1 : bParsed - aParsed;
    });
    if (this.resumeEntries.length > 0) {
      const firstEntry = this.resumeEntries[0];
      const detailKeys = Object.keys(firstEntry.details).map(key => `details.${key}`);

      this.allColumns = Object.keys(firstEntry).filter(key => key !== 'details').concat(detailKeys);

      this.columnNames = this.allColumns
        .filter((entryKey) => {
          const entryItem = this.getItemFromEntry(firstEntry, entryKey);
          return typeof entryItem === 'string';
        })
        .filter((entryKey) => !['id', 'type', 'user'].includes(entryKey))
        .sort((a, b) => {
          const order = { title: -1, startDate: 2, endDate: 3 };
          return (order[a] || 0) - (order[b] || 0);
        });

      this.detailColumns = this.allColumns.filter((entryKey) => {
        const entryItem = this.getItemFromEntry(firstEntry, entryKey);
        return Array.isArray(entryItem);
      }).sort((a, b) => {
        const order = { description: -1 };
        return (order[a] || 0) - (order[b] || 0);
      });
    }
  }

  afterSubmit(updatedEntry: ResumeEntry): void {
    const oldEntryIndex = this.resumeEntries.findIndex(entry => entry.id === updatedEntry.id);
    this.resumeEntries[oldEntryIndex] = updatedEntry;
  }

  protected getItemFromEntry(entry: unknown, nextKeys: string | string[]) {
    const keyArray = Array.isArray(nextKeys) ? nextKeys : nextKeys.split(".");
    if (keyArray.length === 0) {
      return entry;
    } else if (keyArray.length === 1) {
      return entry[keyArray[0]]
    } else {
      return this.getItemFromEntry(entry[keyArray[0]], keyArray.slice(1));
    }
  }
}
