import {rateLimit} from "express-rate-limit";

export const sendingRequestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 3,
    message: "Too many requests, please try again later."
})