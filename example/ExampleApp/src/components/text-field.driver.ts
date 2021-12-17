import {testIDs} from '../testIDs';
import {TextField} from './text-field';
import {componentDriver} from 'react-component-driver';

export function textFieldDriver(props = {}) {
  return componentDriver(TextField, {
    invokeOnChangeText(text: string) {
      return this.getByID(testIDs.TEXT_FIELD)?.props.onChangeText(text);
    },
  }).setProps(props);
}

export function textFieldOptimisedDriver(props = {}) {
  return componentDriver(TextField, {
    invokeOnChangeText(text: string) {
      return this.getByID(testIDs.TEXT_FIELD_OPTIMISED)?.props.onChangeText(
        text,
      );
    },
  }).setProps(props);
}
