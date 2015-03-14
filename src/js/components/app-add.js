import React from 'react'
import AppActions from '../actions/app-actions.js'
import AppStore from '../stores/app-store.js';

class Add extends React.Component {
  constructor() {
    super();
    this.titleChange.bind(this);
    this.priceChange.bind(this);
    this.getTitleClass.bind(this);
    this.getPriceClass.bind(this);
    this.handleSubmit.bind(this);
    this.render.bind(this);

    this.state = {
			validTitle : false,
			validPrice : false,
    }
  }

	titleChange() {
		var text =  this.refs.title.getDOMNode().value;
		if (text.length > 3) {
			this.setState({validTitle : true});
		} else {
			this.setState({validTitle : false});
		}
	}

	priceChange() {
		var price =  this.refs.price.getDOMNode().value;
		if (!isNaN(price) && price.length) {
			this.setState({validPrice : true});
		} else {
			this.setState({validPrice : false});
		}
	}

	handleSubmit() {
		var title = this.refs.title.getDOMNode().value;
		var price = this.refs.price.getDOMNode().value;

		AppActions.addItem({
			id: Math.floor(Math.random() * 10000),
			title: title,
			price: price
		});

		return false;
	}

  getTitleClass() {
    var classes = 'input-group';
    if (!this.state.validTitle) {
      classes += ' has-error';
    }

    return classes;
  }

  getPriceClass() {
    var classes = 'input-group';
    if (!this.state.validPrice) {
      classes += ' has-error';
    }

    return classes;
  }

	render() {

		var self = this;

		return (
			<form class='form' onSubmit={this.handleSubmit.bind(this)}>
				<table>
					<tr>
						<td>
							<div className={this.getTitleClass.call(this)} style={{width:'100%', 'margin-bottom':'5px'}}>
 								<span className={'input-group-addon'}>Title</span>
								<input ref='title' onChange={this.titleChange.bind(this)} type='text' className={'form-control'} aria-label='Amount (to the nearest dollar)' />
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div className={this.getPriceClass()}>
 								<span className={'input-group-addon'}>$</span>
								<input ref='price' onChange={this.priceChange.bind(this)} type='text' className={'form-control'} aria-label='Amount (to the nearest dollar)' />
								<span className={'input-group-addon'}>.00</span>
							</div>
						</td>
					</tr>
					<tr>
						<td>
						{
							(this.state.validPrice && this.state.validTitle) ? 
              <input style={{float: 'right'}} type='submit' value='Submit' className={'btn'}/>
								: null
						 }
						</td>
					</tr>
				</table>
			</form>
		);
	}
}

export default Add;
