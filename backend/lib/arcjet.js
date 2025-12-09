import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";
import "dotenv/config";

export const aj=arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        //shield protects app from common attacks e.g. SQL injection ,XSS ,CSRF attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            allow:[
                "CATEGORY:SEARCH_ENGINE",

            ]
        }),

        //Rate Limitinig
        tokenBucket({
            mode:"LIVE",
            refillRate:5,
            interval:10,
            capacity:10,
        }),
    ],
});