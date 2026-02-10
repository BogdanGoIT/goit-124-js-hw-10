// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const dalayValue = Number(evt.target.elements.delay.value);
  const stateValue = evt.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(dalayValue);
      } else {
        reject(dalayValue);
      }
    }, dalayValue);
  });
  promise
    .then(delay => {
      console.log(delay);
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        color: 'green',
        position: 'topRight',
      });
    })
    .catch(delay => {
      console.log(delay);
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        color: 'red',
        position: 'topRight',
      });
    });

  console.log(promise);
}
