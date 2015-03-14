import React from 'react';
import AppActions from '../actions/app-actions.js';
import AppStore from '../stores/app-store.js';
import Add from '../components/app-add.js';

var getAll = function() {

	return {
		items: AppStore.getAll()
	}
}

class AppMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = getAll();
  }

	componentDidMount() {
		AppStore.addChangeListener(this._onChange.bind(this));
	}

	componentWillUnmount() {
		AppStore.removeChangeListener(this._onChange.bind(this));
	}

	handleClick() {
		AppActions.addItem({
			title: 'this is the item',
			price:5
		});
	}

	removeItem(index) {
		AppActions.removeItem(index);
	}

	render(){
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
  	}

    _onChange() {
      this.setState(getAll());
	}
}

export default AppMain;
