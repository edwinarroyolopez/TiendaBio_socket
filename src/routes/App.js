import React, { Component } from 'react';
import { Link  } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <nav id="browser">
        <ul>
          <li>
            <Link  to="/home">
              <div className="text">
                <div className="circle"></div>
                <div className="label">Home</div>
              </div>
            </Link>
          </li>
          <li>
            <Link  to="/sign">
              <div className="text">
                <div className="circle"></div>
                <div className="label">Sign</div>
              </div>
            </Link>
          </li>
          <li>
            <Link  to="/producers">
              <div className="text">
                <div className="circle"></div>
                <div className="label">Productores</div>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
export default App;
