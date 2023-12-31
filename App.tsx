/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Icon, NativeBaseProvider} from 'native-base';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '@/theme/colors';
import {Platform} from 'react-native';
import {AllUserBooks} from '@/screens/AllUserBooks';

export type RootStackParamList = {
  Home: undefined;
  SearchResults: {query: string};
};

export type RootBottomParamList = {
  SearchNavigator: NavigatorScreenParams<RootStackParamList>;
  Favourites: undefined;
  ReadingList: undefined;
  AllUserBooks: undefined;
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
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.secondary,
        ...(Platform.OS === 'android' && {
          height: 60,
          paddingTop: 5,
          paddingBottom: 10,
        }),
      },
      tabBarInactiveTintColor: colors.white,
      tabBarActiveTintColor: colors.primary,
    }}>
    <Tab.Screen
      name="SearchNavigator"
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <Icon
            color={color}
            size={size}
            as={<MaterialCommunityIcons name="home" />}
          />
        ),
      }}
      component={SearchNavigation}
    />
    <Tab.Screen
      name="Favourites"
      component={Favourites}
      options={{
        tabBarIcon: ({color, size}) => (
          <Icon
            color={color}
            size={size}
            as={<MaterialCommunityIcons name="heart" />}
          />
        ),
      }}
    />
    <Tab.Screen
      name="ReadingList"
      options={{
        tabBarLabel: 'Reading List',
        tabBarIcon: ({color, size}) => (
          <Icon
            color={color}
            size={size}
            as={<MaterialCommunityIcons name="bookmark" />}
          />
        ),
      }}
      component={ReadingList}
    />
    <Tab.Screen
      name="AllUserBooks"
      options={{
        tabBarLabel: 'My Books',
        tabBarIcon: ({color, size}) => (
          <Icon
            color={color}
            size={size}
            as={<MaterialCommunityIcons name="book-multiple" />}
          />
        ),
      }}
      component={AllUserBooks}
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
        <NativeBaseProvider theme={theme} isSSR={false}>
          <Navigation />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
