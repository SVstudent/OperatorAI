import { Badge, Box, chakra, Link, Container, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { SiDevpost } from 'react-icons/si';

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export function Footer() {
  return (
    <Box bg="gray.900" color="gray.300" borderTop="2px solid" borderColor="red.600">
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <chakra.h1 textAlign={'left'} fontSize={'2xl'} fontWeight={'bold'} color="red.400">
          OperatorAI
          <Badge ml={2} mt={-5} fontSize="0.35em" colorScheme="red" bg="red.600">
            LIVE
          </Badge>
        </chakra.h1>
        <Text align={'center'} color="gray.300">
          Created by Sathvik Vempati - AI-Powered Emergency Call System
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Github'} href={'https://github.com/sathvikvempati'}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
