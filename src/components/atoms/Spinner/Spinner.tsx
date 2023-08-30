import React from 'react';
import {Platform} from 'react-native';
import {ISpinnerProps, Spinner as NBSpinner} from 'native-base';
import {colors} from '@/theme/colors';

export const Spinner = ({...props}: ISpinnerProps) => {
  return (
    <NBSpinner
      {...props}
      {...(Platform.OS === 'android' && {color: colors.secondary})}
    />
  );
};
