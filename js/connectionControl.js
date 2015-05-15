/// <reference path="toastr.min.js" />
/// <reference path="md5.js" />


function connectionControl() {
	var MongoClient = require('mongodb').MongoClient,
		assert = require('assert');

	var url = 'mongodb://localhost:27017/murilogames';

	var _findUser = function (db, user, password, success, error) {
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
	var _findUsers = function (db, success, error) {
		var collection = db.collection('users');
		collection.count(function(err, count) {
			assert.equal(err, null);
			if(count != null)
				success(count);
			else
				error(err);
				
			db.close();
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
	};
	var _insertUser = function (db, object, success, error) {
		var collection = db.collection('users');
		collection.insert(object, function (err, result) {
			if (result != null) {
				success(result);
				db.close();
			} else {
				error(err);
			}
		});
	};
	var _getServicesFromDate = function (db, startDate, endDate, success) {
		var collection = db.collection('services');
		collection.find({ "date": {
			$gte: startDate,
			$lte: endDate
		}
		}).toArray(function (err, docs) {
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
	};
	var _getAllServices = function (db, success) {
		var collection = db.collection('services');
		collection.find({ }).toArray(function (err, docs) {
			assert.equal(err, null);
			if (docs != null) {
				db.close();
				success(docs);
			}
		});
	};
	
	this.findUser = function (user, password, success, error) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_findUser(db, user, password, success, error);
		});
	};
	this.findUsers = function (success, error) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_findUsers(db, success, error);
		});
	};
	this.insertService = function (object, success, error) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_insertService(db, object, success, error);
		});
	};
	this.insertUser = function (object, success, error) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_insertUser(db, object, success, error);
		});
	};
	this.getServicesFromDate = function (startDate, endDate, success) {
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_getServicesFromDate(db, startDate, endDate, success);
		});
	};
	this.countServices = function(success){
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_countServices(db, success);
		});
	};
	this.getAllServices = function(success){
		MongoClient.connect(url, function (err, db) {
			assert.equal(null, err);
			console.log("Connected correctly to server");
			_getAllServices(db, success);
		});
	};
}