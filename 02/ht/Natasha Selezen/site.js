 var MAX_HISTORY_LENGTH = 5;
 var $$ = document.querySelector.bind(document);
 
 var historyCitiesSearch = void 0;
try {
    historyCitiesSearch = JSON.parse(localStorage.getItem(CITIES_SEARCH_HISTORY_KEY)) || [];
} catch (e) {
    historyCitiesSearch = [];
}
 
 function handleCity(city) {
     res = historyCitiesSearch.indexOf(city);
     if (res >= 0) {
         historyCitiesSearch.splice(res, 1);
     }
     historyCitiesSearch.unshift(city);
     historyCitiesSearch = historyCitiesSearch.slice(0, MAX_HISTORY_LENGTH);
     localStorage.setItem('historyCitiesSearch', JSON.stringify(historyCitiesSearch));
     window.location.hash = city;
 }
 
 function showWeather(city) {
     $$('#wf').innerHTML = 'Weather in ' + city;
 }
 
 function showHistory(list) {
    var html = '<ul>';
    for (var i = 0; i < list.length; i++) {
        html += '<li><a href="#' + list[i] + '">' + list[i] + '</a></li>';
    }
    html += '</ul>';
    $$('#history').innerHTML = html;
}
 
 $$('#search').addEventListener('submit', function (ev) {
     ev.preventDefault();
     var inputCity = ev.target.querySelector('input');
     handleCity(inputCity.value);
     inputCity.value = '';
 });
 
 function handler() {
     var cityName = window.location.hash.replace('#', '');
     if (cityName) {
         handleCity(cityName);
         showWeather(cityName);
     } 
     else {
         showWeather(historyCitiesSearch[0])
     }
     showHistory(historyCitiesSearch);
 }
 
 window.onhashchange = handler;
 handler();