var Redoid = require('redoid');

var redoid = Redoid({
    color: '#7db8ec'
});

if (redoid.isColorValid('#ffffff')) {
    console.log('weiß geht');
} else {
    console.log('weiß geht nicht');
}

console.log('klappte');
