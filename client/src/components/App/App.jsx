import React from 'react';
import $ from 'jquery';
import Selector from '../Selector/Selector.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      selectedPerson: 0,
      displayStartIndex: 0,
      weight: null,
      planet: '',
      gravity: 1
    }
    this.updatePerson = this.updatePerson.bind(this);
    this.rotateSelection = this.rotateSelection.bind(this);
  }

  updatePerson(e) {
    this.setState((state) => {
      state.selectedPerson = Number(e.target.id) + state.displayStartIndex;
      return state;
    }, () => this.findWeight(this.state.people[this.state.selectedPerson].homeworld));
  }

  rotateSelection(e) {
    this.setState((state) => {
      if (e.target.value === 'left') {
        state.displayStartIndex = Math.max(state.displayStartIndex - 5, 0);
      } else {
        state.displayStartIndex = Math.min(state.displayStartIndex + 5, state.people.length - 5);
      }
      return state;
    })
  }

  findWeight(planetLink) {
    $.ajax({
      url: planetLink,
      type: 'GET',
      success: ({name, gravity}) => {
        this.setState((state) => {
          state.planet = name;
          let parsedGravity = gravity.length > 5 ? Number(gravity.slice(0, gravity.indexOf(' '))) : Number(gravity);
          let parsedMass = Number(state.people[state.selectedPerson].mass.replace(/,/g, ''));
          state.gravity = gravity !== 'N/A' && gravity !== 'unknown' ? parsedGravity : -1;
          state.weight = Math.round(Math.abs(state.gravity) * parsedMass * 2.205);
          return state;
        });
      }
    })
  }

  populatePeople(data) {
    this.setState((state) => {
      state.people = state.people.concat(data.results
        .map(({name, mass, homeworld}) => ({name, mass, homeworld}))
        .filter(person => person.mass !== 'unknown' && person.homeworld !== 'unknown')
      );
      return state;
    });

    if (data.next !== null) {
      $.ajax({
        url: data.next,
        type: 'GET',
        success: (results) => this.populatePeople(results)
      })
    }
  }

  componentDidMount() {
    $.ajax({
      url: 'https://swapi.dev/api/people',
      type: 'GET',
      success: (results) => {
        this.populatePeople(results);
        this.findWeight(results.results[0].homeworld);
      }
    })
  }

  render() {
    let {people, selectedPerson, weight, planet, displayStartIndex, gravity} = this.state;
    let currentSelection = people.slice(displayStartIndex, displayStartIndex + 5);
    let displayText = gravity > -1 ?
      `${people[selectedPerson]?.name} weighs ${weight} pounds on their homeworld of ${planet}.` :
      `Hmm, we don't know what the gravity is like on ${people[selectedPerson]?.name}'s homeworld, but here on Earth, they'd weigh ${weight} pounds.`

    return people[0] ? (
      <div id="app" className="col m-5" style={{'backgroundColor': 'rgba(220,220,220,.6)', 'borderRadius': '2vw'}}>
        <h1 id="info" className="text-center row-8 m-4">{displayText}</h1>
        <Selector
          people={currentSelection}
          selectedPerson={people[selectedPerson].name}
          select={this.updatePerson}
          rotateDisplay={this.rotateSelection}
        />
      </div>
    ) : (
      <div id="loading">Loading...</div>
    )
  }
}

export default App;