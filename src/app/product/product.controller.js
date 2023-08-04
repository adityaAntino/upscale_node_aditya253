const Product = require('./product.schema')

exports.addProduct = async (req, res, next) => {
    console.log('add product called');
    const { product_name, price } = req.body
    try {
        if (req.user._id == null) {
            return res.status(400).json({
                message: "No User Found",
                statusCode: 400,
                query: {
                    product_name: product_name,
                    price: price
                }
            });
        }
        else if (product_name == null || price == null) {
            return res.status(400).json({
                message: "Product name & price is required",
                statusCode: 400,
                query: {
                    product_name: product_name,
                    price: price
                }
            });
        }
        else {
            const productExist = await Product.findOne({ product_name });
            if (productExist) {
                return res.status(400).json({
                    message: "Product already exist",
                    statusCode: 400,
                });
            } else {
                const newProduct = new Product({
                    product_name: product_name,
                    price: price,
                    added_by: req.user._id
                });
                const savedProduct = await newProduct.save();
                return res.status(200).json({
                    message: "Product added successfully",
                    statusCode: 200,
                    product: savedProduct,
                    query: {
                        product_name: product_name,
                        price: price
                    }
                });
            }
        }
    } catch (error) {
        console.log(`Add Product Error`, error);
        return res.status(500).json({
            message: "Add Product Failed",
            code: 500,
            error: error,
        });
    }
}

exports.deleteProduct = async (req, res, next) => {
    const { product_name } = req.body
    try {

        if (product_name == null) {
            return res.status(400).json({
                message: "Product name is required",
                statusCode: 400,
                query: {
                    product_name: product_name,
                    price: price
                }
            });
        } else {
            const productExist = await Product.findOne({ product_name });
            if (productExist) {
                const isDeleted = await Product.findByIdAndDelete(productExist._id);
                if (isDeleted) {
                    return res.status(200).json({
                        message: "Product deleted successfully",
                        statusCode: 200,
                        product_name: product_name
                    });
                } else {
                    return res.status(400).json({
                        message: "Failed to  delete product",
                        statusCode: 400,
                        product_name: product_name
                    });
                }
            } else {
                return res.status(400).json({
                    message: "Product not exist",
                    statusCode: 400,
                });
            }
        }
    } catch (error) {
        console.log(`Delete Product Error`, error);
        return res.status(500).json({
            message: "Delete Product Failed",
            code: 500,
            error: error,
        });
    }
}