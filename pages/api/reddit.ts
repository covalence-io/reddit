import type { NextApiRequest, NextApiResponse } from 'next';
import {
    serializeQuery,
    isEmpty,
    BASE_URL,
    SUBREDDIT_PATH,
    ALL_POSTS,
    SUFFIX,
} from '../../utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'GET':
            try {
                const query = req.query as unknown as models.IGetRedditPosts;
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

                res.status(200).send(jRes);
            } catch (e) {
                console.log(e);
                res.status(400);
            }
            break;
        default:
            res.send(404);
            break;
    }
};

export default handler;
