// Next.js API route support:   
import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs';
import path from 'path';
import Cors from 'cors';
import { METHODS } from 'http';
import { ReCAPTCHAProps } from 'react-google-recaptcha';
import { ReCaptcha } from 'next-recaptcha-v3';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
    methods: ['POST'],
})


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

const verifyReCaptcha = async (token: any) => {
    const SECRET_KEY = process.env.SECRETKEY;

    const verifyUrl= `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;
    console.log("verifyUrl", verifyUrl)
    return await fetch(verifyUrl);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    // Run the middleware
    await runMiddleware(req, res, cors)
    
    if (req.method === "POST") {
    // try {
        const token = (req.body.gReCaptchaToken);
        await verifyReCaptcha(token)
        // .then((ReCaptchaRes) => ReCaptchaRes.type)
        .then((reCaptchaRes) => reCaptchaRes.json())
        .then((reCaptchaRes) => {
            console.log(reCaptchaRes, "Response from verification api");
            if(reCaptchaRes?.score>0.5 && reCaptchaRes.success===true) {
                res.status(200).json({status: "success", message: `successful upload ${reCaptchaRes}`})
            } else {
                res.status(200).json({status: "failure", message: `failure ${reCaptchaRes}`})
            }
        })
      // console.log(response.json());
        // res.status(200).json("WHY");
    // } catch (e: any) {
    //     res.status(400).json(`Failure. ${e.error}`);
    // }
    }
    }

    // try {
        // const response = await fetch(verifyUrl)
        //     .then((reCaptchaRes) => reCaptchaRes.json())
        //     .then((reCaptchaRes) => {
        //         console.log(
        //             reCaptchaRes,
        //             "Response from Google reCaptcha verification API"
        //         );
        //         if (reCaptchaRes?.score > 0.5) {
        //             // Save data to db
        //             res.status(200).json({
        //                 status: "success",
        //                 message: "Form submitted successfully",
        //             });
        //         } else {
        //             res.status(200).json({
        //                 status: "failure",
        //                 message: `Google ReCaptcha Failure  ${reCaptchaRes?.score} ${reCaptchaRes}`,
        //             })
        //         }
        //     });

        //     response
        
    //     const recaptchaJson = await recaptchaRes.json();

    //     res.status(200).json(recaptchaJson);
    // } catch (e: any) {
    //     res.status(400).json(e.error);
    // }
// }
