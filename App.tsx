import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {theme} from './src/theme';
import {persistor, store} from './src/Redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {Home} from './src/screens/Home';
import {BookProps} from './src/@types/models';
import {SearchResults} from './src/screens/SearchResults';
import {BookDetails} from './src/screens/BookDetails';
import {Favourites} from './src/screens/Favourites';
import {ReadingList} from './src/screens/ReadingList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  SearchResults: {query: string};
};

export type RootBottomParamList = {
  SearchNavigator: NavigatorScreenParams<RootStackParamList>;
  Favourites: undefined;
  ReadingList: undefined;
};

export type RootMainStackParamList = {
  TabNavigator: NavigatorScreenParams<RootBottomParamList>;
  BookDetails: {book: BookProps};
};

export type AppNavigationProp = NativeStackNavigationProp<
  RootMainStackParamList,
  'TabNavigator'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootBottomParamList>();
const MainStack = createNativeStackNavigator<RootMainStackParamList>();

const SearchNavigation = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="SearchResults" component={SearchResults} />
  </Stack.Navigator>
);

const TabNavigation = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen
      name="SearchNavigator"
      options={{tabBarLabel: 'Home'}}
      component={SearchNavigation}
    />
    <Tab.Screen name="Favourites" component={Favourites} />
    <Tab.Screen
      name="ReadingList"
      options={{tabBarLabel: 'Reading List'}}
      component={ReadingList}
    />
  </Tab.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="TabNavigator" component={TabNavigation} />
      <MainStack.Screen name="BookDetails" component={BookDetails} />
    </MainStack.Navigator>
  </NavigationContainer>
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={theme}>
          <Navigation />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
