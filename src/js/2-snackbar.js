import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


 
form.addEventListener('submit', (event) => {
event.preventDefault();

const delay = Number(form.elements.delay.value);
const state = form.elements.state.value;

const createPromise = new Promise((resolve, reject)=>{
        setTimeout(()=> {
            if (state === 'fulfilled'){
                resolve(delay);
            }
            else {
                reject(delay);
            }
        }, delay);
    });

    createPromise
        .then((delay) => {
            console.log(`✅ Fulfilled promise in ${delay}ms`);
            iziToast.success({
                title: 'Success',
                message: `Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch((delay) => {
            console.log(`❌ Rejected promise in ${delay}ms`);
            iziToast.error({
                title: 'Error',
                message: `Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        })

        form.reset();
});
