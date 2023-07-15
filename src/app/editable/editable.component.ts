import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdsIconModule } from "@cds/angular";
import { AuthenticatorService } from "../authenticator.service";
import { FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { SavableComponent } from "../savable/savable.component";

@Component({
  selector: "app-editable",
  standalone: true,
  imports: [CommonModule, CdsIconModule, ReactiveFormsModule, SavableComponent],
  template: `
    <ng-template #editButton>
      <button
        *ngIf="canEdit"
        class="btn btn-link"
        style="margin: 0"
        (click)="onEditCancelClick()"
      >
        <cds-icon shape="pencil"></cds-icon>
        Edit
      </button>
    </ng-template>
    <ng-container *ngIf="editForm && savable; else editButton">
      <app-savable
        [saveForm]="editForm"
        (cancelClick)="onEditCancelClick()"
      ></app-savable>
    </ng-container>
  `,
  styles: [],
})
export class EditableComponent {
  @Output()
  editCancelClick: EventEmitter<void> = new EventEmitter();

  @Input()
  editForm: FormGroupDirective;

  /**
   * When true, will render save button(s) in place of edit once a form is present.
   */
  @Input()
  savable: boolean;

  protected get canEdit() {
    return this.authenticator.canEdit;
  }

  constructor(private authenticator: AuthenticatorService) {}

  protected onEditCancelClick(): void {
    this.editCancelClick.emit();
  }

  protected onSaveClick(): void {
    this.editForm?.ngSubmit.emit();
    this.editCancelClick.emit();
  }
}
