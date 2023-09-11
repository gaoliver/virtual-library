import React, {useState} from 'react';
import {AspectRatio, Center} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SearchBar} from '@/components';
import {RootStackParamList} from 'App';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';

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
        <FastImage
          style={styles.logo}
          source={logo}
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

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '100%',
  },
});
