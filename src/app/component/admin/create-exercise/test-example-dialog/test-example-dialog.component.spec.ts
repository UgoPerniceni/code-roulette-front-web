import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExampleDialogComponent } from './test-example-dialog.component';

describe('TestExampleDialogComponent', () => {
  let component: TestExampleDialogComponent;
  let fixture: ComponentFixture<TestExampleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestExampleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestExampleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
