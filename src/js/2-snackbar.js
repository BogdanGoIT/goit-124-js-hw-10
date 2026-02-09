// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let { delay, state } = evt.target.elements;

  delay = Number(delay.value);
  state = state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(
          iziToast.show({
            message: `✅ Fulfilled promise in ${delay}ms`,
            color: 'green',
            position: 'topRight',
          })
        );
      } else {
        reject(
          iziToast.show({
            message: `❌ Rejected promise in ${delay}ms`,
            color: 'red',
            position: 'topRight',
          })
        );
      }
    }, delay);
  });

  promise
    .then(value => {
      return value;
    })
    .catch(error => {
      return error;
    });
}
