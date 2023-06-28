/*---------------------------------------------------------------------------------------------------------------- */
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

/*---------------------------------------------------------------------------------------------------------------- */
const inputData = document.querySelector('#datetime-picker');
// const timerWraper = document.querySelectorAll('.value');
const fromDays = document.querySelector('[data-days]');
const fromHours = document.querySelector('[data-hours]');
const fromMinutes = document.querySelector('[data-minutes]');
const fromSeconds = document.querySelector('[data-seconds]');
const btnStartWraper = document.querySelector('[data-start]');
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
  fromDays.textContent = addLeadingZero(time.days);
  fromHours.textContent = addLeadingZero(time.hours);
  fromMinutes.textContent = addLeadingZero(time.minutes);
  fromSeconds.textContent = addLeadingZero(time.seconds);
}

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  btnStartWraper.setAttribute('disabled', '');
  inputData.setAttribute('disabled', '');
  Notiflix.Notify.info('Start odliczania');
}
/*---------------------------------------------------------------------------------------------------------------- */
btnStartWraper.addEventListener('click', startTimer);
btnStartWraper.setAttribute('disabled', '');
flatpickr('#datetime-picker', options);