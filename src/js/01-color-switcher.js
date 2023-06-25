/*-------------------------------------------------------------------------------------------------------------------------------- */
const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);
let timerId = null;

/*-------------------------------------------------------------------------------------------------------------------------------- */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function stopChangeColor() {
  btnStop.setAttribute(`disabled`, '');
  btnStart.removeAttribute(`disabled`);
  clearInterval(timerId);
}
function changeBgc() {
  document.body.style.backgroundColor = getRandomHexColor();
}
function startChangeColor() {
  btnStop.removeAttribute(`disabled`);
  btnStart.setAttribute(`disabled`, '');
  changeBgc();
  timerId = setInterval(() => {
    changeBgc();
  }, 1000);
}
/*-------------------------------------------------------------------------------------------------------------------------------- */
btnStop.setAttribute(`disabled`, '');
const btnStartLisner = btnStart.addEventListener('click', startChangeColor);
const btnStopLisner = btnStop.addEventListener('click', stopChangeColor);
