
// default url
const dflt = 'https://www.google.com';

const urlForCountry = new Map();
urlForCountry.set('us', 'https://www.google.com');
urlForCountry.set('jp', 'https://www.google.co.jp');
urlForCountry.set('uk', 'https://www.google.co.uk');
urlForCountry.set('es', 'https://www.google.es');
urlForCountry.set('ca', 'https://www.google.ca');
urlForCountry.set('de', 'https://www.google.de');
urlForCountry.set('it', 'https://www.google.it');
urlForCountry.set('fr', 'https://www.google.fr');
urlForCountry.set('nl', 'https://www.google.nl');
urlForCountry.set('be', 'https://www.google.be');
urlForCountry.set('dk', 'https://www.google.dk');
urlForCountry.set('ch', 'https://www.google.ch');
urlForCountry.set('cl', 'https://www.google.cl');
urlForCountry.set('at', 'https://www.google.at');
urlForCountry.set('ie', 'https://www.google.ie');
urlForCountry.set('pl', 'https://www.google.pl');
urlForCountry.set('pt', 'https://www.google.pt');
urlForCountry.set('in', 'https://www.google.co.in');
urlForCountry.set('kr', 'https://www.google.co.kr');
urlForCountry.set('tr', 'https://www.google.com.tr');
urlForCountry.set('br', 'https://www.google.com.br');
urlForCountry.set('au', 'https://www.google.com.au');
urlForCountry.set('tw', 'https://www.google.com.tw');
urlForCountry.set('gr', 'https://www.google.com.gr');
urlForCountry.set('mx', 'https://www.google.com.mx');
urlForCountry.set('ar', 'https://www.google.com.ar');
urlForCountry.set('co', 'https://www.google.com.co');
urlForCountry.set('pk', 'https://www.google.com.pk');

const getCountryUrl = (country_code) => {
    return (urlForCountry.get(country_code) || dflt);
};


exports.getCountryUrl = getCountryUrl;