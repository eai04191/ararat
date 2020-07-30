import { NowRequest, NowResponse } from "@vercel/node";
import { fetchPreviousPost } from "./util/fetch";
import { diff, post } from "./util/post";

export default async function (req: NowRequest, res: NowResponse) {
    const { attachment = null, url, published } = req.body;

    if (!attachment) {
        const message = "画像が無い為何もしません";
        console.log(message);
        res.status(200).json({ message });
        return;
    }

    const { previousUrl, previousPublished } = await fetchPreviousPost(
        url,
        published
    );
    const diffDays = diff(previousPublished);

    await post(
        `また水をこぼしました……。${diffDays}日ぶりですね。\n前の: ${previousUrl}`,
        url
    );

    res.status(200).json({ message: "done" });
    return;
}
