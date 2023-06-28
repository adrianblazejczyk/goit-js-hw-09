/*---------------------------------------------------------------------------------------------------------------- */
import Notiflix from 'notiflix';
/*---------------------------------------------------------------------------------------------------------------- */
const bntSubmit = document.querySelector('[type=submit]');
const formWraper = document.querySelector('.form');
/*---------------------------------------------------------------------------------------------------------------- */
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const obiekt = {
        position: position,
        delay: delay,
      };
      if (shouldResolve) {
        resolve(obiekt);
      } else {
        reject(obiekt);
      }
    }, delay);
  });
}
function submitForm(eve) {
  eve.preventDefault();
  const delay = Number(formWraper.delay.value);
  const delayStep = Number(formWraper.step.value);
  const amout = Number(formWraper.amount.value);

  for (let index = 0; index < amout; index++) {
    createPromise(index + 1, delay + delayStep * index)
      .then(obiekt => {
        Notiflix.Notify.success(
          `Fulfilled promise ${obiekt.position} in ${obiekt.delay} ms`
        );
      })
      .catch(obiekt => {
        Notiflix.Notify.failure(
          `Rejected promise ${obiekt.position} in ${obiekt.delay} ms`
        );
      });
  }
}

/*---------------------------------------------------------------------------------------------------------------- */
bntSubmit.addEventListener('click', submitForm);

