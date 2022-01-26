import styles from './navbar.module.css';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { ALL_POSTS, isEmpty } from '../../utils';

export default function Navbar() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEmpty(search) || search === ALL_POSTS) {
            router.push(`/`);
        } else {
            router.push(`/?s=${search}`);
        }
    };

    return (
        <nav className={`${styles.navbar} bg-white`}>
            <div className="max-w-7xl mx-auto sm:px-4 lg:px-8 lg:divide-y lg:divide-gray-200">
                <div className="relative h-16 flex justify-between">
                    {/* Application Logo */}
                    <div className="relative z-10 px-2 flex lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block h-8 w-auto"
                                src="/logos/subreddit.png"
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
                                className="block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-indigo-500"
                                placeholder="Search Subreddits"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.currentTarget.value)
                                }
                            />
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}
