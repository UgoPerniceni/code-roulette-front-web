import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveNewcodeSuccessComponent } from './save-newcode-success.component';

describe('SaveNewcodeSuccessComponent', () => {
  let component: SaveNewcodeSuccessComponent;
  let fixture: ComponentFixture<SaveNewcodeSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveNewcodeSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveNewcodeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
