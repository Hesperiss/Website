import React, {useState} from 'react';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import {
    FaEnvelope,
    FaGitAlt,
    FaLinkedinIn
} from "react-icons/fa";
import '../Landing.scss';
import EmailModal from "./EmailModal";

/**
 * Vérifie qu'une adresse email possède un format valide.
 * @param {string} name
 * @param {string} email
 * @param {string} message
 * @return bool
 */
function isEmailValid(name, email, message, subject) {

    //list of invalid fields
    let invalid = [];

    console.log(message, email, name)

    //checks if fields are set
    if (name === "")
        invalid.push("name");
    if (email === "")
        invalid.push("email");
    if (message === "")
        invalid.push("message");
    if (subject === "")
        invalid.push("subject");

    //checks if email is valid
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(email).toLowerCase()))
        invalid.push("email");
    return ({
        isValid: invalid.length === 0,
        invalidFields: invalid
    });
}

/**
 * Fait partie du layout de la page d'accueil.
 * Contient un formulaire permettant de contacter l'équipe Kwili.
 * @returns {React.Fragment}
 */
function ContactForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const emailSuccessMsg = "Merci pour votre retour. Votre message à bien été envoyé à l'équipe de Kwili, qui vous répondra  très vite !"
    const emailFailureMsg = "L'envoi du message a échoué, veuillez réessayer."
    const [emailModal, setEmailModal] = useState(false);
    const [emailMsg, setEmailMsg] = useState(emailSuccessMsg);
    const [invalidFields, setInvalidFields] = useState([]);

    /**
     * Envoie un email quand l'utuilisateur soumet le formulaire.
     * @param {string} name
     * @param {string} email
     * @param {string} subject
     * @param {string} message
     */
    const sendEmail = async (name, email, subject, message) => {

        const testEmail = isEmailValid(name, email, message, subject);
        if (testEmail.isValid === false) {
            setInvalidFields(testEmail.invalidFields)
            return;
        } else {
            setInvalidFields([]);
            await setEmailModal(true);
            axios({
                method: "POST",
                url: "https://www.kwili.fr:3000/send",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: `name=${name}&email=${email}&subject=${subject}&message=${message}`
            })
                .then((response) => {
                    if (response.status === 200) {
                        setEmailMsg(emailSuccessMsg)
                        setEmailModal(true);
                    }
                })
                .catch(() => {
                    setEmailMsg(emailFailureMsg)
                    setEmailModal(true);
                })
        }
    }

    /**
     * Réinitialise les champs du formulaire de contact
     */
    const resetFields = () => {
        setName("");
        setMessage("");
        setSubject("");
        setEmail("");
    }

    return (
        <div className={"contactFormSection"}>

            {emailModal && <EmailModal
                open={true}
                message={emailMsg}
                onClose={() => setEmailModal(false)}
            />}

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
                    <div className={"icon"}><FaEnvelope/></div>
                    <p>adm.kwili@gmail.com</p>
                </div>
            </div>

            {/*contact form*/}
            <form id="contact-form">
                <div className="userInfo">
                    <FormattedMessage id="ContactForm.Name" defaultMessage={invalidFields.includes("name") ? "Nom requis" : "Nom"}>
                        { placeholder => 
                            <input
                                className={"formField"}
                                type="text"
                                placeholder={placeholder}
                                onChange={(event) => setName(event.target.value)}
                            />
                        }
                    </FormattedMessage>
                    <FormattedMessage id="ContactForm.Email" defaultMessage={invalidFields.includes("email") ? "Email requis" : "Email"}>
                        { placeholder => 
                            <input
                                type={"email"}
                                placeholder={placeholder}
                                className={invalidFields.includes("email") ? "invalidFormField" : "formField"}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        }
                    </FormattedMessage>
                    <FormattedMessage id="ContactForm.Subject" defaultMessage={invalidFields.includes("subject") ? "Sujet requis" : "Sujet"}>
                        { placeholder => 
                            <input
                                type={"text"}
                                placeholder={placeholder}
                                className={invalidFields.includes("subject") ? "invalidFormField" : "formField"}
                                onChange={(event) => setSubject(event.target.value)}
                            />
                        }
                    </FormattedMessage>
                </div>
                <textarea
                    >
				</textarea>
                <FormattedMessage id="ContactForm.Message" defaultMessage={invalidFields.includes("message") ? "Le message ne peut pas être vide" : "Message"}>
                    { placeholder => 
                        <textarea
                            placeholder={placeholder}
                            className={invalidFields.includes("message") ? "invalidMessageField" : "messageField"}
                            onChange={(event) => setMessage(event.target.value)}>
                        </textarea>
                    }
                </FormattedMessage>
            </form>
            <FormattedMessage id="ContactForm.Send" defaultMessage="Envoyer">
                { value => 
                    <button
                        border={"none"}
                        className={"sendButton"}
                        type="submit"
                        value={value}
                        onClick={() => sendEmail(name, email, subject, message)}
                    />
                }
            </FormattedMessage>

            <button className={"sendButton"} border={"none"} onClick={() => sendEmail(name, email, subject, message)}>
                Envoyer
            </button>

            {/*social media button + project info*/}
            <div className={"socialMedia"}>
                <div className={"buttonsWrapper"}>
                    <a className={"socialMediaButton"} href="https://www.linkedin.com/company/kwili/"
                       rel="noopener noreferrer" target="_blank"><FaLinkedinIn/></a>
                    <a className={"socialMediaButton"} href="https://github.com/Kwili" rel="noopener noreferrer"
                       target="_blank"><FaGitAlt/></a>
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

export default ContactForm;
