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
}
