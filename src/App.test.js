import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

test('Link changes the class when hovered', () => {
  const component = renderer.create(<App/>);

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.fetchMessage();
  // re-rendering
  tree = component.toJSON();

  expect(tree).toMatchSnapshot();
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
