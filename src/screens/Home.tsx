import React, {useState} from 'react';
import {AspectRatio, Center, Image} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SearchBar} from '@/components';
import {RootStackParamList} from 'App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const Home: React.FC<HomeProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const logo = require('@assets/images/Virtual_Library-logos_white.png');

  const handleSearch = () => {
    navigation.navigate('SearchResults', {
      query: searchQuery,
    });

    setSearchQuery('');
  };

  return (
    <Center safeArea flex={1} bgColor="secondary" px={12}>
      <AspectRatio ratio={30 / 17} w="200px">
        <Image
          w="100%"
          h="100%"
          source={logo}
          alt="Virutal Library logo"
          testID="virtual-library-logo"
        />
      </AspectRatio>

      <SearchBar
        mt={4}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onBlur={handleSearch}
        testID="searchbar"
      />
    </Center>
  );
};
