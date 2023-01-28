import { Component, Input } from '@angular/core';
import { ResumeEntry } from '../api/v1';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
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
