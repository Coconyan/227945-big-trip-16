export const msToTime = (duration) => {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? `0${  hours}` : hours;
  minutes = (minutes < 10) ? `0${  minutes}` : minutes;
  if (hours < 1) {
    return `${  minutes  }M`;
  }

  return `${hours  }H ${  minutes  }M`;
};
