import styles from './list.module.css';
import { isArray, isEmpty, BASE_URL, getThumbnail } from '../../utils';

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
        <div className="max-w-2xl mx-auto pt-1 pb-10">
            <div>
                {posts.map((p) => {
                    const pdata = p?.data;

                    return (
                        <a
                            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 my-2"
                            href={
                                isEmpty(pdata.permalink)
                                    ? BASE_URL
                                    : BASE_URL + pdata.permalink
                            }
                            key={pdata.id}
                            target="_blank"
                            rel="noreferrer">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-10"
                                    src={getThumbnail(pdata.thumbnail)}
                                    alt=""
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                    {p.data.title}
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
