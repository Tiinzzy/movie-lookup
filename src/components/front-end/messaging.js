var ee = require('event-emitter');

var MyClass = function () { };
ee(MyClass.prototype);

export var emitter = new MyClass();

export const LISTENERS = {
    getHeader: () => document.getElementById('header-serach-box'),
    getSelectedGenre: () => document.getElementById('side-movies-box')
}



