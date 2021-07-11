import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarGameComponent } from './snack-bar-game.component';

describe('SnackBarGameComponent', () => {
  let component: SnackBarGameComponent;
  let fixture: ComponentFixture<SnackBarGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
