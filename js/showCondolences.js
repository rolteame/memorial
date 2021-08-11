import { sendCondolence, showCondolences } from "./datamanagement.js";


const showMessage = () => {
  const showCard = document.getElementById('showCondolences');
  console.log(showCondolences())
  showCard.addEventListener('load', showCondolences());
}
showMessage();

const sendMessage = () => {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', sendCondolence);
}
