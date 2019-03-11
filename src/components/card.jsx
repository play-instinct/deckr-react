import React from 'react';


export default function Card(props) {
    return (
        <div className="card">
                <div className= "front">
                    <img src="./card-back.png" alt="Deckr" class="card-img"/>
                </div>
                <div className="back">
                    <img src="${image_url}" class="card-img"/>
                </div>
       </div>
    );
};

Card.defaultProps = {
    image_url: ''
};
