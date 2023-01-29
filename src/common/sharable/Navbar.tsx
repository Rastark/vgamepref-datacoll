import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuth } from '../../lib/auth';

const Navbar: React.FC<{}> = () => {
  const { auth, signOut } = useAuth();
  const router = useRouter();

  return (
    <>
      <Flex justify="space-between" m={4}>
        <Heading onClick={() => router.push('/')} as="button">
          Welcome to our Recommender Platform!
        </Heading>
      </Flex> 
      <Divider
        css={{
          boxShadow: '1px 1px #888888',
        }}
      />
    </>
  );
};

export default Navbar;