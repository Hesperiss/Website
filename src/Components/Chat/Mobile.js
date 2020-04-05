import React, { Component } from 'react';
import ChatBotWidget from './ChatBotWidget';

export default class MobileChat extends Component {
    render() {
        return (
            <div>
                <ChatBotWidget fullscreen={true} />
            </div>
        );
    }
};