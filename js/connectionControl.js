
function connectionControl() {
	this.findUser = function(user, password, callback){
		try {
			var databaseUrl = "MuriloGames"; // "username:password@example.com/mydb"
			var collections = ["usuarios"];
			var db = require("mongojs").connect(databaseUrl, collections);
			
			db.usuarios.find({user: user}, function(err, data) {
				if( err || !data){
					console.log("No female users found");
				}
				else{
					callback(data);			
				}
			});			
		} catch (error) {
			console.error(error);
		}
		
	} 
}





