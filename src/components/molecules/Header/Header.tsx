import {spaces} from '@/constants/spaces';
import {useNavigation} from '@react-navigation/native';
import {Center, HStack, Heading, Icon, Pressable} from 'native-base';
import {InterfaceHStackProps} from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import React, {PropsWithChildren} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type HeaderProps = PropsWithChildren & {
  title?: string;
  hasGoBack?: boolean;
} & InterfaceHStackProps;

export const Header: React.FC<HeaderProps> = ({
  hasGoBack,
  title,
  children,
  ...props
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <HStack
      safeAreaTop
      bgColor="secondary"
      pb={2}
      px={spaces.screenWidth}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      _android={{
        pt: 2,
      }}
      {...props}>
      {hasGoBack && (
        <Pressable onPress={handleGoBack}>
          <Icon
            size={6}
            color="white"
            as={<MaterialIcons name="arrow-back" />}
          />
        </Pressable>
      )}

      {title ? (
        <Center flex={1}>
          <Heading color="white">{title}</Heading>
        </Center>
      ) : (
        children
      )}
    </HStack>
  );
};
