var styles = {
    color:'red'
}

var contentNode = document.getElementById('contents');
var component = <h1 style={styles}>Hello World</h1>;
ReactDOM.render(component, contentNode);