/** @jsx React.DOM */
var React = require('react');
var AddMain = require('../components/app-main.js');

var APP = React.createClass({
	render: function() {
		return (
			<div>
				<AddMain/>
			</div>
			);
  	},
});

module.exports = APP;
