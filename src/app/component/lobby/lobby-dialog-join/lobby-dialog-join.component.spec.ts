import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyDialogJoinComponent } from './lobby-dialog-join.component';

describe('LobbyDialogJoinComponent', () => {
  let component: LobbyDialogJoinComponent;
  let fixture: ComponentFixture<LobbyDialogJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyDialogJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyDialogJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
