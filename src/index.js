import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from "react-intl";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import locale_en from "./Translations/en.json";
import locale_fr from "./Translations/fr.json";

const data = {
    'fr': locale_fr,
    'en': locale_en
  };
  
const language = navigator.language.split(/[-_]/)[0];
  

ReactDOM.render(
    <IntlProvider locale={language} messages={data[language]}>
        <App/>
    </IntlProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
