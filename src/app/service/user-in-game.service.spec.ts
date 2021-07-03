import { TestBed } from '@angular/core/testing';

import { UserInGameService } from './user-in-game.service';

describe('UserInGameService', () => {
  let service: UserInGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
