import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompilationDialogComponent } from './compilation-dialog.component';

describe('CompilationDialogComponent', () => {
  let component: CompilationDialogComponent;
  let fixture: ComponentFixture<CompilationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompilationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompilationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
