import React, { Component } from "react";
import KwiliChat from "./Api";
import {
  Widget,
  addResponseMessage,
  setQuickButtons,
  addUserMessage,
  dropMessages,
  toggleWidget,
  toggleMsgLoader,
} from "react-chat-widget";
import { FormattedMessage } from 'react-intl';
import KwiliLogo from "../../Images/doctor.png";

import anchorme from "anchorme";
import "react-chat-widget/lib/styles.css";
import "../Chat/ChatBotWidget.scss";

import locale_en from "../../Translations/en.json";
import locale_fr from "../../Translations/fr.json";

const data = {
    'fr': locale_fr,
    'en': locale_en
  };
//import { propTypes } from "react-bootstrap/esm/Image";

/**
 * @module
 */

export default class ChatBotWidget extends Component {
  /**
   * @class
   * @param props
   */
  constructor(props) {
    super(props);
    this.fullscreen = props.fullscreen;
    this.waitingReply = false;
    this.state = {
      badge: 0,
    };
    this.widget = (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        handleQuickButtonClicked={this.handleQuickButton}
        profileAvatar={KwiliLogo}
        showCloseButton={!this.fullscreen}
        title={<FormattedMessage id="Chat.Title" defaultMessage="Chat en ligne" />}
        subtitle={<FormattedMessage id="Chat.Subtitle" defaultMessage="Expliquez-nous votre problème" />}
        senderPlaceHolder="Aa"
      />
    );
    if (this.fullscreen) {
      toggleWidget();
    }
  }

  /**
   * Rafraîchit l'affichage des boutons de selection rapide
   */
  refreshQuickButtons = (quick_replies) => {
    if (quick_replies) {
      setQuickButtons(quick_replies.map(({title, value}) => ({label: title, value: value})));
    } else {
      setQuickButtons([]);
    }
  };

  /**
   * Envoie un message au chatbot
   * @param {string} msg - message à envoyer
   */
  handleQuickButton = (msg) => {
    addUserMessage(msg);
    this.handleNewUserMessage(msg);
  };

  /**
   * Callback executé lors de la reception d'un message
   * Si le message est une question, cela active le badge de notification
   * @param {string} msg - message reçu depuis le backend
   */
  messageReceived = ({question, quick_replies, ...res}) => {
    const list = anchorme.list(question);
    for (let i = 0; i < list.length; ++i) {
      question = question.replace(
        list[i].string,
        `[${list[i].string}](${list[i].string})`
      );
    }
    addResponseMessage(question);
    this.refreshQuickButtons(quick_replies);
    if (question.indexOf("?") !== -1) {
      this.setState({
        badge: this.state.badge + 1,
      });
    }
    if (this.waitingReply) {
      this.waitingReply = false;
      toggleMsgLoader();
    }
  };

  componentDidMount() {
   // let welcomeMsg = "";
    const language = navigator.language.split(/[-_]/)[0];

    dropMessages();
    this.chat = new KwiliChat(this.messageReceived, language);
    this.refreshQuickButtons();

    console.log(data[language]);

    if (language === "en") {
      addResponseMessage(data[language]["Chat.WelcomeMsg"]);
    } else {
      addResponseMessage(data["fr"]["Chat.WelcomeMsg"]);
    }
  }

  /**
   * Envoie le message de l'utilisateur au backend
   * Si il s'agit d'une question comme "qui est ton boss ultime ?", le bot répond directement
   * @param {string} newMessage - message écrit par l'utilisateur
   */
  handleNewUserMessage = (newMessage) => {
    this.chat.send(newMessage);
    this.setState({
      badge: 0,
    });
    if (this.waitingReply === false) {
      this.waitingReply = true;
      toggleMsgLoader();
    }
  };

  render() {
    return <div>{this.widget}</div>;
  }
}