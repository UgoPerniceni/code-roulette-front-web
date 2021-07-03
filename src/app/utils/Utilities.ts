import {UserInGame} from '../model/UserInGame';
import {User} from '../model/User';

export class Utilities {
    static usersToUsersInGame(users: User[]): UserInGame[] {
    const usersInGame: UserInGame[] = [];
    users.forEach(user => {
      usersInGame.push(new UserInGame('', user));
    });

    return usersInGame;
  }
}
