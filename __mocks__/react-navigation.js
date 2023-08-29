// In __mocks__/react-navigation.js

export const useNavigation = jest.fn();
export const useRoute = jest.fn();

export const NavigationContainer = ({children}) => children;

export const createBottomTabNavigator = jest.fn(() => ({
  Navigator: jest.fn(() => null),
  Screen: jest.fn(() => null),
}));

export const createNativeStackNavigator = jest.fn(() => ({
  Navigator: jest.fn(() => null),
  Screen: jest.fn(() => null),
}));
