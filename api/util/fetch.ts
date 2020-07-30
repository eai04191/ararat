import got from "got";
import { createAcct } from "./post";

export const fetchPreviousPost = async (url: string, published: string) => {
    try {
        const { statuses } = await got(
            `https://notestock.osa-p.net/api/v1/search.json`,
            {
                searchParams: {
                    q: "#waterfloodeveryday",
                    acct: createAcct(url),
                    max_dt: published,
                },
            }
        ).json();

        const { url: previousUrl, published: previousPublished } = statuses[0];
        return { previousUrl, previousPublished };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch notestock response.")
    }
};
