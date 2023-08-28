import {Input, Icon} from 'native-base';
import {IInputComponentType} from 'native-base/lib/typescript/components/primitives/Input/types';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export const SearchBar: IInputComponentType = ({...props}) => {
  return (
    <Input
      placeholder="Search People & Places"
      width="100%"
      borderRadius="10"
      py="3"
      px="1"
      fontSize="14"
      _focus={{
        bgColor: 'white',
      }}
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="4"
          color="gray.400"
          as={<FontAwesome name="search" />}
        />
      }
      {...props}
    />
  );
};
