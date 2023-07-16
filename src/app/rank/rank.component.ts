import { CommonModule, TitleCasePipe } from "@angular/common";
import { ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ResumeEntry } from "../api/v1";
import { Editable } from "../editable";
import { EditableComponent } from "../editable/editable.component";
import { ResumeDataService } from "../resume-data.service";
import { SavableComponent } from "../savable/savable.component";

@Component({
  standalone: true,
  selector: "app-rank",
  templateUrl: "./rank.component.html",
  styleUrls: ["./rank.component.scss"],
  imports: [
    TitleCasePipe,
    CommonModule,
    EditableComponent,
    SavableComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RankComponent extends Editable {
  @Input()
  resumeEntries: ResumeEntry[];

  @ViewChild("rankEditForm", { static: false })
  rankEditForm: FormGroupDirective;

  get sortedEntries(): ResumeEntry[] {
    return this.sorted(this.resumeEntries);
  }

  constructor(
    resumeDataService: ResumeDataService,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(resumeDataService, changeDetectorRef);
  }

  protected sorted(resumeEntries: ResumeEntry[]): ResumeEntry[] {
    return resumeEntries.sort((a, b) => {
      const skillSort = b.details.proficiency - a.details.proficiency;
      if (skillSort === 0) {
        return a.title.localeCompare(b.title);
      } else {
        return skillSort;
      }
    });
  }

  afterSubmit(updatedEntry: ResumeEntry): void {
    const oldEntryIndex = this.resumeEntries.findIndex(
      (oldEntry) => oldEntry.id === updatedEntry.id,
    );
    this.resumeEntries[oldEntryIndex] = updatedEntry;
  }
}
