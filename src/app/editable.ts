import { ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ResumeEntry } from "./api/v1";
import { ResumeDataService } from "./resume-data.service";

/**
 * Intended to be extended by the various components that are used to display entries to help with editing.
 */
export abstract class Editable {

  editableFormControl: FormControl;

  editing: boolean;

  constructor(private resumeDataService: ResumeDataService, private changeDetectorRef: ChangeDetectorRef) {}

  /**
   * Implemented by the extending component as a way to update its entry to reflect
   * what was just submitted. Only called when submission is successful.
   * @param entry the entry successfully sent to the backend
   */
  abstract afterSubmit(entry: ResumeEntry): void;

  /**
   * Function intended to be called when an edit is requested or cancelled.
   * Sets the provided entry as the thing to be edited.
   */
  toggleEdit(entry: ResumeEntry): void {
    this.editing = !this.editing;
    this.editableFormControl = new FormControl(JSON.stringify(entry, null, 2));
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Function intended to be called when the edit is complete and is being saved.
   */
  onSubmit(formControl: FormControl) {
    const entry: ResumeEntry = JSON.parse(formControl.value);
    this.submitEdit(entry).subscribe(() => {
      this.afterSubmit(entry);
    });
  }

  /**
   * Sends the entry in its current state to the backend for updating.
   */
  private submitEdit(entry: ResumeEntry): Observable<boolean> {
    console.log(entry);
    return this.resumeDataService.putEntry(entry.user, entry).pipe(
      tap((a) => console.log(a)),
      map(() => true),
      catchError((err) => {
        console.error(err);
        return of(false);
      })
    );
  }
}
