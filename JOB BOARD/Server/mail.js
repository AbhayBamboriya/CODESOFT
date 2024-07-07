// const http = require("http");
// const nodemailer = require("nodemailer");
import http from 'http'
import nodemailer from 'nodemailer'

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "bamboriya09@gmail.com",
            pass: "rrysxvsdnzizgrkg"

        }
    });

    const receiver = {
        from : "bamborita09@gmail.com",
        to : "yashwantbamboriya@gmail.com",
        subject : "Node Js Mail Testing!",
        text : "Hello this is a text mail! first mail"
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error)
        throw error;
        console.log("success!");
        response.end();
    });
    
});

server.listen(8080);