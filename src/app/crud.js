const router = require('express').Router();

var primaryData = [];

router.get('/get-info', function (req, res) {
    try {
        return res.status(200).json({
            "message": "Data Fetched Successfully",
            "statusCode": 200,
            primaryData: primaryData
        });
    } catch {
        console.log(`Get info Error ${error}`);
        return res.status(500).json({
            "message": "Failed to fetch info",
            "statusCode": 500
        });
    }
});

module.exports = router;
