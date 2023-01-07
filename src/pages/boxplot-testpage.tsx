import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>QuizApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main><Navbar /></main>
      <footer></footer>
    </div>
  );