import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CdsIconModule } from "@cds/angular";
import { AuthenticatorService } from "@aws-amplify/ui-angular";
import { FormGroupDirective, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-editable",
  standalone: true,
  imports: [CommonModule, CdsIconModule, ReactiveFormsModule],
  template: `
    <ng-template #editButton>
      <button
        *ngIf="authenticated"
        class="btn btn-link"
        style="margin: 0"
        (click)="onEditCancelClick()"
      >
        <cds-icon shape="pencil"></cds-icon>
        Edit
      </button>
    </ng-template>
    <ng-container *ngIf="editForm; else editButton">
      <button
        class="btn btn-link"
        style="margin: 0"
        (click)="onEditCancelClick()"
      >
        <cds-icon shape="ban"></cds-icon>
        Cancel
      </button>
    </ng-container>

    <button
      type="submit"
      class="btn btn-primary"
      style="margin: auto 1em"
      *ngIf="editForm"
      (click)="onSaveClick()"
      [disabled]="!editForm?.form.valid"
    >
      Save
    </button>
  `,
  styles: [],
})
export class EditableComponent {
  @Output()
  editCancelClick: EventEmitter<void> = new EventEmitter();

  @Input()
  editForm: FormGroupDirective;

  // TODO this could be a directive
  protected get authenticated() {
    return this.authenticator.authStatus === "authenticated";
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
