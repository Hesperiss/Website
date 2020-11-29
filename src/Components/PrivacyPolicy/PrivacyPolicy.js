import React from 'react';
import {Helmet} from "react-helmet";
import { FormattedMessage } from 'react-intl';
import NavBarLanding from "../Landing/Components/Navbar";
import './PrivacyPolicy.scss';
import {FaArrowUp} from "react-icons/fa";

export default function PrivacyPolicy(props){

    /**
     * Glisse vers le lien interne vers la section "en savoir plus' de la page.
     */
    const slideToAnchorLink = (anchorId) => {
        let scrollTo = document.getElementById(anchorId);
        scrollTo.scrollIntoView({behavior: 'smooth'});
    };

    /**
     * Affichage des mentions légales RGPD
     */
    return (
        <div className={"privacyPolicy"}>

            <a href={"#pageTop"} id={"#pageTop"}>
                <Helmet>
                    <meta name="description" content="Politique d'utilisation des données" />
                    <meta name="robots" content="index, follow" />
                </Helmet>
            </a>

            <NavBarLanding/>

            <button
                border={"none"}
                className={"pageTopButton"}
                onClick={() => slideToAnchorLink("#pageTop")}>
                <FaArrowUp className={"pageTopIcon"}/>
            </button>

            <div className={"policyText"}>
                <h1>Politique d'utilisation des données</h1>
                <h2><FormattedMessage
                    id={"Privacy.Def.Title"}
                    defaultMessage={" Définitions"}
                />
                </h2>
                <p><FormattedMessage
                    id={"Privacy.Def.Text"}
                    defaultMessage={"Sont désignées ci-dessous comme informations personnelles «Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent». (article 4 de la loi n° 78-17 du 6 janvier 1978). Les termes « données à caractère personnel » ont le sens défini par le Règlement Général sur la Protection des Données (RGPD : n° 2016-679)"}/>
                </p>
                <h2><FormattedMessage
                    id={"Privacy.Pres.Title"}
                    defaultMessage={" Présentation du site internet"}
                />
                </h2>
                <p><FormattedMessage
                    id={"Privacy.Pres.Text.1"}
                    defaultMessage={"En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet Kwili l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi:"}
                />
                </p>
                <ul>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Pres.Text.2"}
                            defaultMessage={"Propriétaire : KWILI"}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Pres.Text.3"}
                            defaultMessage={"Responsable publication et webmaster : Kwili - adm.kwili@gmail.com"}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Pres.Text.4"}
                            defaultMessage={"Hébergeur : Microsoft Azure"}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Pres.Text.5"}
                            defaultMessage={"Délégué à la protection des données : Kwili - adm.kwili@gmail.com"}
                        />
                    </li>
                </ul>
                <p>
                    <FormattedMessage
                        id={"Privacy.Pres.Text.6"}
                        defaultMessage={"Le site est hébergé chez un prestataire sur le territoire de l’Union Européenne conformément aux dispositions du Règlement Général sur la Protection des Données (RGPD : n° 2016-679), et fait partie des Hébergeurs de Données de Santé (HDS) certifiés, en respect du Code de la Santé Publique Français (Article L.1111-8)."}
                    />
                </p>

                <h2>
                    <FormattedMessage
                        id={"Privacy.Management.Title"}
                        defaultMessage={"Gestion des données personnelles"}
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id={"Privacy.Management.Text"}
                        defaultMessage={"Le Client est informé des réglementations concernant la communication marketing, la loi du 21 Juin 2014 pour la confiance dans l'Économie Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du Règlement Général sur la Protection des Données (RGPD : n° 2016-679)."}
                    />
                </p>

                <h2>
                    <FormattedMessage
                        id={"Privacy.Resp.Title"}
                        defaultMessage={"Responsables de la collecte des données personnelles"}
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id={"Privacy.Resp.Text.1"}
                        defaultMessage={"Pour les données personnelles collectées dans le cadre de la création du compte personnel de l’utilisateur et de sa navigation sur le site, le responsable du traitement des données personnelles est : KWILI, représenté par Philippe de Sousa Violante, son représentant légal."}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id={"Privacy.Resp.Text.2"}
                        defaultMessage={"En tant que responsable du traitement des données qu’il collecte, Kwili s’engage à respecter le cadre des dispositions légales en vigueur. Il lui appartient de fournir à ses utilisateurs, à partir de la collecte de leurs consentements, une information complète sur le traitement de leurs données personnelles et de maintenir un registre des traitements conforme à la réalité. Chaque fois que Kwili traite des Données Personnelles, Kwili prend toutes les mesures raisonnables pour s’assurer de l’exactitude et de la pertinence des Données Personnelles au regard des finalités pour lesquelles elles sont traitées."}
                    />
                </p>

                <h2>
                    <FormattedMessage
                        id={"Privacy.Data.Nature.Title"}
                        defaultMessage={"Nature et finalité des données collectées"}
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id={"Privacy.Data.Nature.Text.1"}
                        defaultMessage={"Kwili est susceptible de traiter tout ou partie des données suivantes:"}
                    />
                </p>

                <ul>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Data.Nature.Text.2"}
                            defaultMessage={"Pour mener des enquêtes de satisfaction et améliorer l’expérience utilisateur : Nom et adresse email des utilisateurs en cas d’envoie de message par le formulaire de contact. Ces données sont conservées un maximum de 12 mois."}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Data.Nature.Text.3"}
                            defaultMessage={"Pour améliorer les performances de notre carte et l’expérience utilisateur : géolocalisation (optionnelle). Ces données ne sont jamais conservées."}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Data.Nature.Text.4"}
                            defaultMessage={"Pour améliorer les performances de notre aide à la décision : données de santé (optionnelles). Ces données sont traitées uniquement le temps de la conversation avec le chatbot et ne sont pas conservées."}
                        />
                    </li>
                </ul>
                <p>
                    <FormattedMessage
                        id={"Privacy.Data.Nature.Text.5"}
                        defaultMessage={"Ces données sont collectées selon la base légale du consentement de l'utilisateur. Kwili ne commercialise pas vos données personnelles qui sont donc uniquement utilisées par nécessité."}
                    />
                </p>


                <h2>
                    <FormattedMessage
                        id={"Privacy.Security.Title"}
                        defaultMessage={"Sécurité"}
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id={"Privacy.Security.Text.1"}
                        defaultMessage={"Pour assurer la sécurité et la confidentialité des Données Personnelles et des Données Personnelles de Santé, Kwili prend toutes les mesures raisonnables visant à les protéger contre toute perte, utilisation détournée, accès non autorisé, divulgation, altération ou destruction."}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id={"Privacy.Security.Text.2"}
                        defaultMessage={"Kwili s’engage à prendre toutes les précautions nécessaires afin de préserver la sécurité des Informations et notamment qu’elles ne soient pas communiquées à des personnes non autorisées. Cependant, si un incident impactant l’intégrité ou la confidentialité des Informations des utilisateurs est portée à la connaissance de Kwili, Kwili en informera dans les meilleurs délais les utilisateurs et lui communiquera les mesures de corrections prises."}
                    />
                </p>

                <h2>
                    <FormattedMessage
                        id={"Privacy.Rights.Title"}
                        defaultMessage={"Droits des utilisateurs"}
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id={"Privacy.Rights.Text.1"}
                        defaultMessage={"Conformément à la loi “Informatique et Liberté” et au Règlement Général sur la Protection des Donnée, les utilisateurs de Kwili disposent des droits suivants :"}
                    />
                </p>
                <ul>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Rights.Text.2"}
                            defaultMessage={"droit d'accès, de rectification, et de mise à jour des données des utilisateurs "}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Rights.Text.3"}
                            defaultMessage={"droit de verrouillage ou d’effacement des données des utilisateurs à caractère personnel, lorsqu’elles sont inexactes, incomplètes, équivoques, périmées, ou dont la collecte, l'utilisation, la communication ou la conservation est interdite."}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Rights.Text.4"}
                            defaultMessage={"droit de retirer à tout moment un consentement au traitement de leur données personnelles"}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Rights.Text.5"}
                            defaultMessage={"droit à la limitation du traitement de leurs données"}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Rights.Text.6"}
                            defaultMessage={"droit d’opposition au traitement de leurs données"}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Rights.Text.7"}
                            defaultMessage={"droit à la portabilité des données que les Utilisateurs auront fournies, lorsque ces données font l’objet de traitements automatisés fondés sur leur consentement ou sur un contrat"}
                        />
                    </li>
                    <li>
                        <FormattedMessage
                            id={"Privacy.Rights.Text.8"}
                            defaultMessage={"droit de définir le sort des données des Utilisateurs après leur mort et de choisir à qui Kwili devra communiquer (ou non) ses données à un tiers qu’il aura préalablement désigné. Dès que Kwili a connaissance du décès d’un Utilisateur et à défaut d’instructions de sa part, Kwili s’engage à détruire ses données."}
                        />
                    </li>
                </ul>
                <p>
                    <FormattedMessage
                        id={"Privacy.Rights.Text.9"}
                        defaultMessage={"Si l’Utilisateur souhaite savoir comment Kwili utilise ses données personnelles, demander à demander leur rectification ou leur effacement, l’Utilisateur peut contacter le DPO à l’adresse suivante : adm.kwili@gmail.com"}
                    />
                </p>
                <p>
                    <FormattedMessage
                        id={"Privacy.Rights.Text.10"}
                        defaultMessage={"Dans ce cas, l’Utilisateur doit indiquer les Données Personnelles qu’il souhaiterait que Kwili corrige, mette à jour ou supprime, en s’identifiant précisément avec une copie d’une pièce d’identité"}
                    />
                </p>


                <h2>
                    <FormattedMessage
                        id={"Privacy.Providers.Title"}
                        defaultMessage={"Consulter les règles de confidentialités des services de nos prestataires:"}
                    />
                </h2>
                <ul>
                    <li>
                        <a href={"https://policies.google.com/privacy?hl=en"}>
                            <FormattedMessage
                                id={"Privacy.Providers.Text.1"}
                                defaultMessage={"Google Maps (service de carte)"}
                            />
                        </a>
                    </li>
                    <li>
                        <a href={"https://devcenter.heroku.com/articles/security-privacy-compliance"}>
                            <FormattedMessage
                                id={"Privacy.Providers.Text.2"}
                                defaultMessage={"Heroku (hébergement du chatbot)"}
                            />
                        </a>
                    </li>
                    <li>
                        <a href={"https://privacy.microsoft.com/en-us/privacystatement"}>
                            <FormattedMessage
                                id={"Privacy.Providers.Text.3"}
                                defaultMessage={"Microsoft Azure (hébergement du site)"}
                            />
                        </a>
                    </li>
                </ul>

                <h2>
                    <FormattedMessage
                        id={"Privacy.Litigation.Title"}
                        defaultMessage={"Litige"}
                    />
                </h2>
                <p>
                    <FormattedMessage
                        id={"Privacy.Litigation.Text"}
                        defaultMessage={"En cas de différend, l’utilisateur peut déposer une plainte auprès de la CNIL."}
                    />
                </p>

            </div>

        </div>
    )
};
