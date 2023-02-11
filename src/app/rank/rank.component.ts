import { CommonModule, TitleCasePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ResumeEntry } from "../api/v1";

@Component({
  standalone: true,
  selector: "app-rank",
  templateUrl: "./rank.component.html",
  styleUrls: ["./rank.component.scss"],
  imports: [TitleCasePipe, CommonModule],
})
export class RankComponent {
  @Input()
  resumeEntries: ResumeEntry[];

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
}
