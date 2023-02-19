import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdsIconModule } from '@cds/angular';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-savable',
  standalone: true,
  imports: [CommonModule, CdsIconModule],
  template: `
    <button
      class="btn btn-link"
      style="margin: 0"
      (click)="onCancelClick()"
    >
      <cds-icon shape="ban"></cds-icon>
      Cancel
    </button>

    <button
      type="submit"
      class="btn btn-primary"
      style="margin: auto 1em"
      *ngIf="saveForm"
      (click)="onSaveClick()"
      [disabled]="!saveForm?.form.valid"
    >
      Save
    </button>
  `,
  styles: [
  ]
})
export class SavableComponent {

  @Output()
  cancelClick: EventEmitter<void> = new EventEmitter();

  @Input()
  saveForm: FormGroupDirective;

  protected onCancelClick(): void {
    this.cancelClick.emit();
  }

  protected onSaveClick(): void {
    this.saveForm?.ngSubmit.emit();
    this.cancelClick.emit();
  }
}
