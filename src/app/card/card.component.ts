import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ResumeEntry } from "../api/v1";
import { BioComponent } from "../bio/bio.component";
import { DatagridComponent } from "../datagrid/datagrid.component";
import { RankComponent } from "../rank/rank.component";

@Component({
  standalone: true,
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  imports: [BioComponent, DatagridComponent, RankComponent, CommonModule],
})
export class CardComponent {
  /**
   * A list of entries which should all be of the same type
   */
  @Input()
  resumeEntries: ResumeEntry[];

  get type(): string {
    return this.resumeEntries.length > 0 && this.resumeEntries[0].type;
  }

  get layout(): string {
    if (this.type === ResumeEntry.TypeEnum.Bio) {
      return "headerCard";
    } else if (
      this.resumeEntries.every(
        (entry) =>
          entry.details &&
          Object.values(entry.details).some((entryDetailValue) =>
            Array.isArray(entryDetailValue)
          )
      )
    ) {
      // for every entry, there is some value in the details section that is an array
      return "newDataGrid";
    } else if (this.resumeEntries.every((entry) => entry.details.proficiency)) {
      // TODO consider using something more generic like "ranking"
      return "list";
    } else {
      return "wip";
    }
  }
}
