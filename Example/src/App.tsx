/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import SwipeCardExample from './SwipeCardExample';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <SwipeCardExample />
    </>
  );
}

export default App;
