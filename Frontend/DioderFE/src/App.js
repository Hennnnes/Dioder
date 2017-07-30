import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
          isOn: false
      }

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const isOn = event.target.checked;
        this.setState({ isOn });

        var xhr = new XMLHttpRequest();

        const url = (isOn) ? 'http://localhost:8080/api/stop' : 'http://localhost:8080/api/start';

        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ isOn }));

        console.log('now on');
    }

    render() {
        return (
          <div className="App">
              <h1>Dioder</h1>

              <form>

                <input type="checkbox" name="isOn" onChange={this.handleChange} checked={this.state.isOn}/>


                <label htmlFor="on">An / Aus</label>

              </form>
          </div>
        );
    }
}

export default App;
