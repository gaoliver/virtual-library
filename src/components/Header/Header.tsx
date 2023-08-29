import {spaces} from '@/constants/spaces';
import {Center, HStack, Heading, Icon, Pressable} from 'native-base';
import React, {PropsWithChildren} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps extends PropsWithChildren {
  title?: string;
  hasGoBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({hasGoBack, title, children}) => {
  return (
    <HStack
      safeAreaTop
      bgColor={'secondary'}
      pb={'2'}
      px={spaces.screenWidth}
      w="100%"
      justifyContent={'space-between'}
      alignItems={'center'}>
      {hasGoBack && (
        <Pressable>
          <Icon
            size={'6'}
            color="white"
            as={<MaterialIcons name="arrow-back" />}
          />
        </Pressable>
      )}

      {title ? (
        <Center flex={1}>
          <Heading color={'white'}>{title}</Heading>
        </Center>
      ) : (
        children
      )}
    </HStack>
  );
};
