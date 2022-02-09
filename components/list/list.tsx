import { BASE_URL, getThumbnail, isArray, isEmpty } from '../../utils';
import styles from './list.module.css';

interface IProps {
    posts: models.IRedditPost[];
}

export default function List({ posts }: IProps) {
    if (!isArray(posts) || posts.length === 0) {
        return (
            <div className="pt-10 text-center text-sm">
                <span>No posts found :(</span>
            </div>
        );
    }

    return (
        <div className="pt-1 pb-5">
            <div>
                {posts.map((p) => {
                    const pdata = p.data;

                    return (
                        <a
                            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 my-2 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-300 dark:bg-black dark:text-white"
                            href={
                                isEmpty(pdata.permalink)
                                    ? BASE_URL
                                    : pdata.permalink
                            }
                            target="_blank"
                            rel="noreferrer"
                            key={pdata.id}>
                            <div className="flex-shrink-0">
                                <img
                                    className="h-10"
                                    src={getThumbnail(pdata.thumbnail)}
                                    alt="Post thumbnail"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {pdata.title}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    posted by u/{pdata.author}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
