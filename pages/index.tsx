import type { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../components/footer/footer';
import List from '../components/list/list';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import 'isomorphic-fetch';
import {
    ALL_POSTS,
    BASE_URL,
    isEmpty,
    serializeQuery,
    SUBREDDIT_PATH,
    SUFFIX,
} from '../utils';

interface IProps {
    postRes: models.IRedditResponse;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const query = context.query;
        let subreddit = query.s;

        if (isEmpty(subreddit)) {
            subreddit = ALL_POSTS;
        }

        delete query.s;

        const response = await fetch(
            `${BASE_URL}${SUBREDDIT_PATH}${subreddit}${SUFFIX}${serializeQuery(
                query
            )}`
        );

        const jRes: models.IRedditResponse = await response.json();

        return {
            props: {
                postRes: jRes,
            },
        };
    } catch (e) {
        return {
            props: {
                postRes: null,
            },
        };
    }
};

const Home: NextPage<IProps> = ({ postRes }: IProps) => {
    // const [posts, setPosts] = useState([] as models.IRedditPost[]);
    // const getPosts = async () => {
    //   try {
    //     const res = await fetch('/api/reddit');
    //     const redditResponse: models.IRedditResponse = await res.json();

    //     setPosts(redditResponse?.data?.children);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };

    // useEffect(() => {
    //   getPosts();
    // }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>SubReddit</title>
                <meta
                    name="description"
                    content="A Reddit client that shows posts for subreddits"
                />
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
                    <List posts={postRes?.data?.children} />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
