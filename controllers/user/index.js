const express = require("express");
const router = express.Router();
const isset = require("isset");
const mongoosemodel = require("../../models/mongoosemodel");
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();

// for parsing json data
router.use(bodyParser.json());
// for parsing form url-encoded
router.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart-formdata
// router.use(upload.array());
router.use(express.static("public"));

// getting mongoose schema from mongoosemodel
const UserQueriesDB = mongoosemodel.UserQueriesDB;
// .getting mongoose schema from mongoosemodel

// fetch name based zodiac
router.post("/query", upload.none(), (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    async function addUserQuery() {
        try {
            if (!isset(req.body.name) || !isset(req.body.email) || !isset(req.body.message)) {
                var api_response = {
                    status: "400",
                    message: "Please enter all details",
                    data: []
                };
                res.status(200).send(api_response);
            } else if (req.body.name.trim() == "" || req.body.email.trim() == "" || req.body.message.trim() == "") {
                var api_response = {
                    status: "400",
                    message: "Please enter all details",
                    data: []
                };
                res.status(200).send(api_response);
            } else {
                var result = await UserQueriesDB.insertMany({
                    name: req.body.name.trim(),
                    email: req.body.email.trim(),
                    message: req.body.message.trim(),
                });
                if (!result && result.length < 1) {
                    var api_response = {
                        status: "404",
                        message: "Please try again",
                        data: []
                    };
                    res.status(200).send(api_response);
                } else {
                    var api_response = {
                        status: "200",
                        message: "Query raised successfully",
                        data: result
                    };
                    res.status(200).send(api_response);
                }
            }
        } catch (e) {
            console.log(e);
            var api_response = {
                status: "500",
                message: "Error please try again...",
                data: []
            };
            res.status(200).send(api_response);
        }
    }
    addUserQuery();
});

module.exports = router;