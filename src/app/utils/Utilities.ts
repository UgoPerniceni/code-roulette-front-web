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
    // rebuild date from Array of date, might change it later
    let dateStr = '';

    if (data) {
      const year = data[0];
      let month = String(data[1]);
      let day = String(data[2]);
      let hour = String(data[3]);
      let min = String(data[4]);
      let second = String(data[5]);
      let milliSeconds = String(data[6]);

      if (month.length === 1) {
        month = '0' + month;
      }
      if (day.length === 1) {
        day = '0' + day;
      }
      if (hour.length === 1) {
        hour = '0' + hour;
      }
      if (min.length === 1) {
        min = '0' + min;
      }
      if (second.length === 1) {
        second = '0' + second;
      }

      milliSeconds = String(milliSeconds);
      dateStr = `${year}-${month}-${day} ${hour}:${min}:${second}:${milliSeconds}`;
    }

    return dateStr;
  }
}
