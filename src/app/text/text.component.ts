import { CommonModule } from '@angular/common';
import { Component, Input } from "@angular/core";
import { BetterDatePipe } from '../betterdate.pipe';
import { UrlPipe } from "../url.pipe";

@Component({
  standalone: true,
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"],
  imports: [UrlPipe, BetterDatePipe, CommonModule],
})
export class TextComponent {
  @Input() context: string; // TODO use ng-content for this instead?

  isUrl(element: string): boolean {
    return element.includes(".com");
  }
}
