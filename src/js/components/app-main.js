/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');
var Add = require('../components/app-add.js');

var getAll = function() {

	return {
		items: AppStore.getAll()
	}
}


var AppMain = React.createClass({

	getInitialState: function() {
		return getAll();
	},

	componentDidMount: function() {
		AppStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AppStore.removeChangeListener(this._onChange);
	},

	handleClick:function() {
		AppActions.addItem({
			title: 'this is the item',
			price:5
		});
	},

	removeItem: function(index) {
		AppActions.removeItem(index);
	},

	render: function(){
		var self = this;
		return (
			<div>
				<table style={{padding: "10px", width:'100%'}}>
          <thead>
            <th>
              Title
            </th>
            <th>
              Price ($)
            </th>
            <th>
            </th>
          </thead>
          <tbody>
					{this.state.items.map(function(item, i) {
								return (
									<tr>
                    <td>
                       {item.title}
                    </td>
                    <td>
                       {"$" + item.price}
                    </td>
                    <td>
                      <input type='button' value='remove' onClick={self.removeItem.bind(self, i)}/>
                    </td>
									</tr>);
						})
           }
           </tbody>
				</table>
				<Add/>
			</div>
			);
  	},

	_onChange: function() {
		this.setState(getAll());
	}
});

module.exports = AppMain;
