import {extendTheme} from 'native-base';
import {colors} from './colors';

export const theme = extendTheme({
  colors,
});

declare module 'native-base' {
  interface ICustomTheme {
    colors: typeof colors;
  }
}
