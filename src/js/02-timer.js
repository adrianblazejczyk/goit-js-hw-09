/*---------------------------------------------------------------------------------------------------------------- */
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

/*---------------------------------------------------------------------------------------------------------------- */
let time = null;
let timerId = null;

/*---------------------------------------------------------------------------------------------------------------- */
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    time = selectedDates[0] - new Date();
    if (time > 0) {
      btnStartWraper.removeAttribute('disabled');
      upDateTimerView(convertMs(time));
    } else {
      btnStartWraper.setAttribute('disabled', '');
      Notiflix.Notify.failure('Wybierz datę z przyszłości');
    }
  },
};

/*---------------------------------------------------------------------------------------------------------------- */
function updateTimer() {
  if (time > 1000) {
    time -= 1000;
    upDateTimerView(convertMs(time));
  } else {
    clearInterval(timerId);
    Notiflix.Notify.success('Koniec Odliczania');
  }
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function upDateTimerView(time) {
  timerWraper[0].textContent = addLeadingZero(time.days);
  timerWraper[1].textContent = addLeadingZero(time.hours);
  timerWraper[2].textContent = addLeadingZero(time.minutes);
  timerWraper[3].textContent = addLeadingZero(time.seconds);
  //timerWraper.dataset.second = addLeadingZero(time.seconds);
}
function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  btnStartWraper.setAttribute('disabled', '');
  inputData.setAttribute('disabled', '');
  Notiflix.Notify.info('Start odliczania');
}
/*---------------------------------------------------------------------------------------------------------------- */
const inputData = document.querySelector('#datetime-picker');
const timerWraper = document.querySelectorAll('.value');
const btnStartWraper = document.querySelector('[data-start]');
const btnStartLisner = btnStartWraper.addEventListener('click', startTimer);
const calendar = flatpickr('#datetime-picker', options);
btnStartWraper.setAttribute('disabled', '');