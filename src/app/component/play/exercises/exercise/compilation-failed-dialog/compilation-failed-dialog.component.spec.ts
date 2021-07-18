import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilationFailedDialogComponent } from './compilation-failed-dialog.component';

describe('CompilationFailedDialogComponent', () => {
  let component: CompilationFailedDialogComponent;
  let fixture: ComponentFixture<CompilationFailedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilationFailedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilationFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
