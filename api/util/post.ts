import got from "got";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.locale("ja");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
import { config } from "./config";

export const diff = (oldDate: string, newDate?: string) => {
    if (newDate) {
        return dayjs(newDate).diff(dayjs(oldDate), "d");
    }
    return dayjs().diff(dayjs(oldDate), "d");
};

export const createAcct = (url: string) => {
    const hostname = new URL(url).hostname;
    const username = url.match(/(?<username>@.+?)\//)?.groups?.username;
    return `${hostname}${username}`;
};

export const post = async (status: string, url: string) => {
    const acct = createAcct(url);

    try {
        const {
            id,
            account: { acct },
        } = ((await got(`https://${config.host}/api/v2/search`, {
            headers: {
                Authorization: `Bearer ${config.token}`,
            },
            searchParams: {
                q: url,
                resolve: true,
            },
            responseType: "json",
        }).json()) as any).statuses[0];
        console.log("メンション先のid, acct:", id, acct);

        await got.post(`https://${config.host}/api/v1/statuses`, {
            headers: {
                Authorization: `Bearer ${config.token}`,
            },
            json: {
                status: `@${acct} ${status}`,
                in_reply_to_id: id,
            },
            responseType: "json",
        });
        console.log("投稿しました");
        return;
    } catch (error) {
        console.error(error);
        return;
    }
};
