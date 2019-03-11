import React, { Component } from 'react'
import './App.css'
import cardBack from './card-back.png';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';



//post-code/refactor thoughts: 


// i approched this with as much simplicity in mind and decided it was easier to just set up a 1 stateful
//component as opposed to multipls with passing props. another way to structure this would be to have 3 separate components 
//for the cards, the card-board, and the button, and use redux for better API response management


//I am unsatisifed with the resulting css transition effect - I need to read more about proper management of css transitions with react
//transition groups (https://reactjs.org/docs/animation.html)



//create intial state to clear data easily 

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

  //could also set to intiial state

  loadBoard() {
    this.setState({
        error: null,
        loading: true,
        current_cards: []
    });
  }

  //simple conditional that checks for whether this action was triggered before/
  //if the state was changed


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

   //simple conditional that checks for an error state from api, 'loading state' (not really best terminology here)

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
             //if there is no error, some data is here from the API, lets loop thru our state.cards and make some markup

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


