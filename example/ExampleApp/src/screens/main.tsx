import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {PostView, PostViewOptimised} from '../components/post';
import {TextField, TextFieldOptimised} from '../components/text-field';

export const MainDemoScreen = () => {
  const [_textInput, setTextInput] = React.useState('');

  const handleOnChangeText = (text: string) => {
    setTextInput(text);
  };

  const handleOnChangeOptimised = React.useCallback((text: string) => {
    setTextInput(text);
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <TextField onChangeText={handleOnChangeText} />
      <TextFieldOptimised onChangeText={handleOnChangeOptimised} />
      <ScrollView>
        <PostView contentText="Hello World" />
        <PostViewOptimised contentText="Foo Bar" />
      </ScrollView>
    </SafeAreaView>
  );
};
