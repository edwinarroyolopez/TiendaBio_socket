import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './routes/App';
import Home from './routes/Home';
import Sign from './routes/Sign';
import Producers from './routes/Producers';

const universe = document.getElementById('universe');

ReactDOM.render((
                    <BrowserRouter>
                          <div>
                                <Route  path="/" component={App} />
                                <Route path="/Home" component={Home}/>
                                <Route path="/Sign" component={Sign}/>
                                <Route path="/Producers" component={Producers}/>
                          </div>
                     </BrowserRouter>
),universe)
