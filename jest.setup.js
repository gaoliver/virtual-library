import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {jest} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// Icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'Icon');
