import React from 'react';

const Selector = ({select, rotateDisplay, people, selectedPerson}) => (
  <div data-testid="selector" id="selector" className="col align-center m-4">
    <div id="people" className="row row-1 justify-content-center m-2">
      {
        people.map((person, i) => (
          <button data-testid="person" id={i} key={i} className={`btn ${person.name === selectedPerson ? 'btn-secondary' : 'btn-outline-secondary'} btn-lg m-1`} onClick={select}>{person.name}</button>
        ))
      }
    </div>
    <div id="scroll-buttons" className="row row-1 justify-content-center">
      <button id="left-button" className="btn btn-primary m-2 col-1" value="left" onClick={rotateDisplay}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button id="right-button" className="btn btn-primary m-2 col-1" value="right" onClick={rotateDisplay}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
);

export default Selector;