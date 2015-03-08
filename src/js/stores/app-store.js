var AppDispatcher = require('../dispatchers/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/app-constants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var items = [
	{
		id    : 1,
		title : 'hello',
		price : 1
	},
	{
		id    : 	2,
		title : 'test',
		price : 	2
	},
	{
		id    : 3,
		title : 'fuck',
		price : 3
	},
]

function addItem(item) {
	items.push(item);
}

function removeItem(index) {
	items.splice(index, 1);
}

var AppStore = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return items;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case AppConstants.ADD_ITEM:
			if (action.item) {
				addItem(action.item);
				AppStore.emitChange();
			}

			break;
		case AppConstants.REMOVE_ITEM:
			if (action.index >= 0) {
				removeItem(action.index);
				AppStore.emitChange();
			}

			break;
	}
});

module.exports = AppStore;
