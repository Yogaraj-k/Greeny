const userProductDetails = require("../models/userProductCardDetails");
const asyncHandler = require("../middlewares/catchAsyncError");
const fs = require("fs");
const productCardDatas = require("../routes/productCardRoute");
//const upload = require("../middlewares/multerMiddleWare");
exports.postProductCardDetailsControllers = async (req, res) => {
  const rating = req.body.rating;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const oldPrice = req.body.oldPrice;
  const newPrice = req.body.newPrice;
  const sale = req.body.sale;
  const newProduct = req.body.newProduct;
  const featuredItems = req.body.featuredItems;
  const discountPercentage = req.body.discountPercentage;
  console.log(sale, newProduct, featuredItems);

  let images = [];

  try {
    if (req.file) {
      const image = req.file.filename;
      console.log("Image received:", image);
    } else if (req.files) {
      images = req.files.map((file) => file.filename);
    }
    console.log("Images received:", images);

    userProductDetails.create({
      image: images.shift(), // it will give first element and remove the first element
      imageSlider: images,
      rating: rating,
      productName: productName,
      productDescription: productDescription,
      oldPrice: oldPrice,
      newPrice: newPrice,
      sale: sale,
      newProduct: newProduct,
      featuredItems: featuredItems,
      discountPercentage: discountPercentage,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

exports.getProductCardDetailsControllers = async (req, res) => {
  try {
    const products = await userProductDetails.find();
    res.json({ status: "ok", data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSearchDataControllers = asyncHandler(async (req, res, next) => {
  try {
    const products = await userProductDetails.find();
    const { q } = req.query;

    const filteredProducts = products.filter((product) => product.productName.toLowerCase().includes(q.toLowerCase()));

    res.json({ status: "ok", data: filteredProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exports.deleteProductCardDetailsControllers = async (req, res) => {
  try {
    const productDetails = await userProductDetails.findById(req.params.id);
    if (productDetails.image) {
      fs.unlinkSync("./uploads/productImage/" + productDetails.image);
    }
    if (productDetails.imageSlider && productDetails.imageSlider.length > 0) {
      productDetails.imageSlider.forEach((img) => {
        fs.unlinkSync("./uploads/productImage/" + img);
        console.log("Deleted Image: " + img);
      });
    }
    const deletedProduct = await userProductDetails.findByIdAndDelete(req.params.id);
    console.log("deleted product " + deletedProduct);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.updateProductCardDetailsControllers = async (req, res) => {
  const rating = req.body.rating;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const oldPrice = req.body.oldPrice;
  const newPrice = req.body.newPrice;
  const sale = req.body.sale;
  const newProduct = req.body.newProduct;
  const featuredItems = req.body.featuredItems;
  const discountPercentage = req.body.discountPercentage;
  console.log(req.params.id);
  // const imageName = req.files.map((img) => img.filename);
  // console.log(imageName);
  // console.log(req.body.upload);
  // if (imageName.length) {
  //   fs.unlinkSync("./uploads/productImage/" + req.body.upload);
  // }
  await userProductDetails.findByIdAndUpdate(req.params.id, {
    //image: imageName.shift(),
    rating: rating,
    productName: productName,
    productDescription: productDescription,
    oldPrice: oldPrice,
    newPrice: newPrice,
    sale: sale,
    newProduct: newProduct,
    featuredItems: featuredItems,
    discountPercentage: discountPercentage,
  });
  const doc1 = await userProductDetails.findById(req.params.id);
  console.log(doc1);
};

exports.deleteProductSliderImageControllers = async (req, res) => {
  const { id, index } = req.params;
  const doc = await userProductDetails.findById(id);
  fs.unlinkSync("./uploads/productImage/" + doc.imageSlider[index]);
  doc.imageSlider.splice(index, 1); // delete one elements starting from the mentioned index.
  await doc.save();
  console.log(doc.imageSlider);
};

exports.updateProductSliderImageControllers = async (req, res) => {
  console.log(req.params.id);
  let images = [];
  try {
    if (req.files) {
      images = req.files.map((file) => file.filename);
      const updatedImage = await userProductDetails.findByIdAndUpdate(req.params.id, { $push: { imageSlider: images } }, { new: true });
      res.json(updatedImage);
    }
    console.log("Updated Images:", images);
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

exports.deleteAllSliderImageControllers = async (req, res) => {
  const { id } = req.params;
  const doc = await userProductDetails.findById(id);
  doc.imageSlider.forEach((image) => {
    console.log(image);
    fs.unlinkSync("./uploads/productImage/" + image);
  });
  const result = await userProductDetails.findByIdAndUpdate(id, { imageSlider: [] }, { new: true });
  console.log(result);
};
exports.editSliderImageControllers = async (req, res) => {
  const { id, editId } = req.params;
  console.log(id);
  console.log(editId);

  try {
    let images;
    if (req.files) {
      images = req.files.map((file) => file.filename);
      console.log(images[0]);
    }

    const doc = await userProductDetails.findById(id);
    if (!doc) {
      return res.status(404).json({ error: "Product not found" });
    }
    const oldImage = doc.imageSlider[editId];
    fs.unlinkSync("./uploads/productImage/" + oldImage);
    doc.imageSlider[editId] = images[0];
    const result = await doc.save();
    console.log("Document updated:", result);
    res.status(200).json({ message: doc.imageSlider });
  } catch (error) {
    console.error("Error editing slider image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProductMainImageControllers = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    let images;
    if (req.files) {
      images = req.files.map((file) => file.filename);
      console.log(images[0]);
    }
    const doc = await userProductDetails.findById(id);
    fs.unlinkSync("./uploads/productImage/" + doc.image);
    doc.image = images[0];
    const result = await doc.save();
    console.log(result);

    return res.status(200).json({ image: result.image });
  } catch (error) {
    console.error("Error updating product main image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserDetails = async (req, res) => {
  const { productID } = req.params;
  console.log(productID);

  try {
    const productDetails = await userProductDetails.findById(productID);
    res.json({ status: "ok", data: productDetails });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.json({ error: "Internal Server Error" });
  }
};
