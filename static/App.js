'use strict';

//var styles = {
//    color:'red'
//}

var contentNode = document.getElementById('contents');

var continents = ['Africa', 'Australia', 'North America', 'South America', 'Asia', 'Europe'];
var message = continents.map(function (c) {
  return 'Hello ' + c + '!';
}).join(' ');

var component = React.createElement(
  'p',
  null,
  message
); //JSX component

//var component = <h1 style={styles}>Hello World</h1>;
ReactDOM.render(component, contentNode);