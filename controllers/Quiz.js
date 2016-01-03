var BaseController = require("./Base"),
    View = require("../views/Base"),
    model = new (require("../models/ContentModel"));
    
module.exports = BaseController.extend({ 
    name: "Quiz",
    run: function(req, res, next) {
        var v = new View(res, 'quiz');
        var self = this;
        model.setDB(req.db);
        model.cleanupItems(function(){});
        model.prePopulate(function(){});
        self.form(req, res, function(formMarkup) {
           self.list(function(listMarkup) {
                v.render({
                    title: 'Quiz',
                    content: 'Bienvenida al Quiz',
                    list: listMarkup,
                    form: formMarkup
                }); 
            }); 
        });
        
    },
    list: function(callback) {
        
		model.getlist(function(err, records) {
			var markup = '<p>Selecciona los items que NO te llevarías a Praga en Febrero:</p>';
			
			for(var i=0; record = records[i]; i++) {
				markup += '\
				<br>\
				<input type="checkbox" name="' + record.id + '" value="' + record.id + '">' + record.title;
			}
			markup += '<br><br><input type="submit" value="Verificar">';
			callback(markup);
		})
	},
    form: function(req, res, callback) {
		var returnTheForm = function() {
			if(req.query && req.query.action === "edit" && req.query.id) {
				model.getlist(function(err, records) {
					if(records.length > 0) {
						var record = records[0];
						res.render('admin-record', {
							ID: record.ID,
							text: record.text,
							title: record.title,
							type: '<option value="' + record.type + '">' + record.type + '</option>',
							picture: record.picture,
							pictureTag: record.picture != '' ? '<img class="list-picture" src="' + record.picture + '" />' : ''
						}, function(err, html) {
							callback(html);
						});
					} else {
						res.render('admin-record', {}, function(err, html) {
							callback(html);
						});
					}
				}, {ID: req.query.id});
			} else {
				res.render('admin-record', {}, function(err, html) {
					callback(html);
				});
			}
		}
		if(req.body && req.body.formsubmitted && req.body.formsubmitted === 'yes') {
			var data = {
				title: req.body.title,
				text: req.body.text,
				type: req.body.type,
				picture: this.handleFileUpload(req),
				ID: req.body.ID
			}
			model[req.body.ID != '' ? 'update' : 'insert'](data, function(err, objects) {
				returnTheForm();
			});
		} else {
			returnTheForm();
		}
	},
});