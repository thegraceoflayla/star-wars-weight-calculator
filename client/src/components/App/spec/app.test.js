import React from 'react';
import { render, screen, act, waitFor, regeneratorRuntime, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import App from '../App.jsx';

it('shows loading message prior to initial API call', (done) => {
  const loading = renderer.create(<App />);
  expect(loading.toJSON().children[0]).toBe('Loading...');
  expect(loading).toMatchSnapshot();
  done();
});

it('renders after initial API call is complete', (done) => {
  const app = renderer.create(<App />);
  setTimeout(() => {
    expect(app.toJSON().children[0].children[0]).toBe('Luke Skywalker weighs 170 pounds on their homeworld of Tatooine.');
    expect(app).toMatchSnapshot();
    done();
  }, 2000);
});
