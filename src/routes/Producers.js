import React, { Component } from 'react';

//let db = [{title: "Administrar",Id:"17"},{title: "Listado",Id:"13"},{title: "Sam",Id:"11"}]

import ProducerBox from '../components/producers/ProducerBox'

export default class Producers extends Component {

    constructor(){
        super();
        this.state = { content:"Contenidos"}
    }

      onManagerProducer(){
            let producerBox = <ProducerBox  />

            this.setState({content: producerBox});
      }
      onListProducer(){
            this.setState({content: "Listado"});
      }
    render() {
        return (
                  <div id="app">
                      <div id="header_local">
                          <div class="title">Productores</div>
                      </div>

                      <div id="browser_tabs">
                          <div class="tab" onClick={this.onManagerProducer.bind(this)}>
                              <div class="label">Administrar</div>
                          </div>
                          <div class="tab" onClick={this.onListProducer.bind(this)}>
                              <div class="label">Listado</div>
                          </div>
                      </div>

                      <div id="content">{this.state.content}</div>

                  </div>
        );
    }
}
