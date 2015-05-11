/// <reference path="toastr.min.js" />

function connectionControl() {
	var MongoClient = require('mongodb').MongoClient,
		assert = require('assert');

	var url = 'mongodb://localhost:27017/murilogames';

	var _findUser = function (db, user, password, success, error) {
		var password = CryptoJS.MD5(password).toString();
		var cursor = db.collection('users').find({ "user": user, "password": password });
		cursor.each(function (err, doc) {
			if (doc != null) {
				success(doc);
				db.close();
			} else {
				error();
			}
		});
	};
	var _insertService = function (db, object, success, error) {
		var collection = db.collection('services');
		collection.insert(object, function (err, result) {
			if (result != null) {
				success(result);
				db.close();
			} else {
				error(err);
			}
		});
	}
	var _getServicesFromDate = function (db, date, success) {
		var collection = db.collection('services');
		collection.find({ "date": date }).toArray(function (err, docs) {
			assert.equal(err, null);
			if (docs != null) {
				db.close();
				success(docs);
			}
		});
	};	
	var _countServices = function (db, success) {
		var collection = db.collection('services');
		collection.count(function(err, count) {
			assert.equal(err, null);
			success(count);
			db.close();
		});
	}
	var _getAllServices = function (db, success) {
		var collection = db.collection('services');
		collection.find({ }).toArray(function (err, docs) {
			assert.equal(err, null);
			if (docs != null) {
				db.close();
				success(docs);
			}
		});
	}
	
	this.findUser = function (user, password, success, error) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_findUser(db, user, password, success, error);
		});
	}

	this.insertService = function (object, success, error) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_insertService(db, object, success, error);
		});
	}
	this.getServicesFromDate = function (date, success) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_getServicesFromDate(db, date, success);
		});
	}
	this.countServices = function(success){
		//db.getCollection('services').count({})
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_countServices(db, success);
		});
	}
	this.getAllServices = function(success){
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_getAllServices(db, success);
		});
	}
	
	
	
	

	/*var insertDocuments = function (db, callback) {
		// Get the documents collection
		var collection = db.collection('documents');
		// Insert some documents
		collection.insert([
			{ a: 1 }, { a: 2 }, { a: 3 }
		], function (err, result) {
				assert.equal(err, null);
				assert.equal(3, result.result.n);
				assert.equal(3, result.ops.length);
				console.log("Inserted 3 documents into the document collection");
				callback(result);
			});
	}
	MongoClient.connect(url, function (err, db) {
		assert.equal(null, err);
		console.log("Connected correctly to server");

		insertDocuments(db, function () {
			db.close();
		});
	});*/
}