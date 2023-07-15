import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditableComponent } from "../editable/editable.component";
import { Editable } from "../editable";
import { ResumeEntry } from "../api/v1";
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ResumeDataService } from "../resume-data.service";

@Component({
  selector: "app-new-entry",
  standalone: true,
  imports: [CommonModule, EditableComponent, FormsModule, ReactiveFormsModule],
  templateUrl: "./new-entry.component.html",
  styleUrls: ["./new-entry.component.scss"],
})
export class NewEntryComponent extends Editable implements OnInit {
  @ViewChild("newEntry", { static: false })
  newEntry: FormGroupDirective;

  get cleanEntry(): ResumeEntry {
    return {
      id: new Date().getTime().toString(),
      title: "",
      type: "" as ResumeEntry.TypeEnum,
      user: "alecwest",
      details: {
        degree: "",
        description: [],
        images: [],
        notableClasses: [],
        position: "",
        proficiency: 0,
        projectSource: "",
        social: [],
        subtitle: "",
      },
      endDate: "present",
      startDate: "1/1/2016",
    };
  }

  constructor(
    resumeDataService: ResumeDataService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(resumeDataService, changeDetectorRef);
  }

  ngOnInit(): void {
    this.toggleEdit(this.cleanEntry);
  }

  afterSubmit(updatedEntry: ResumeEntry): void {
    this.toggleEdit(updatedEntry);
  }
}
