require('dotenv').config();
const nodemailer = require('nodemailer');


const sendEmail = async(friendEmail,content)=>{
    try{
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASS
    }
});

let mailOptions = {
    from : process.env.MY_MAIL,
    to : friendEmail,
    subject : "voila",
    text: `Hey ${content.firstname}\n,Phone Number: ${content.phone_number}\n, You donated: ${content.amount}\n, thank you for donating to IRCS!!`
}

   let info = await transporter.sendMail(mailOptions);
   console.log('email send:',info.response);
}catch(error){
    console.log('error',error);
}
}

module.exports = sendEmail;