import * as moment from 'moment';

export class DateTimeConverter {
  static timestampNow(): number {
    return moment().utc().unix();
  }

  static toTimestamp(date: moment.Moment): number {
    return date.utc().unix();
  }

  static toDate(timestamp: number): moment.Moment {
    return moment(timestamp).utc();
  }
}
