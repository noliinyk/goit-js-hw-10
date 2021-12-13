import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import getRefs from './refs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryСard from './template/country-card.hbs';
import countriesSearch from './template/country-flag.hbs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();
refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const inputValue = e.target.value;
    if (inputValue === "") {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        return;
    }
    fetchCountries(inputValue.trim())
    .then(renderCountryView)
    .catch(onFetchError); 
}

function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
}

function renderCountryView(name) {
    if (name.length > 10) {
        refs.countryList.innerHTML = "";
        refs.countryInfo.innerHTML = "";
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    } else if (name.length <= 10 && name.length > 1) {
        renderCountryList(name)
    } else {
        renderCountryCard(name)
    };
}

function renderCountryCard(name) {
    refs.countryList.innerHTML = "";
    const markup = countryСard(name[0]);
        console.log(name[0]);
        console.log(markup);
        refs.countryInfo.innerHTML = markup;
}

function renderCountryList(name) {
    refs.countryInfo.innerHTML = "";
    const markup = countriesSearch(name);
    // console.log(markup);
    refs.countryList.innerHTML = markup;
}