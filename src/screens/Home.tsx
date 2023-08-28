import React from 'react';
import {AspectRatio, Center, Image} from 'native-base';
import {SearchBar} from '@/components';

export const Home = () => {
  const logo = require('@assets/images/Virtual_Library-logos_white.png');

  return (
    <Center safeArea flex={1} bgColor={'secondary'} px={'12'}>
      <AspectRatio ratio={30 / 17} w={'200px'}>
        <Image w="100%" h="100%" source={logo} alt="Virutal Library logo" />
      </AspectRatio>

      <SearchBar mt={'4'} iconColor={'white'} />
    </Center>
  );
};
