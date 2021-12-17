import React from 'react';
import {View, Text} from 'react-native';
import {testIDs} from '../testIDs';

interface PostContentProps {
  contentText: string;
}

export const PostContent: React.FC<PostContentProps> = ({contentText}) => {
  return (
    <View
      testID={testIDs.POST_CONTENT}
      style={{padding: 4, alignItems: 'center'}}>
      <Text style={{fontSize: 22}}>{contentText}</Text>
    </View>
  );
};
