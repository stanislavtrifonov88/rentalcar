import * as moment from 'moment';

export const dateFormat = 'YYYY-MM-DDTHH:mm';
export const timeStamp = (days = 0, minutes = 0) => moment(new Date()).add(days, 'days').add(minutes, 'minutes').format(dateFormat);
export const dateFormatter = (date) => moment(date).format(dateFormat);
export const differenceInDays = (endTime, startTime) => moment
  .duration(moment(endTime, dateFormat)
    .diff(moment(startTime, dateFormat))).asDays();
