import './css/styles.css';
import Notiflix from 'notiflix';


const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const country_list = document.querySelector(`.country-list`)
const country_info = document.querySelector(`.country-info`)
const input = document.querySelector(`#search-box`);
input.addEventListener(`input`, debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    if (input.value.trim() === "") {
         Notiflix.Notify.failure(
            "Oops, there is no country with that name")
     
     return
    }
    fetchCountries(e.target.value.trim())
    .then(data => createMarkup(data)).catch(console.error())

    
};

function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/`
    const FILTER_RESPONSE = `?fields=name,flags,name,capital,population,languages`
  
   return fetch(`${BASE_URL}${name}${FILTER_RESPONSE}`)
    .then(resp => {if (!resp.ok) {
        throw new Error(Notiflix.Notify.failure(
        "Oops, there is no country with that name"));   
    }
    
    const data = resp.json();
    return data;
})
.then(data => {if (data.length >= 10) { 
    throw new Error(Notiflix.Notify.info(
            "Too many matches found. Please enter a more specific name."))
    }
    return data
}); ;};


    function createMarkup(data) 
     { if (data.length < 10 && data.length > 1) {
        const listMarkup = 
        data.map(({flags, name}) => {
            console.log(`${flags.svg}`);
            console.log(`${name.official}`);
            const string =
        
            `<li class="item">
                <img class="img-list" src="${flags.svg}" alt="${name.official}">
                <h2>${name.official}</h2>
                </li>`;
                return string  
         }
        )
        .join(` `);
    
        country_list.insertAdjacentHTML(`beforeend`, listMarkup)
    }
        else { const listMarkup = 
        data.map(({flags, name, capital, population, languages
        }) => {
            console.log(`${flags.svg}`);
            console.log(`${name.official}`);
            const string =
            `   <img class="img" src="${flags.svg}" alt="${name.official}">
                <h2>${name.official}</h2>
                <h3>Capital : ${capital}</h3>
                <h3>population : ${population}</h3>
                <h3>languages : ${Object.values(languages)}</h3>
                `;
                return string  
         }
        )
        .join(` `);
    
        country_info.insertAdjacentHTML(`beforeend`, listMarkup)}
};


