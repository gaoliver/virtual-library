import {Input, Icon, IInputProps} from 'native-base';
import {InterfaceIconProps} from 'native-base/lib/typescript/components/primitives/Icon/types';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

type SearchBarProps = {
  iconColor?: InterfaceIconProps['color'];
} & IInputProps;

export const SearchBar: React.FC<SearchBarProps> = ({
  iconColor = 'gray.400',
  ...props
}) => {
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
          color={iconColor}
          as={<FontAwesome name="search" />}
        />
      }
      {...props}
    />
  );
};
