var Page = require('../lib/astrolabe').Page;

module.exports = Page.create({

    url: { value: 'http://www.angularjs.org' },

    yourName: { get: function() { return this.findElement(this.by.model('yourName')) } },

    greeting: { get: function() { return this.findElement(this.by.binding('yourName')); } },

    todo:     { get: function() { return this.findElement(this.by.repeater('todo in todoList.todos')); } }
});

//element.all(by.repeater('todo in todoList.todos'));
