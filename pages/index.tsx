import type { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    ArrowNarrowLeftIcon,
    ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import Footer from '../components/footer/footer';
import List from '../components/list/list';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import 'isomorphic-fetch';
import {
    ALL_POSTS,
    BASE_URL,
    isEmpty,
    isObject,
    serializeQuery,
    SUBREDDIT_PATH,
    SUFFIX,
} from '../utils';

const DEFAULT_POST_LIMIT = 10;

interface IProps {
    postRes: models.IRedditResponse;
    subreddit: string;
    query: models.IRedditQueryParams;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const query = context.query;
    let subreddit = query.s;

    if (isEmpty(subreddit)) {
        subreddit = ALL_POSTS;
    }

    if (isEmpty(query.limit)) {
        query.limit = DEFAULT_POST_LIMIT.toString();
    }

    if (isEmpty(query.count)) {
        query.count = '0';
    }

    delete query.s;

    try {
        const response = await fetch(
            `${BASE_URL}${SUBREDDIT_PATH}${subreddit}${SUFFIX}${serializeQuery(
                query
            )}`
        );

        const jRes: models.IRedditResponse = await response.json();

        return {
            props: {
                postRes: jRes,
                subreddit,
                query,
            },
        };
    } catch (e) {
        return {
            props: {
                postRes: null,
                subreddit,
                query,
            },
        };
    }
};

const Home: NextPage<IProps> = ({ postRes, subreddit, query }: IProps) => {
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

    const [dark, setDark] = useState(false);
    const themeChanged = (val: boolean) => {
        setDark(val === true);
    };

    useEffect(() => {
        if (
            !isObject(window) ||
            !window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            return;
        }

        setDark(true);
    }, []);

    const limit = Number(query.limit);
    const pdata = postRes?.data;
    let after = pdata?.after;
    let count = Number(query.count);

    if (pdata?.dist > limit || pdata?.children?.length > limit) {
        pdata.children = pdata?.children?.slice(0, limit);

        const lastChild = pdata.children[limit - 1];

        after = `${lastChild?.kind}_${lastChild?.data?.id}`;
    }

    const hasAfter = !isEmpty(after);
    const hasBefore = !isEmpty(pdata?.before);
    const hasSub = !isEmpty(subreddit) && subreddit !== ALL_POSTS;

    if (!isEmpty(query.before)) {
        count -= limit;
    }

    if (isEmpty(count) || count < 0) {
        count = 0;
    }

    const bQuery: models.IGetRedditPosts = { count };
    const aQuery: models.IGetRedditPosts = { count: count + limit };

    if (hasSub) {
        bQuery.s = aQuery.s = subreddit;
    }

    if (hasBefore) {
        bQuery.before = pdata.before;
    }

    if (hasAfter) {
        aQuery.after = after;
    }

    return (
        <div className={`${styles.container} ${dark ? 'dark' : 'light'}`}>
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
            <Navbar dark={dark} onThemeChanged={themeChanged} />
            <div className="relative bg-gray-100 pt-24 lg:pt-28 pb-16 min-h-screen dark:bg-gray-800 dark:text-white">
                <main>
                    <div className="absolute top-20 text-xs text-center w-full font-bold">
                        <span>{hasSub ? `/r/${subreddit}` : ''}</span>
                    </div>
                    <div className="max-w-2xl mx-auto pb-5">
                        <List posts={pdata?.children} />
                        <div className="flex justify-between text-sm text-gray-500 font-medium">
                            <Link href={`/${serializeQuery(bQuery)}`}>
                                <a
                                    className={`flex items-center justify-center py-3 hover:text-gray-900 dark:hover:text-gray-300${
                                        isEmpty(bQuery.before)
                                            ? ' invisible'
                                            : ''
                                    }`}>
                                    <ArrowNarrowLeftIcon className="h-5 mr-1" />
                                    <span>Previous</span>
                                </a>
                            </Link>
                            <Link href={`/${serializeQuery(aQuery)}`}>
                                <a
                                    className={`flex items-center justify-center py-3 hover:text-gray-900 dark:hover:text-gray-300${
                                        isEmpty(aQuery.after)
                                            ? ' invisible'
                                            : ''
                                    }`}>
                                    <span>Next</span>
                                    <ArrowNarrowRightIcon className="h-5 ml-1" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
