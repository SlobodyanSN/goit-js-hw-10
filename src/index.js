import './css/styles.css';

// import { useDebounce } from "use-debounce";

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const input = document.querySelector(`#search-box`);
input.addEventListener(`input`, onInput);

function onInput (e) {
    console.log(e.eventTarget.value);
}
