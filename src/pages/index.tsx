import Head from 'next/head';
import Navbar from '../common/sharable/Navbar';
import { Box } from '@chakra-ui/react';
import Introduction from '../common/Introduction';

const Home: React.FC<{ props: any }> = (props) => {

  return (
    <div>
      <Head>
        <title>RomaTre Personality Survey</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box height="100vh" alignItems="center" justifyContent="center" className="page-box-ext">
          <Box background="gray.100" p={12} rounded={6} className="page-box-int">
            <Navbar />
            <Introduction />
          </Box>
        </Box>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default Home;