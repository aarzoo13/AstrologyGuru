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
const ZodiacSignsDB = mongoosemodel.ZodiacSignsDB;
// .getting mongoose schema from mongoosemodel

// fetch name based zodiac
router.get("/name", upload.none(), (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    async function fetchZodiacSign() {
        try {
            if (!isset(req.query.name)) {
                var api_response = {
                    status: "400",
                    message: "Please enter all details",
                    data: []
                };
                res.status(200).send(api_response);
            } else if (req.query.name.trim() == "") {
                var api_response = {
                    status: "400",
                    message: "Please enter all details",
                    data: []
                };
                res.status(200).send(api_response);
            } else {
                var result = await ZodiacSignsDB.find({ name: req.query.name.trim() });
                if (!result && result.length < 1) {
                    var api_response = {
                        status: "404",
                        message: "No details found",
                        data: []
                    };
                    res.status(200).send(api_response);
                } else {
                    var api_response = {
                        status: "200",
                        message: "Zodiac Sign Details",
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
    fetchZodiacSign();
});

// fetch date based zodiac
router.get("/date", upload.none(), (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    async function fetchZodiacSign() {
        try {
            if (!isset(req.query.date)) {
                var api_response = {
                    status: "400",
                    message: "Please enter all details1",
                    data: []
                };
                res.status(200).send(api_response);
            } else if (req.query.date.trim() == "") {
                var api_response = {
                    status: "400",
                    message: "Please enter all details",
                    data: []
                };
                res.status(200).send(api_response);
            } else {
                var result;
                if (parseInt(req.query.date.trim()) > 120 && parseInt(req.query.date.trim()) < 1222) {
                    result = await ZodiacSignsDB.find({
                        $and: [
                            { start_date: { $lte: req.query.date.trim() } },
                            { end_date: { $gte: req.query.date.trim() } }
                        ]
                    });
                } else {
                    result = await ZodiacSignsDB.find({ name: "Capricorn" });
                }
                if (!result && result.length < 1) {
                    var api_response = {
                        status: "404",
                        message: "No details found",
                        data: []
                    };
                    res.status(200).send(api_response);
                } else {
                    var api_response = {
                        status: "200",
                        message: "Zodiac Sign Details",
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
    fetchZodiacSign();
});

module.exports = router;