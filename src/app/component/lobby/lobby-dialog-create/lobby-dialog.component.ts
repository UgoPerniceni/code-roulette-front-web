import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-lobby-dialog',
  templateUrl: './lobby-dialog.component.html',
  styleUrls: ['./lobby-dialog.component.css']
})
export class LobbyDialogComponent implements OnInit {

  form!: FormGroup;

  title: string;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<LobbyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: any) {

    this.title = data.title;

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]]
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
