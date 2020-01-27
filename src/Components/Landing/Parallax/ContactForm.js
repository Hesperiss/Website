import React from 'react';
import nodemailer from "nodemailer";
import {
	FaEnvelope,
	FaUser,
	FaComment,
 } from "react-icons/fa";

import './ContactForm.scss';
import doctorPicture from "../../../Images/doctor.jpg";

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


export function displayContactForm() {

	let name = "nom";
	let email = "email@domain.com";
	let message = "Message"
	let subject = "Objet"

	return (
		<div id="ContactForm" style={{ backgroundImage: `url(${doctorPicture})` }}>
			<h3 className="sectionTitle">Nous Contacter</h3>
			<form>
				<div className="userInfoSection">
					<div className="formSection">
						<FaUser className="icon"/>
						<input
							type="text"
							placeholder={name}
							onChange={(event) => {name = event.target.value}}/>
					</div>

					<div className="formSection">
						<FaEnvelope className="icon"/>
						<input
							type="email"
							placeholder={email}
							onChange={(event) => {email = event.target.value}}/>
					</div>

					<div className="formSection">
						<FaComment className="icon"/>
						<input
							type="text"
							placeholder={subject}
							onChange={(event) => {subject = event.target.value}}/>
					</div>
				</div>

				<textarea
					placeholder={message}
					className="message"
					onChange={(event) => {message = event.target.value}}>
				</textarea>

			</form>

			<input
				type="submit"
				value="Envoyer"
				className="submitButton"
				onClick={() => sendEmail(name, email, subject, message)}/>
		</div>
	);
}
