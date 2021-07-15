import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSaloonComponent } from './game-saloon.component';

describe('GameSaloonComponent', () => {
  let component: GameSaloonComponent;
  let fixture: ComponentFixture<GameSaloonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSaloonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSaloonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
