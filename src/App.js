import React, { Component } from 'react'
import './App.css'
import cardBack from './card-back.png';
import bodyBg from './wood_pattern.png';

import axios from 'axios'


const initialState = {
  current_cards: [],
  error: null,
  loading: false
};


class App extends Component {
  constructor () {
    super()
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this)
  }
  

  componentDidMount() {
    this.loadBoard();
  }

  loadBoard() {
    this.setState({
        error: null,
        loading: true,
        current_cards: []
    });
  }

  handleClick () {
    if (this.state == initialState) {
      axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=5')
        .then(response => this.setState({
          current_cards: response.data.cards,
          loading: false
        })
      )
    }
    else {
      this.setState(initialState);
      axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=5')
        .then(response => this.setState({
          current_cards: response.data.cards,
          loading: false
        })
      )
    }
   
  }

  render () {
    let body;
        if (this.state.error) {
            body = (
                <div className="message message-error">{this.state.error}</div>
            );
        } else if (this.state.loading) {
            body = (
                <div className="message message-default">Click on the button to load 5 cards...</div>
            );
        } else {
              body = (
                <div className="card-container">
                     {this.state.current_cards.map(card => (
                      <div key={card.value} className="card">
                        <div className="front">
                          <img src={cardBack} alt="Deckr" className="card-img"/>
                        </div>
                        <div className="back">
                          <img src={card.image} alt={card.value} className="card-img"/>
                        </div>                        
                      </div>
                    ))}
                </div>
            )      
        }
    return (
      <div className= "main-container">
          <h1>Deckr</h1>
        <div className="test-div">
          {body}
        </div>
        <div className="card-control-panel">
          <button className='deal-cards-btn' onClick={this.handleClick}>Deal Cards</button>
        </div>
      </div>
    )
  }
}
export default App


