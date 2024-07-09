import nodemailer from 'nodemailer';

const createServe1 = (email) => {
    // const server = http.createServer((request, response) => {
        console.log('called in mail','email is',email);
        const auth = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "bamboriya09@gmail.com",
                pass: "rrysxvsdnzizgrkg"
            }
        });

        const receiver = {
            from: "bamboriya09@gmail.com",
            to: email,
            subject: "Welcome Email",
            text: " Welcome to Job Portal – Your Journey to Your Dream Job Starts Here! .We are thrilled to have you join our community of ambitious professionals and top-tier employers. Our goal is to connect you with the best job opportunities that match your skills, experience, and career aspirations."
        };

        auth.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                response.statusCode = 500;
                response.setHeader('Content-Type', 'text/plain');
                response.end(`Error: ${error.message}`);
                return;
            }
            console.log("success!");
            
        });
    // });

};

export default createServe1