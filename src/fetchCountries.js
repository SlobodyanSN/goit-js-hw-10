export { fetchCountries };
import Notiflix from 'notiflix';

const BASE_URL = `https://restcountries.com/v3.1/name/`;
const FILTER_RESPONSE = `?fields=name,flags,name,capital,population,languages`;


function fetchCountries(name) {
   return fetch(`${BASE_URL}${name}${FILTER_RESPONSE}`)
    .then(resp => {if (!resp.ok) {
        throw new Error(Notiflix.Notify.failure(
        "Oops, there is no country with that name"));   
    }
    const data = resp.json();
    return data;
});};
