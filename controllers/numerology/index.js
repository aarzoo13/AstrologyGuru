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
const NumerologiesDB = mongoosemodel.NumerologiesDB;
// .getting mongoose schema from mongoosemodel



// fetch date based numerology
router.get("/date", upload.none(), (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    async function fetchNumerology() {
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

                if (parseInt(req.query.date.trim()) >= 1 && parseInt(req.query.date.trim()) < 10) {
                    var result = await NumerologiesDB.find({
                        life_number: { $eq: req.query.date.trim() }
                    });
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
                            message: "Numerology Details",
                            data: result
                        };
                        res.status(200).send(api_response);
                    }
                } else {
                    var api_response = {
                        status: "400",
                        message: "Please enter all details",
                        data: []
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
    fetchNumerology();
});

module.exports = router;