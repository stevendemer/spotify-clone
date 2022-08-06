function padToDigits(num) {
  return num.toString().padStart(2, "0");
}

export function millisToMinutesAndSeconds(millis) {
  let seconds = Math.floor(millis / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds %= 60;
  //if seconds are greater than 30 round them up
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes %= 60;

  return `${padToDigits(hours)}:${padToDigits(minutes)}`;

  // const minutes = Math.floor(millis / 60000);
  // const seconds = ((millis % 60000) / 1000).toFixed(0);
  // return seconds == 60
  //   ? minutes + 1 + ":00"
  //   : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function millisToMinutes(millis) {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
