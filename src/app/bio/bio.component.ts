import { Component, Input, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ResumeEntry } from '../api/v1';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {

  @Input()
  bio: Observable<ResumeEntry> = EMPTY;

  name: Observable<string> = this.bio.pipe(map(bioEntry => bioEntry.title));

  intro: Observable<string[]> = this.bio.pipe(map(bioEntry => bioEntry.details.description));

  headshot: Observable<string> = this.bio.pipe(
    filter(entry => entry.details.images.length > 0),
    map(bioEntry => bioEntry.details.images[0])
  );

  ngOnInit() {
    this.headshot.subscribe(url => document.querySelector('#favIcon').setAttribute('href', url));
  }
}
