var styles = {
    color: 'red'
};

var contentNode = document.getElementById('contents');
var component = React.createElement(
    'h1',
    { style: styles },
    'Hello World'
);
ReactDOM.render(component, contentNode);