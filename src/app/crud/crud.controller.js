const fs = require('fs');


var primaryData = [];
///GET ARRAY
exports.getInfo = async (req, res) => {
    try {
        console.log(`Get info called ${primaryData}`);

        return res.status(200).json({
            "message": "Data Fetched Successfully",
            "statusCode": 200,
            data: primaryData
        });
    } catch (error) {
        console.log(`Get info Error ${error}`);
        return res.status(500).json({
            "message": "Failed to fetch info",
            "statusCode": 500
        });
    }
};

///ADD SINGLE DATA
exports.addData = async (req, res) => {
    const { data } = req.body;
    try {
        if (data != null) {
            console.log(`ADD DATA CALLED ${data}`);
            primaryData.push(data);
            return res.status(200).json({
                message: "Data Added Successfully",
                data: primaryData
            });
        }
        else {
            return res.status(400).json({ "message": "Data is null" });
        }
    } catch (error) {
        console.log(`ADD DATA Error ${error}`);
        return res.status(500).json({
            "message": "Failed to add data",
            "statusCode": 500
        });
    }
};

///DELETE EVERYTHING
exports.deleteAll = async (req, res) => {
    try {
        console.log('Delete All Data Called');
        primaryData.pop();
        return res.status('200').json({
            message: "Data Deleted Successfully",
            data: primaryData
        });
    }
    catch (error) {
        console.log(`Delete Data Error ${error}`);
        return res.status(500).json({
            "message": "Failed to delete all data",
            "statusCode": 500
        });
    }
};

///DELETE ONLY ONE SET OF DATA
exports.deleteOne = async (req, res) => {
    const { value } = req.body;
    try {
        console.log(`Delete one called ${value}`);
        if (primaryData.includes(value) || value != null) {
            const dataIndex = primaryData.findIndex((item) => (value === item));
            if (dataIndex === -1) {
                return res.status(400).json({
                    message: "Index of value not available in array",
                    statusCode: 400
                });
            } else {
                primaryData.splice(dataIndex, 1);
                return res.status(200).json({
                    "message": "Singular Data Deleted Successfully",
                    data: primaryData
                });
            }
        } else {
            return res.status(400).json({
                message: "Value not available in array",
                statusCode: 400
            });
        }

    } catch (error) {
        console.log(`Delete Single Data Error ${error}`);
        return res.status(500).json({
            "message": "Failed to delete all data",
            "statusCode": 500
        });
    }
};

///UPDATE DATA AT INDEX
exports.updateData = async (req, res) => {
    const { previous, next } = req.body;
    try {
        console.log(`Update Data Called previous = ${previous} next = ${next}`);

        if (primaryData.includes(previous)) {
            const dataIndex = primaryData.findIndex((item) => (item === previous));

            if (dataIndex === -1) {
                res.status(400).json({
                    "message": "Index not available to update requested data",
                    "statusCode": 400,
                });
            }
            primaryData[dataIndex] = next;
            return res.status(200).json({
                "message": "Data updated successfully",
                data: primaryData
            });

        } else {
            res.status(400).json({
                "message": "Data Not Available to update",
                "statusCode": 400,
            });
        }
    }
    catch (error) {
        console.log(`Update Data Error ${error}`);
        return res.status(500).json({
            "message": "Failed to update data",
            "statusCode": 500
        });
    }
};

///UPDATING DATA TO LOCAL JSON FILE
exports.updateJson = async (req, res) => {
    const { dataToSave } = req.body;
    const jsonData = JSON.stringify(dataToSave, null, 2);
    try {
        const filePath = 'src/customPrimaryData.json';
        fs.writeFileSync(filePath, jsonData);
        return res.status(200).json({
            "message": "Data Added Successfully",
            data: dataToSave
        });
    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({
            statusCode: 500,
            message: "Failed to save data"
        });
    }
};