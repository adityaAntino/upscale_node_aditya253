const axios = require('axios')

exports.getDataAxios = async (req, res) => {
        axios.get('https://dummyjson.com/products').then(response => {
            console.log('API CALLED',response);
            res.status(200).json({
                message: "Successfully fetched data",
                code: 200,
                data: response.data
            })
        }).catch(error=>{
            res.status(500).json({
                message: "Failed to call axios",
                error:error,
                code: 500
            });
        });

}