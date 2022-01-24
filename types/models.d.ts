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
            is_video: boolean;
            author: string;
            permalink: string;
        };
    }

    interface IRedditResponse {
        kind: string;
        data: {
            after: string;
            before: string;
            dist: number;
            modhash: string;
            geo_filter: string;
            children: IRedditPost[];
        };
    }
}