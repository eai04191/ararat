require("dotenv").config();

const loader = (key: string) => {
    if (!process.env.hasOwnProperty(key)) {
        throw new Error(`${key} is missing from env!`);
    }
    return process.env[key];
};

export const config = {
    host: loader("BOT_HOST"),
    token: loader("BOT_TOKEN"),
};
