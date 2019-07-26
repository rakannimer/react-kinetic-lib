import React from 'react';
import logo from './logo.png';
import { Flex } from 'theme-ui';
import { Link, useConfig } from 'docz';

import * as styles from './styles';

export const Logo = () => {
  const config = useConfig();
  return (
    <Flex aligmItems="center" sx={styles.logo}>
      <Link to="/" sx={styles.link}>
        <img src={logo} alt={config.title} />
      </Link>
    </Flex>
  );
};
