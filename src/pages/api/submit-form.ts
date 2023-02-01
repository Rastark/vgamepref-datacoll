// Next.js API route support:   
import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';
import path from 'path';
import Cors from 'cors';
import { METHODS } from 'http';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ['POST'],
})

const SECRET_KEY = process.env.SECRETKEY;

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    const {recaptchaResponse} = req.body.gRecaptchaToken;

    const verifyUrl= `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptchaResponse}`;

    // try {
        const recaptchaRes = await fetch(verifyUrl)
            .then((reCaptchaRes) => reCaptchaRes.json())
            .then((reCaptchaRes) => {
                console.log(
                    reCaptchaRes,
                    "Response from Google reCaptcha verification API"
                );
                if (reCaptchaRes?.score > 0.5) {
                    // Save data to db
                    res.status(200).json({
                        status: "success",
                        message: "Form submitted successfully",
                    });
                } else {
                    res.status(200).json({
                        status: "failure",
                        message: "Google ReCaptcha Failure",
                    })
                }
            });
        
    //     const recaptchaJson = await recaptchaRes.json();

    //     res.status(200).json(recaptchaJson);
    // } catch (e: any) {
    //     res.status(400).json(e.error);
    // }
}
