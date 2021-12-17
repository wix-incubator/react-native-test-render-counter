const React = require('react');

function mockComponent(name) {
  return class extends React.PureComponent {
    static displayName = name;
    render() {
      return React.createElement(name, this.props);
    }
  };
}

jest.mock('react-native', () => {
  const UI = jest.requireActual('react-native');

  const mocks = {
    View: mockComponent('View'),
    Button: mockComponent('Button'),
    TextInput: mockComponent('TextInput'),
  };

  return new Proxy(UI, {
    get(obj, key) {
      return key in mocks ? mocks[key] : obj[key];
    },
  });
});
