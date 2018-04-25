//var styles = {
//    color:'red'
//}

const contentNode = document.getElementById('contents');

const continents = ['Africa','Australia','North America', 'South America', 'Asia', 'Europe'];
const message = continents.map(c => `Hello ${c}!`).join(' ');

const component = <p>{message}</p>; //JSX component

//var component = <h1 style={styles}>Hello World</h1>;
ReactDOM.render(component, contentNode);