import React from 'react';
import nodemailer from "nodemailer";
import {
    FaEnvelope,
    FaPhone,
    FaTwitter,
    FaFacebookF,
    FaGitAlt,
    FaLinkedinIn
} from "react-icons/fa";
import '../Landing.scss';



function isEmailValid(name, email, message) {

    //checks if fileds are set
    if (name === "" || name === "nom" ||
        email === "" || email === "email" ||
        message === "" || message === "Message")
        return false;

    //checks if email is valid
    let emailRegex = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let emailValid = emailRegex.test(email);
    if (!emailValid)
        return false;

    return true;
}

/*
** sends an email when user submits form
*/
function  sendEmail(name, email, subject, message) {

    if (!isEmailValid(name, email, message))
        return;

    let mailOptions = {
        from: email,
        to: 'Kwili.epitech@gmail.com',
        subject: `${subject}`,
        html: `<p>${name}</p>
				<p>${email}</p>
				<p>${message}</p>`
    };

    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'Kwili.epitech@gmail.com', //replace ! ne pas git
            pass: '[PASSWORD]' // replace ! ne pas git
        }
    });

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Success')
        }
        smtpTransport.close();
    });
}


function contactForm() {

    let name = "nom";
    let email = "email@domain.com";
    let message = "Message"
    let subject = "Objet"

    return (
        <div className={"contactFormSection"}>

            {/*section title and contact info*/}
            <div className={"textWrapper"}>
                <h2 className={"sectionTitle"}>Nous contacter</h2>
                <hr/>
                <p className={"sectionSubtitle"}>Une question ? Une remarque ? Une suggestion ? <br/>
                N'hésitez pas à nous en faire part.</p>
                <div className={"phoneEmail"}>
                    <div className={"icon"}><FaEnvelope /></div>
                    <p>adm.kwili@gmail.com</p>
                    <div className={"icon"}><FaPhone /></div>
                    <p>07 81 43 00 00</p>
                </div>
            </div>

            {/*contact form*/}
            <form>
                <div className="userInfo">
                    <input
                        className={"formField"}
                        type="text"
                        placeholder={name}
                        onChange={(event) => {name = event.target.value}}/>
                    <input
                        className={"formField"}
                        type="email"
                        placeholder={email}
                        onChange={(event) => {email = event.target.value}}/>
                    <input
                        className={"formField"}
                        type="text"
                        placeholder={subject}
                        onChange={(event) => {subject = event.target.value}}/>
                </div>
                <textarea
                    className={"messageField"}
                    placeholder={message}
                    onChange={(event) => {message = event.target.value}}>
				</textarea>
            </form>
            <input
                className={"sendButton"}
                type="submit"
                value="Envoyer"
                onClick={() => sendEmail(name, email, subject, message)}/>

            {/*social media button + project info*/}
            <div className={"socialMedia"}>
                <div className={"buttonsWrapper"}>
                    <a className={"socialMediaButton"}><FaLinkedinIn/></a>
                    <a className={"socialMediaButton"}><FaFacebookF/></a>
                    <a className={"socialMediaButton"} href={"https://github.com/Kwili"}><FaGitAlt/></a>
                    <a className={"socialMediaButton"}><FaTwitter/></a>
                </div>
                <p>Kwili est un projet réalisé par une équipe d'étudiants dans le cadre des <br/>
                Epitech Innovative Projects. © 2018</p>
            </div>
        </div>
    );
}

export default contactForm;
