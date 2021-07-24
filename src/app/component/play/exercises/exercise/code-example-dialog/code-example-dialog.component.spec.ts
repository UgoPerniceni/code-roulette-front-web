import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExampleDialogComponent } from './code-example-dialog.component';

describe('CodeExampleDialogComponent', () => {
  let component: CodeExampleDialogComponent;
  let fixture: ComponentFixture<CodeExampleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeExampleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
