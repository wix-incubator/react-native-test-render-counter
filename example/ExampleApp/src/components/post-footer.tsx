import React from 'react';
import {View, Text, Button} from 'react-native';
import {testIDs} from '../testIDs';

interface PostFooterProps {
  isLiked?: boolean;
}

export const PostFooter: React.FC<PostFooterProps> = ({isLiked}) => {
  const [liked, setLiked] = React.useState(isLiked);

  return (
    <View testID={testIDs.POST_FOOTER}>
      <Button
        testID={testIDs.POST_LIKE_BUTTON}
        title={liked ? '💖 Unlike' : '🤍 Like'}
        onPress={() => {
          setLiked(!liked);
        }}
      />
    </View>
  );
};
