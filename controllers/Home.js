var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "Home",
	content: null,
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		this.getContent(function() {
			var v = new View(res, 'home');
			v.render(self.content);
		})
	},
	getContent: function(callback) {
		var self = this;
		this.content = {};
		model.getlist(function(err, records) {
			if(records.length > 0) {
				self.content.bannerTitle = records[0].title;
				self.content.bannerText = records[0].text;
			}
			model.getlist(function(err, records) {
				var blogArticles = '<div class="item">Como te has portado muy bien, este año tienes regalo, pero primero deberás completar un quiz para poder revelarlo</div>';
				self.content.blogArticles = blogArticles;
				callback();
			}, { type: 'blog' });
		}, { type: 'home' });
	}
});