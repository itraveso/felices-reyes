var Model = require("./Base"),
	crypto = require("crypto"),
	model = new Model();
var	itemsData = [
		{ID: 1, title: "Sartén", noLlevar: true}, 
	    {ID: 2, title: "Abrigo", noLlevar: false},
		{ID: 3, title: "Salsa de Soja", noLlevar: true},
		{ID: 4, title: "Protector solar", noLlevar: true},
		{ID: 5, title: "Un Cactus", noLlevar: true},
		{ID: 6, title: "Cámara de fotos", noLlevar: false},
		{ID: 7, title: "Bikini", noLlevar: false},
		{ID: 8, title: "Ropa Interior", noLlevar: false},
		{ID: 9, title: "DNI/Pasaporte", noLlevar: false},
		{ID: 10, title: "Rueda de repuesto", noLlevar: true},
		{ID: 11, title: "Maleta", noLlevar: false},
		{ID: 12, title: "Video con los mejores momentos de Chicote", noLlevar: true},
		{ID: 13, title: "Garbanzos", noLlevar: true}
	];
	
var ContentModel = model.extend({
	insert: function(data, callback) {
		this.collection().insert(data, {}, callback || function(){ });
	},
	update: function(data, callback) {
		this.collection().update({ID: data.ID}, data, {}, callback || function(){ });	
	},
	getlist: function(callback, query) {
		this.collection().find(query || {}).toArray(callback);
	},
	remove: function(ID, callback) {
		this.collection().findAndModify({ID: ID}, [], {}, {remove: true}, callback);
	},
	cleanupItems: function(callback) {
	   	for(var i = 0; i < itemsData.length; i++) {
			this.remove(itemsData[i].ID, callback);
		}
	},
	prePopulate: function(callback) {
		for(var i = 0; i < itemsData.length; i++) {
			this.insert(itemsData[i], callback);
		}
	}
});
module.exports = ContentModel;