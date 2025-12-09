import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = null;

const refs = {
    startBtn: document.querySelector('[data-start]'),
    daysElem: document.querySelector('[data-days]'),
    hoursElem: document.querySelector('[data-hours]'),
    minutesElem: document.querySelector('[data-minutes]'),
    secondsElem: document.querySelector('[data-seconds]'),
    inputElem: document.querySelector('#datetime-picker'),
}

refs.startBtn.disabled = true;

function addZero(data) {
    return String(data).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function timeUpdate({ days, hours, minutes, seconds }) {
    refs.daysElem.textContent = addZero(days);
    refs.hoursElem.textContent = addZero(hours);
    refs.minutesElem.textContent = addZero(minutes);
    refs.secondsElem.textContent = addZero(seconds);
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            refs.startBtn.disabled = true;
             iziToast.show({
                title: 'Error',
                message: 'Please choose a date in the future',
                color: 'red',
                position: 'topRight',
      });
        } else {
            refs.startBtn.disabled = false;
            userSelectedDate = selectedDate;
        }
    },  
};

flatpickr(refs.inputElem, options);

refs.startBtn.addEventListener('click', () => {
    if (!userSelectedDate) return;
    
    refs.startBtn.disabled = true;
    refs.inputElem.disabled = true;

    const timerId = setInterval(() => {
        const currentDate = new Date();
        const deltaTime = userSelectedDate - currentDate;

        if (deltaTime <= 0) {
        clearInterval(timerId);
        timeUpdate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        refs.inputElem.disabled = false;
        refs.startBtn.disabled = false;
        return;
    }
 
    const timeComponents = convertMs(deltaTime);
    timeUpdate(timeComponents);
    },1000)


});
