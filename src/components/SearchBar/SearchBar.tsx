import {Input, Icon, IInputProps} from 'native-base';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export const SearchBar: React.FC<IInputProps> = ({...props}) => {
  const [isOnFocus, setIsOnFocus] = useState(false);

  return (
    <Input
      placeholder="Search People & Places"
      width="100%"
      borderRadius="10"
      py="3"
      px="1"
      fontSize="14"
      onFocus={() => setIsOnFocus(true)}
      onBlur={() => setIsOnFocus(false)}
      _focus={{
        bgColor: 'white',
      }}
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="4"
          color={isOnFocus ? 'gray.400' : 'white'}
          as={<FontAwesome name="search" />}
        />
      }
      {...props}
    />
  );
};
