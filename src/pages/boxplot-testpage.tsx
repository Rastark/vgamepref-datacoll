import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import HighchartsRadar from '../common/highcharts/HighchartsRadar';
import HighchartsTest from '../common/highcharts/HighchartsTest';
import Navbar from '../common/sharable/Navbar';

const boxplot_testpage = (props: any) => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
    <Flex direction="column" background="gray.100" p={12} rounded={6}>
      {/* <HighchartsTest /> */}
      <HighchartsRadar />
    </Flex>
    </Flex>
  );
}

export default boxplot_testpage;