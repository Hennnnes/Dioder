/*
based on
- https://medium.com/fuzz/hello-alexa-building-your-first-alexa-skill-61764214546
- http://slides.com/maidoesthings/hello-alexa#/21

*/

'use strict';

const Alexa = require('alexa-sdk');
const request = require('request');
const storage = require('./storage');



exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
}

const handlers = {
    'LaunchRequest': () => {
        const helloMsg = 'Hello! What color should I choose?';
        this.emit(':ask', helloMsg, 'Try again');
    },

    'SetColor': () => {
        const color = this.event.request.intent.slots.color.value;
        let response = '';

        storage.save(color, this.event.session, (color) => {
            response = `Ok! ${color} set`;
            this.emit(':tell', response);
        });
    },

    'GetCurrentColor': () => {
        const color = this.event.request.intent.slots.color.value;
        let response = '';

        storage.getColor(this.event.session, (color) => {
            response = `Currenct color is ${color}`;
            this.emit(':tell', response);
        });
    },

    'Unhandled': () => {
        this.emit(':ask', 'Sorry I didn\'t get that', 'Try setting a color');
    },

    'Amazon.HelpIntent': () => {
        this.emit(':ask', 'Tell me what color to set the lights to', 'try again');
    },

    'Amazon.StopIntent': () => {
        const stop = 'Lights turned off';
        this.emit(':tell', say);
    }
}
