// Описаний в документації
import flatpickr from 'flatpickr';
// Описаний у документації
import iziToast from 'izitoast';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const dateTime = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

start.addEventListener('click', handlerClick);

function handlerClick(evt) {
  start.disabled = true;
}

let userSelectedDate;
start.disabled = true;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      userSelectedDate = selectedDates[0];

      start.disabled = false;

      intervalId = setInterval(() => {
        const endDate = userSelectedDate - new Date();

        const convertDate = convertMs(endDate);
        console.log(convertDate);

        const { days, hours, minutes, seconds } = convertDate;

        refs.seconds.textContent = seconds;
        refs.minutes.textContent = minutes;
        refs.hours.textContent = hours;
        refs.days.textContent = days;
      }, 1000);
    } else {
      start.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
      });
    }
  },
};

flatpickr(dateTime, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
