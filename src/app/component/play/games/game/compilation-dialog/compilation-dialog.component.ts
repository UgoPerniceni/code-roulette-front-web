import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Compilation} from '../../../../../model/Compilation';
import {Utilities} from '../../../../../utils/Utilities';

@Component({
  selector: 'app-compilation-dialog',
  templateUrl: './compilation-dialog.component.html',
  styleUrls: ['./compilation-dialog.component.css']
})
export class CompilationDialogComponent implements OnInit {

  form: FormGroup;

  compilation: Compilation;
  panelOpenState = true;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CompilationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: Compilation) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });

    this.compilation = data;
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  formatDate(date: Date): string {
    return Utilities.formatDate(date);
  }
}
