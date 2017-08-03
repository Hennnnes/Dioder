import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);

	  this.state = {
		  baseURL: 'http://192.168.178.25:3000',
          isOn: false,
		  color: 'none',
		  error: false,
      }

	  this.handleChange = this.handleChange.bind(this);
      this.changeLightStatus = this.changeLightStatus.bind(this);
	  this.changeColor = this.changeColor.bind(this);
    }

	componentDidMount() {
		fetch(`${this.state.baseURL}/status`).then((response) => {
			return response.json();
		}).then((json) => {
			this.setState( {isOn: !json.error} );
		}).catch((err) => {
			console.log( err);
		});

		fetch(`${this.state.baseURL}/color`).then((response) => {
			return response.json();
		}).then((json) => {
			this.setState({color: json.color})
		}).catch((err) => {
			console.log( err);
		});
	}

	handleChange(event) {
	  this.setState({color: event.target.value});
	}

    changeLightStatus() {
		fetch(`${this.state.baseURL}/status`, {method: 'POST'}).then((response) => {
			this.setState( {isOn: !this.state.isOn} );
			return response.json();
		}).catch((err) => {
			console.log( err);
		});
    }

	changeColor(event) {
		fetch(`${this.state.baseURL}/color`, {
			method: 'POST',
			headers: {
    			'Content-Type': 'application/json'
  			},
			body: JSON.stringify({'color': this.state.color})
		}).then((response) => {
			return response.json();
		}).then((json) => {
			const error = (json.error) ? true : false;
			this.setState({ error })
		}).catch((err) => {
			console.log( err);
		});

		event.preventDefault();
	}

    render() {
        return (
          <div className="App">
              	<h1>Dioder</h1>

				<div className={"error " + (this.state.error ? '' : 'hidden')}>Fehler</div>

				<form onSubmit={this.changeColor}>
					<input type="text" value={this.state.color} placeholder={this.state.color} onChange={this.handleChange}/>
				</form>

				<button onClick={this.changeLightStatus} >{this.state.isOn ? 'ausschalten' : 'anschalten'}</button>
          </div>
        );
    }
}

export default App;
