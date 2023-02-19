import { CommonModule } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from "@angular/core";
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { ResumeEntry } from "../api/v1";
import { Editable } from "../editable";
import { EditableComponent } from "../editable/editable.component";
import { ResumeDataService } from "../resume-data.service";

@Component({
  standalone: true,
  selector: "app-bio",
  templateUrl: "./bio.component.html",
  styleUrls: ["./bio.component.scss"],
  imports: [CommonModule, EditableComponent, FormsModule, ReactiveFormsModule],
})
export class BioComponent extends Editable implements OnChanges {
  @Input()
  bio: ResumeEntry;

  @ViewChild("bioEditForm", { static: false })
  bioEditForm: FormGroupDirective;

  name: string;

  intro: string[];

  headshot: string;

  constructor(
    resumeDataService: ResumeDataService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(resumeDataService, changeDetectorRef);
  }

  ngOnChanges(): void {
    this.readBio();
  }

  afterSubmit(entry: ResumeEntry): void {
    this.bio = entry;
    this.readBio();
  }

  private readBio(): void {
    if (this.bio) {
      this.name = this.bio.title;
      this.intro = this.bio.details.description;
      this.headshot =
        this.bio.details.images.length > 0 && this.bio.details.images[0];
      document.querySelector("#favIcon").setAttribute("href", this.headshot);
    }
  }
}
