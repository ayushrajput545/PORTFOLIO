const express = require('express');
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors')

const PORT = process.env.PORT || 4000

app.use(express.json()); // Allows Express to parse JSON data
app.use(cors()); // If frontend is making cross-origin requests

   
app.post('/send-email', async(req,res)=>{
    
    const {name , email , subject , message} = req.body;

    let transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })
     
    try{
        await transporter.sendMail({
            from: email,
            to:process.env.RECEIVER_EMAIL,
            subject : subject,
            text: `Name: ${name} \n Email: ${email} \n Message: ${message}`
        })

        return res.status(200).json({
            success:true,
            message:"Mail Sent Successfully"
        })

    
    }
    catch(err){

        return res.status(500).json({
            success:true,
            message:"Failed to sent email"
        })

    }    

})




app.listen(PORT , ()=>{
    console.log(`Server is running at PORT no.${PORT}`);
})

