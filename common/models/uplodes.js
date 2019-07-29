"use strict";
var multer = require("multer");

module.exports = function(Uplodes) {
    
  /**
   *
   * @param {object} file
   * @param {object} req
   * @param {object} res
   * @param {Function(Error, object)} callback
   */

  var uploadedFileName = "";
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
      uploadedFileName = file.fieldname + "-" + Date.now();
      cb(null, file.fieldname + "-" + Date.now());
    }
  });

  Uplodes.upload = function(file, req, res, cb) {
    var upload = multer({
      storage: storage
    }).array("file", 12);
    upload(req, res, function(err) {
      if (err) {
        res.json(err);
      }
      res.json(uploadedFileName);
    });
    // cb(null, {'response': 'ok'});
  };

  Uplodes.remoteMethod("upload", {
    http: { path: "/upload", verb: "post" },
    accepts: [
      { arg: "file", type: "file", http: { source: "form" } },
      { arg: "req", type: "object", http: { source: "req" } },
      { arg: "res", type: "object", http: { source: "res" } }
    ],
    returns: {
      arg: "result",
      type: "string"
    }
  });
};
