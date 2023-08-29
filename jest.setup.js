import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler/jestSetup';
import {jest} from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Icons
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome5', () => 'Icon');
