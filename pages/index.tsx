import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer/footer';
import List from '../components/list/list';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SubReddit</title>
        <meta name="description" content="A Reddit client that shows posts for subreddits" />
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <Navbar />
      <div className="relative bg-gray-100 pt-24 lg:pt-28 pb-16 min-h-screen">
        <main>
          <List />
        </main>
        <Footer />
      </div>
    </div>
  )
};

export default Home;
