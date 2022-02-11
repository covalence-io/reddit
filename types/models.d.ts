declare module models {
    interface IPaginateReddit {
        after?: string;
        before?: string;
    }

    interface IRedditQueryParams extends IPaginateReddit {
        count?: number;
        limit?: number;
    }

    interface IGetRedditPosts extends IRedditQueryParams {
        s?: string;
    }

    interface IRedditPost {
        kind: string;
        data: {
            id: string;
            subreddit: string;
            title: string;
            thumbnail: string;
            permalink: string;
            author: string;
        };
    }

    interface IRedditResponse {
        kind: string;
        data: {
            after: string;
            before: string;
            dist: number;
            children: IRedditPost[];
        };
    }
}
