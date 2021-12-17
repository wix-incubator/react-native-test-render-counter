import React from 'react';
import {View, TextInput} from 'react-native';
import {testIDs} from '../testIDs';

interface TextFieldProps {
  onChangeText?: (text: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({onChangeText}) => {
  return (
    <View style={{margin: 20, borderWidth: 1}}>
      <TextInput
        testID={testIDs.TEXT_FIELD}
        placeholder="Enter Text Here"
        style={{padding: 10}}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export const TextFieldOptimised: React.FC<TextFieldProps> = React.memo(
  ({onChangeText}) => {
    return (
      <View style={{margin: 20, borderWidth: 1}}>
        <TextInput
          testID={testIDs.TEXT_FIELD_OPTIMISED}
          placeholder="Enter Text Here"
          style={{padding: 10}}
          onChangeText={onChangeText}
        />
      </View>
    );
  },
);
