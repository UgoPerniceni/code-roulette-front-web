import { TestBed } from '@angular/core/testing';

import { CanLeaveGameGuard } from './can-leave-game.guard';

describe('CanLeaveGameGuard', () => {
  let guard: CanLeaveGameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLeaveGameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
