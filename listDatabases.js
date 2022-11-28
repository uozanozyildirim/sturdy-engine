
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURl = 'mongodb+srv://uozanozyildirim:lfI6lEf55sUd127P@to-do-database.ky4ux0b.mongodb.net/?retryWrites=true&w=majority';
const databaseName = 'tasks';

MongoClient.connect(
	connectionURl,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log('unable to connect to database');
		}

		const db = client.db(databaseName);

		db.collection('data').insertOne({
			name: 'user',
			age: 24,
		});
	}
);