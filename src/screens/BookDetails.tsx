import {Text} from 'react-native';
import React from 'react';
import {Box} from 'native-base';
import {Header} from '@/components';

export const BookDetails = () => {
  return (
    <Box flex={1}>
      <Header hasGoBack />
      <Text>BookDetails</Text>
    </Box>
  );
};
