import React from 'react';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import {
    FaEnvelope,
    FaGitAlt,
    FaLinkedinIn
} from "react-icons/fa";
import '../Landing.scss';


/**
 * Vérifie qu'une adresse email possède un format valide.
 * @param {string} name
 * @param {string} email
 * @param {string} message
 * @return bool
 */
function isEmailValid(name, email, message) {

    //checks if fileds are set
    if (name === "" || name === "nom" ||
        email === "" || email === "email" ||
        message === "" || message === "Message")
        return false;

    //checks if email is valid
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Envoie un email quand l'utuilisateur soumet le formulaire.
 * @param {string} name
 * @param {string} email
 * @param {string} subject
 * @param {string} message
 */
function  sendEmail(name, email, subject, message) {

  if (!isEmailValid(name, email, message)) {
    alert("Adresse mail non valide")
    return;
  }

  axios({
     method: "POST",
     url:"https://www.kwili.fr:3000/send",
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
    },
     data: `name=${name}&email=${email}&subject=${subject}&message=${message}`
   })
   .then((response)=>{
     if (response.status === 200){
         alert("Votre message a bien été envoyé, merci !");
       }
   })
   .catch(err => {
     alert("L'envoi du message a échoué.");
   })

   document.getElementById('contact-form').reset();
}

/**
 * Fait partie du layout de la page d'accueil.
 * Contient un formulaire permettant de contacter l'équipe Kwili.
 * @returns {React.Fragment}
 */
function contactForm() {

    let name, email, message, subject  = "";

    return (
        <div className={"contactFormSection"}>

            {/*section title and contact info*/}
            <div className={"textWrapper"}>
                <h2 className={"sectionTitle"}>
                    <FormattedMessage
                        id="ContactForm.Title"
                        defaultMessage="Nous contacter"
                    />
                </h2>
                <hr/>
                <p className={"sectionSubtitle"}>
                    <FormattedMessage
                        id="ContactForm.Info"
                        defaultMessage="Une question ? Une remarque ? Une suggestion ?{code}N'hésitez pas à nous en faire part."
                        values={{ code: <br/>}}
                    />
                </p>
                <div className={"phoneEmail"}>
                    <div className={"icon"}><FaEnvelope /></div>
                    <p>adm.kwili@gmail.com</p>
                </div>
            </div>

            {/*contact form*/}
            <form id="contact-form">
                <div className="userInfo">
                    <FormattedMessage id="ContactForm.Name" defaultMessage="Nom">
                        { placeholder => 
                            <input
                                className={"formField"}
                                type="text"
                                placeholder={placeholder}
                                onChange={(event) => {name = event.target.value}}
                            />
                        }
                    </FormattedMessage>
                    <FormattedMessage id="ContactForm.Email" defaultMessage="Courriel">
                        { placeholder => 
                            <input
                                className={"formField"}
                                type="email"
                                placeholder={placeholder}
                                onChange={(event) => {email = event.target.value}}
                            />
                        }
                    </FormattedMessage>
                    <FormattedMessage id="ContactForm.Subject" defaultMessage="Sujet">
                        { placeholder => 
                            <input
                                className={"formField"}
                                type="text"
                                placeholder={placeholder}
                                onChange={(event) => {subject = event.target.value}}
                            />
                        }
                    </FormattedMessage>
                </div>
                <FormattedMessage id="ContactForm.Message" defaultMessage="Message">
                    { placeholder => 
                        <textarea
                            className={"messageField"}
                            placeholder={placeholder}
                            onChange={(event) => {message = event.target.value}}>
                        </textarea>
                    }
                </FormattedMessage>
            </form>
            <FormattedMessage id="ContactForm.Send" defaultMessage="Envoyer">
                { value => 
                    <input
                        className={"sendButton"}
                        type="submit"
                        value={value}
                        onClick={() => sendEmail(name, email, subject, message)}
                    />
                }
            </FormattedMessage>

            {/*social media button + project info*/}
            <div className={"socialMedia"}>
                <div className={"buttonsWrapper"}>
                    <a className={"socialMediaButton"} href="https://www.linkedin.com/company/kwili/" rel="noopener noreferrer" target="_blank"><FaLinkedinIn/></a>
                    <a className={"socialMediaButton"} href="https://github.com/Kwili" rel="noopener noreferrer" target="_blank"><FaGitAlt/></a>
                </div>
                <p>
                    <FormattedMessage
                        id="ContactForm.Legal"
                        defaultMessage="Kwili est un projet réalisé par une équipe d'étudiants dans le cadre des{code}Epitech Innovative Projects. © 2018"
                        values={{ code: <br/>}}
                    />
                </p>
            </div>
        </div>
    );
}

export default contactForm;
