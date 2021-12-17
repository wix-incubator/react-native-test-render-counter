import {testIDs} from '../testIDs';
import {PostView} from './post';
import {componentDriver} from 'react-component-driver';

export function postDriver(props = {}) {
  return componentDriver(PostView, {
    likeButton() {
      return this.getByID(testIDs.POST_LIKE_BUTTON);
    },
    pressLike() {
      this.getByID(testIDs.POST_LIKE_BUTTON)?.props.onPress();
    },
  }).setProps(props);
}
