const Product = require('../models/product.js')
const { ProductFilter } = require('../utils/productFilter.js')
const cloudinary = require('cloudinary').v2

const allProducts = async (req, res) => {
    const resultPerPage = 10
    const productFilter = new ProductFilter(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await productFilter.query()

    res.status(200).json({
        products
    })
}

const detailProducts = async (req, res) => {
    const product = await Product.findById(req.params.id)

    res.status(200).json({
        product
    })
}

// Admin
const createProduct = async (req, res) => {
    let images = [];
    if(typeof req.body.images === "string"){
        images.push(req.body.images)
    }else {
        images = req.body.images
    }

    let allImage = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products"
        })

        allImage.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = allImage

    const product = await Product.create(req.body)

    res.status(201).json({
        product
    })
}

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    product.remove();
    res.status(200).json({
        message: "Deleted the product."
    })
}

const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, })

    res.status(200).json({
        product
    })
}

module.exports = {allProducts, detailProducts, createProduct, deleteProduct, updateProduct}