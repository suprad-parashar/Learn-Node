//Import Modules.
const firebase = require("../firebase");
const express = require("express");
const path = require("path");
const { request, response } = require("express");
const bodyparser = require('body-parser');
const { rootCertificates } = require("tls");
let nodemailer = require("nodemailer");
let xoauth2 = require("xoauth2");

//Create Router Object.
const router = express.Router();

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//Main About Page (GET)
router.get("/", (request, response) => {
    response.sendFile(path.resolve("./views/html/about.html"));
});

router.post("/", (request, response) => {
    const output = `
    <h3> Feedback/Opinion </h3>
    <ul style="list-style:none">
        <li>Name : ` + request.body.name + `</li>
        <li>Subject :` +  (request.body.subject)+ `</li>
        <li>Email :` +  (request.body.email)+ `</li>
    </ul>
    <h3>Message</h3>
    <p>` + (request.body.message) + `</p>`;
    console.log(output);

    // create reusable transporter object using the default SMTP transport
    let smtptransporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            type: 'OAuth2',
            user: 'nandavarmukund1999@gmail.com', // generated ethereal user
            cliendId: "172846432484-k2slqja46mdq7dqgmc4lcsj2r1rc3nun.apps.googleusercontent.com",
            clientSecret: "O-SdwTWevvjyrNaX9QgRNEaP",
            refreshToken: "1//04XKZ4-SJOXc_CgYIARAAGAQSNwF-L9Ir1N4V5lHIYwl1-LQuSjLINtUiAwh7fQWnhpCECDVMDfVpS059vKVMeX6MgpmCYP8wrMc",
            accessToken: "ya29.a0AfH6SMDR9Wb_3Ip-49tE4cXhE48v6tTMmjYrYpAlIG0ACaxPhIU6bZ5xCmCFgWldiw8XUIkmwllSXy6D6ihAxGQU8xd9EcuJRoMJSG8HbtHOSx6pR9x8N01wMD6iDCVR9r-DESGFhUGNIVJZnhjkJ01YmkNIntVntF0"
        }
    });

    let mailOptions = {
        from: request.body.email, // sender address
        to: "learnhelp@googlegroups.com", // list of receivers
        subject: request.body.subject + "(Learn Feedback)",// Subject line
        text: "", // plain text body
        html: output
    };

    smtptransporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            response.send("<h1>Email Sent.Thank You for your valuable Feedbacks.</h1>");
        }
        smtptransporter.close();
    })
})
//Export Router.
module.exports = router;