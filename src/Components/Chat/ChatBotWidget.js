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
import KwiliLogo from "../../Images/doctor.png";

import anchorme from "anchorme";
import "react-chat-widget/lib/styles.css";
import "../Chat/ChatBotWidget.scss";

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
        title="Chat en ligne"
        subtitle="Expliquez-nous votre problème"
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
      setQuickButtons(quick_replies['fr'].map(({title, value}) => ({label: title, value: value})));
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
    dropMessages();
    this.chat = new KwiliChat(this.messageReceived);
    this.refreshQuickButtons();
    addResponseMessage(
      "Bonjour et bienvenue sur Kwili ! Je suis Emma, votre assistante virtuelle"
    );
  }

  /**
   * Envoie le message de l'utilisateur au backend
   * Si il s'agit d'une question comme "qui est ton boss ultime ?", le bot répond directement
   * @param {string} newMessage - message écrit par l'utilisateur
   */
  handleNewUserMessage = (newMessage) => {
    if (
      (newMessage.indexOf("boss") !== -1 || newMessage.indexOf("maitre")) !==
        -1 &&
      (newMessage.indexOf("ultime") !== -1 ||
        newMessage.indexOf("absolu") !== -1)
    ) {
      addResponseMessage("Mon maitre ultime est Leandre");
      return;
    }
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
