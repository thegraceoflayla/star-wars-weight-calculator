import React from 'react';
import renderer from 'react-test-renderer';
import mockData from './mockData.js'
import Selector from '../Selector.jsx';

it('renders once props are recieved', (done) => {
  const selector = renderer.create(<Selector people={mockData} selectedPerson={'Luke Skywalker'} select={() => {}} rotateDisplay={() => {}} />);
  expect(selector).toMatchSnapshot();
  done();
});

it('displays people array prop as buttons', (done) => {
  const selector = renderer.create(<Selector people={mockData} selectedPerson={'Luke Skywalker'} select={() => {}} rotateDisplay={() => {}} />);
  let buttons = selector.toJSON().children[0].children;
  expect(buttons.every(button => button.type === 'button')).toBe(true);
  expect(buttons.every((button, i) => button.children[0] === mockData[i].name)).toBe(true);
  done();
});

it('emphasizes the currently selected person', (done) => {
  const selector = renderer.create(<Selector people={mockData} selectedPerson={'Luke Skywalker'} select={() => {}} rotateDisplay={() => {}} />);
  let buttons = selector.toJSON().children[0].children;
  let unselectedClass = 'btn-outline-secondary';
  let selectedClass = 'btn-secondary';
  let unselectedButtons = buttons.slice(1);
  expect(unselectedButtons.every(button => button.props.className.includes(unselectedClass))).toBe(true);
  expect(buttons[0].props.className.includes(selectedClass)).toBe(true);
  done();
});

it('calls select function when button is clicked', (done) => {
  let numberOfSelectCalls = 0;
  const selector = renderer.create(<Selector people={mockData} selectedPerson={'Luke Skywalker'} select={() => { numberOfSelectCalls++; }} rotateDisplay={() => {}} />);
  let buttons = selector.toJSON().children[0].children;
  buttons.forEach((button) => button.props.onClick());
  expect(numberOfSelectCalls).toBe(5);
  done();
});

it('calls rotateDisplay function when arrow button is clicked', (done) => {
  let rotateDisplayCalled = false;
  const selector = renderer.create(<Selector people={mockData} selectedPerson={'Luke Skywalker'} select={() => {}} rotateDisplay={() => { rotateDisplayCalled = true; }} />);
  expect(rotateDisplayCalled).toBe(false);
  selector.toJSON().children[1].children[0].props.onClick();
  expect(rotateDisplayCalled).toBe(true);
  done();
});