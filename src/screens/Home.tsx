import React from 'react';
import {Box, HStack, Heading} from 'native-base';
import {spaces} from '@/constants/spaces';
import {BookCard} from '@/components';

export const Home = () => {
  return (
    <Box flex={1}>
      <HStack safeAreaTop px={spaces.screenWidth} bgColor="secondary">
        <Heading color="white">Home</Heading>
      </HStack>

      <Box px="5" mt="4">
        <BookCard />
      </Box>
    </Box>
  );
};
