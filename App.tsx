import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/theme';

const App = () => {
  return <NativeBaseProvider theme={theme} />;
};

export default App;
