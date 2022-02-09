import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './navbar.module.css';
import { ALL_POSTS, isEmpty } from '../../utils';

interface IProps {
    dark: boolean;
    onThemeChanged: (dark: boolean) => void;
}

export default function Navbar({ dark, onThemeChanged }: IProps) {
    const [search, setSearch] = useState('');
    const [isDark, setIsDark] = useState(dark);
    const router = useRouter();
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEmpty(search) || search === ALL_POSTS) {
            router.push(`/`);
        } else {
            router.push(`/?s=${search}`);
        }
    };
    const themeChanged = (val: boolean) => {
        setIsDark(val);
        onThemeChanged(val);
    };

    return (
        <nav className={`${styles.navbar} bg-white dark:bg-black`}>
            <div className="max-w-7xl mx-auto sm:px-4 lg:px-8 lg:divide-y lg:divide-gray-200">
                <div className="relative h-16 flex justify-between">
                    {/* Application Logo */}
                    <div className="relative z-10 px-2 flex lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block h-8 w-auto"
                                src={
                                    isDark
                                        ? '/logos/subreddit_light.png'
                                        : '/logos/subreddit.png'
                                }
                                alt="SubReddit"
                            />
                        </div>
                    </div>
                    {/* Search Input */}
                    <div className="flex items-center justify-center flex-1">
                        <form
                            className="w-full max-w-2xl mr-20"
                            onSubmit={onSubmit}>
                            <input
                                type="search"
                                className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-900 dark:focus:text-white"
                                placeholder="Search Subreddits"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.currentTarget.value)
                                }
                            />
                        </form>
                    </div>
                    {/* Search Input */}
                    <div className="flex items-center ml-4">
                        <Switch
                            checked={isDark}
                            onChange={themeChanged}
                            className={`relative h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-left ${
                                isDark ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}>
                            <span className="sr-only">
                                {isDark ? 'Light' : 'Dark'} Mode
                            </span>
                            <span
                                className={`pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-black dark:text-gray-100 shadow transform ring-0 transition ease-in-out duration-200 ${
                                    isDark ? 'translate-x-5' : 'translate-x-0'
                                }`}
                                aria-hidden="true">
                                <span
                                    className={`absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ${
                                        isDark
                                            ? 'opacity-0 ease-out duration-100'
                                            : 'opacity-100 ease-in duration-200'
                                    }`}
                                    aria-hidden="true">
                                    <MoonIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </span>
                                <span
                                    className={`absolute inset-0 h-full w-full flex items-center justify-center transition-opacity ${
                                        isDark
                                            ? 'opacity-100 ease-in duration-200'
                                            : 'opacity-0 ease-out duration-100'
                                    }`}
                                    aria-hidden="true">
                                    <SunIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </span>
                            </span>
                        </Switch>
                    </div>
                </div>
            </div>
        </nav>
    );
}
