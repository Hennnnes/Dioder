// based on // based on https://medium.com/fuzz/hello-alexa-building-your-first-alexa-skill-61764214546

'use strict';
var AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-central-1',
    endpoint: 'https://dynamodb.eu-central-1.amazonaws.com'
});

var storage = (() => {
    var dynamodb = new AWS.DynamoDB.DocumentClient();

    return {
        save: function(color, session, callback) {
            var params = {
				TableName: 'faveColorList',
				Item: {
					UserId: session.user.userId,
					Color: color
				}
			};
			dynamodb.put(params, function(err, data) {
				callback(color);
			})
        },
        getColor: function(session, callback) {
            var params = {
                TableName: 'faveColorList',
                Key: {
                    UserId: session.user.userId,
                }
            };
            dynamodb.get(params, function(err, data) {
                callback(data.Item.Color);
            });
        }
    }
})();

module.exports = storage;
