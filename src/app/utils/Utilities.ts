import {UserInGame} from '../model/UserInGame';
import {User} from '../model/User';

export class Utilities {
  static usersToUsersInGame(users: User[]): UserInGame[] {
    const usersInGame: UserInGame[] = [];
    users.forEach(user => {
      usersInGame.push(new UserInGame('', 0, false, 0, false, false, user));
    });

    return usersInGame;
  }

  static formatDate(data: any): string {
    let dateStr = '';

    if (data) {
      let milliSeconds = data[6];
      milliSeconds = String(milliSeconds).slice(0, 3);
      dateStr = `${data[0]}-${data[1]}-${data[2]} ${data[3]}:${data[4]}:${data[5]}:${milliSeconds}`;
    }

    return dateStr;
  }
}
