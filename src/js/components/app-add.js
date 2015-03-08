/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');

var Add = React.createClass({

	getInitialState: function() {
		return  {
			validTitle : false,
			validPrice : false,
		}
	},

	titleChange: function() {
		var text =  this.refs.title.getDOMNode().value;
		if (text.length > 3) {
			this.setState({validTitle : true});
		} else {
			this.setState({validTitle : false});
		}
	},

	priceChange: function() {
		var price =  this.refs.price.getDOMNode().value;
		if (!isNaN(price) && price.length) {
			this.setState({validPrice : true});
		} else {
			this.setState({validPrice : false});
		}
	},

	handleSubmit: function() {
		var title = this.refs.title.getDOMNode().value;
		var price = this.refs.price.getDOMNode().value;

		AppActions.addItem({
			id: Math.floor(Math.random() * 10000),
			title: title,
			price: price
		});

		return false;
	},

  getTitleClass : function() {
    var classes = 'input-group';
    if (!this.state.validTitle) {
      classes += ' has-error';
    }

    return classes;
  },

  getPriceClass : function() {
    var classes = 'input-group';
    if (!this.state.validPrice) {
      classes += ' has-error';
    }

    return classes;
  },

	render: function() {

		var self = this;

		return (
			<form class='form' onSubmit={this.handleSubmit}>
				<table>
					<tr>
						<td>
							<div className={this.getTitleClass()} style={{width:'100%', 'margin-bottom':'5px'}}>
 								<span className={'input-group-addon'}>Title</span>
								<input ref='title' onChange={this.titleChange} type='text' className={'form-control'} aria-label='Amount (to the nearest dollar)' />
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={this.getPriceClass()}>
 								<span className={'input-group-addon'}>$</span>
								<input ref='price' onChange={this.priceChange} type='text' className={'form-control'} aria-label='Amount (to the nearest dollar)' />
								<span className={'input-group-addon'}>.00</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
						{
							(this.state.validPrice && this.state.validTitle)
								? <input style={{float: 'right'}} type='submit' value='Submit' className={'btn'}/>
								: null
						 }
						</td>
					</tr>
				</table>
			</form>
		);
	}
});

module.exports = Add;
