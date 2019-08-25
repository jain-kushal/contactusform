var AWS = require('aws-sdk'),
	ses = new AWS.SES();

var SENDER = 'mr.kushaljain@gmail.com';

const ddb = new AWS.DynamoDB.DocumentClient();

const response = {
	isBase64Encoded: false,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		statusCode: 200,
		body: "{'result':'Success.'}"
	}
};
exports.handler = (event, context, callback) => {
	console.log('Received event', event);
	sendEmail(event, (err, data) => {
		context.done(err, null);
	});
	callback(null, response);
};

function insertIntoTable(data) {
	return ddb
		.put({
			TableName: 'ContactUs',
			Item: {
				contactus: new Date().getTime().toString(),
				Name: data.name,
				Phone: data.phone,
				Email: data.email,
				Message: data.desc
			}
		})
		.promise();
}

function sendEmail(event, done) {
	console.log('This is EVENT!!!!!!');
	console.log(event);

	var eventData = JSON.parse(event.body);
	console.log(eventData);

	var params = {
		Destination: {
			ToAddresses: [ eventData.email ]
		},
		Message: {
			Body: {
				Text: {
					Data:
						'Thanks for reaching out! We have received your message and following details:' +
						'\nName: ' +
						eventData.name +
						'\nPhone: ' +
						eventData.phone +
						'\nEmail: ' +
						eventData.email +
						'\nMessage: ' +
						eventData.desc +
						'\nOur representative will get back to you shortly.',
					Charset: 'UTF-8'
				}
			},
			Subject: {
				Data: 'Thank You: ' + eventData.name,
				Charset: 'UTF-8'
			}
		},
		Source: SENDER
	};
	console.log('THIS IS PARAMS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
	console.log(params.Message.Body.Text.Data);
	insertIntoTable(eventData).then(console.log('DynamoDB: SUCCESS')).catch((err) => {
		console.log(err);
	});
	ses.sendEmail(params, done);
}
