// datetimeUtils.js
function parseUTCDateTime(datetime) {
  const year = parseInt(datetime.slice(0, 4));
  const month = parseInt(datetime.slice(4, 6));
  const day = parseInt(datetime.slice(6, 8));
  const hour = parseInt(datetime.slice(8, 10));
  const minute = parseInt(datetime.slice(10, 12));
  const second = parseInt(datetime.slice(12, 14));

  return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
}

export function calculateTimeDifferenceInMinutesFromCurrent(datetime) {
  const dt1 = parseUTCDateTime(datetime);
  const dt2 = new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceInMillis = Math.abs(dt2 - dt1);

  // Convert milliseconds to minutes
  const minutesDifference = timeDifferenceInMillis / (1000 * 60);

  return Math.floor(minutesDifference); // Rounded down to the nearest whole number of minutes
}
