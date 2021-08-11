import { showCondolences } from "./datamanagement.js";


const showMessage = () => {
  const showCard = document.getElementById('showCondolences');
  console.log(showCondolences())
  showCard.addEventListener('load', showCondolences());
}
showMessage();
