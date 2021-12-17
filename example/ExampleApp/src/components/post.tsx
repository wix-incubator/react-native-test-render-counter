import React from 'react';
import {PostContent} from './post-content';
import {PostFooter} from './post-footer';
import {View} from 'react-native';
import {testIDs} from '../testIDs';

interface PostViewProps {
  contentText: string;
}

export const PostView: React.FC<PostViewProps> = ({contentText}) => {
  return (
    <View
      testID={testIDs.POST_VIEW}
      style={{margin: 20, borderWidth: 1, borderRadius: 5}}>
      <PostContent contentText={contentText} />
      <PostFooter />
    </View>
  );
};

export const PostViewOptimised: React.FC<PostViewProps> = React.memo(
  ({contentText}) => {
    return (
      <View
        testID={testIDs.POST_VIEW_OPTIMISED}
        style={{margin: 20, borderWidth: 1, borderRadius: 5}}>
        <PostContent contentText={contentText} />
        <PostFooter />
      </View>
    );
  },
);
