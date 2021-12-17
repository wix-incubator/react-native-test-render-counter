import {MainDemoScreen} from './main';
import {componentDriver} from 'react-component-driver';
import {
  startRenderCounter,
  stopRenderCounter,
} from 'react-native-test-render-counter';
import {testIDs} from '../testIDs';
import {postDriver} from '../components/post.driver';
import {
  textFieldDriver,
  textFieldOptimisedDriver,
} from '../components/text-field.driver';

beforeEach(() => {});

it('should render', () => {
  const component = driver();

  expect(component.render()).toBeDefined();
});

it('should validate render count of post content and like button during post like', () => {
  const {getRenderCountByTestID} = startRenderCounter();
  const component = driver().render();

  expect(getRenderCountByTestID(testIDs.POST_CONTENT)).toEqual(2);
  expect(getRenderCountByTestID(testIDs.POST_LIKE_BUTTON)).toEqual(2);

  component.getPostAt(0).pressLike();

  expect(getRenderCountByTestID(testIDs.POST_CONTENT)).toEqual(2);
  expect(getRenderCountByTestID(testIDs.POST_LIKE_BUTTON)).toEqual(3);

  stopRenderCounter();
});

it('should validate non optimised render count', () => {
  const {getRenderCountByTestID} = startRenderCounter();
  const component = driver().render();

  expect(getRenderCountByTestID(testIDs.TEXT_FIELD)).toEqual(1);
  expect(getRenderCountByTestID(testIDs.POST_VIEW)).toEqual(1);

  component.getTextField().invokeOnChangeText('Foo');
  component.getTextField().invokeOnChangeText('Foo Bar');

  expect(getRenderCountByTestID(testIDs.TEXT_FIELD)).toEqual(3);
  expect(getRenderCountByTestID(testIDs.POST_VIEW)).toEqual(3);

  stopRenderCounter();
});

it('should validate optimised render count', () => {
  const {getRenderCountByTestID} = startRenderCounter();
  const component = driver().render();

  expect(getRenderCountByTestID(testIDs.TEXT_FIELD_OPTIMISED)).toEqual(1);
  expect(getRenderCountByTestID(testIDs.POST_VIEW_OPTIMISED)).toEqual(1);

  component.getTextFieldOptimised().invokeOnChangeText('Foo');
  component.getTextFieldOptimised().invokeOnChangeText('Foo Bar');

  expect(getRenderCountByTestID(testIDs.TEXT_FIELD_OPTIMISED)).toEqual(1);
  expect(getRenderCountByTestID(testIDs.POST_VIEW_OPTIMISED)).toEqual(1);

  stopRenderCounter();
});

function driver(props = {}) {
  return componentDriver(MainDemoScreen, {
    getTextField() {
      return textFieldDriver().attachTo(this.getByID(testIDs.TEXT_FIELD));
    },
    getTextFieldOptimised() {
      return textFieldOptimisedDriver().attachTo(
        this.getByID(testIDs.TEXT_FIELD_OPTIMISED),
      );
    },
    getPostAt(index: number) {
      return postDriver().attachTo(this.filterByID(testIDs.POST_VIEW)[index]);
    },
  }).setProps(props);
}
