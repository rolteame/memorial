import { sendCondolence, showCondolences } from "../js/datamanagement.js";


document.addEventListener('readystatechange', (event) => {
  if(event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  //submit the data
  const submit = document.getElementById('submit');
  submit.addEventListener('click', sendCondolence);
}