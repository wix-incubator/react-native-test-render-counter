# react-native-test-render-counter
Testing utility to track components render count in React Native applications


# Proposal
Unnessesary Component re-renders is one of the most impactful performane issue in React Native applications, because most of the times in results in visible flicker, or not responding UI which makes the app not feel native. With the rise of React hooks, now it's easy to make not optized hooks, or just misuse them, which result in re-renders.

It's not hard to fix those performance problems, but it's difficult not to break these optimisations later, since there is nothing preventing a developer from doing so, in most cases performance degradation was not intended.

The general idea is to optimise rendering in your application and then "lock" render count in unit tests, so if a developer makes changes that change renderting count, whether it was intended or not, it will notify with failing test. With such tests we can make sure our rendering performance is not degrading while writhing futher code and more features.

# Prerequisites
- React Native in typescript
- ts-jest
- react-component-driver
### **Test Example:**
Let's say we have a Post component, which renders content and like button. So if we wanted to test render count during press on like action, then idealy like button should render two times, but the content only once.


```ts
    it('should validate render count during like action', async () => {
        const {getRenderCountByTestID} = startRenderCounter();
        const component = driver().render();

        expect(getRenderCountByTestID(testIDs.POST_CONTENT)).toEqual(2);
        expect(getRenderCountByTestID(testIDs.POST_LIKE_BUTTON)).toEqual(2);

        component.getPostAt(0).pressLike();

        expect(getRenderCountByTestID(testIDs.POST_CONTENT)).toEqual(2);
        expect(getRenderCountByTestID(testIDs.POST_LIKE_BUTTON)).toEqual(3);

        stopRenderCounter();
    });
```

### **Jest Config:**
In order to track render count with testID prop, we need to make sure each react element is rendered once, i.e. rendered shallowly so it does not have any more children with the same name. We need to mock all react-native components that are used for render count:
```js
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

```