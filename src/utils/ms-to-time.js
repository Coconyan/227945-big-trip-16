export const convertMsToTime = (duration) => {
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));

  days = (days < 10) ? `0${  days  }` : days;
  hours = (hours < 10) ? `0${  hours  }` : hours;
  minutes = (minutes < 10) ? `0${  minutes  }` : minutes;

  if (hours < 1 && days < 1) {
    return `${  minutes  }M`;
  } else if (days < 1) {
    return `${  hours  }H ${  minutes  }M`;
  }

  return `${  days  }D ${  hours  }H ${  minutes  }M`;
};
