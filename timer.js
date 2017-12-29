let t = new Timer(30 * 1000);

updateTimer();
setInterval(updateTimer, 1000);

document.getElementById('start').addEventListener('click', () => {
  let onFinished = t.start();
  console.log('checking perrmission', Notification.permission);
  //if (Notification.permission !== 'denied') {
    Notification.requestPermission(() => {
      onFinished.then(() => new Notification('Timer finished'));
    });
  //}
});

function updateTimer() {
  document.getElementById('timer').innerText = formatDuration(t.remaining);
}

function Timer(duration) {
  this._startTime = null;

  this.start = () => {
    this._startTime = new Date();
    return new Promise(res => setTimeout(res, duration));
  };

  Object.defineProperties(this, {
    'elapsed': {
      get: () => this._startTime
        ? Math.max((new Date()) - this._startTime, 0)
        : 0,
    },
    'remaining': {
      get: () => Math.max(duration - this.elapsed, 0),
    }
  });
}

function formatDuration(duration) {
  let secondsDuration = parseInt(duration / 1000);
  let seconds = secondsDuration % 60;
  let minutes = Math.floor(secondsDuration/60)%60;
  let hours = Math.floor(secondsDuration/60/60);
  let f = n => ('' + n).padStart(2, '0');
  return `${f(hours)}:${f(minutes)}:${f(seconds)}`
}
