import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ResumeEntry } from '../api/v1';

@Component({
  standalone: true,
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss'],
  imports: [
    CommonModule
  ]
})
export class BioComponent implements OnChanges {

  @Input()
  bio: ResumeEntry;

  name: string;

  intro: string[];

  headshot: string;

  ngOnChanges(): void {
    if (this.bio) {
      this.name = this.bio.title;
      this.intro = this.bio.details.description;
      this.headshot = this.bio.details.images.length > 0 && this.bio.details.images[0];
      document.querySelector('#favIcon').setAttribute('href', this.headshot);
    }
  }
}
