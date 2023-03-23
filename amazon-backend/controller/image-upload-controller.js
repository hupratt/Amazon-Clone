// const path = require('path');
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import ffmpeg from "fluent-ffmpeg";
import fileUploadConfig from "../file-upload-config.js";
import expressAsyncHandler from "express-async-handler";

// expressAsyncHandler(async(req,res) => {
//   if(req.body.orderItems.length === 0){
//       res.status(400).send({
//           message: 'Cart is empty'
//       });
//   }
//   else{
//       const order = new Order({
//           orderItems: req.body.orderItems,
//           shippingAddress: req.body.shippingAddress,
//           paymentMethod: req.body.paymentMethod,
//           itemsPrice: req.body.itemsPrice,
//           shippingPrice: req.body.shippingPrice,
//           taxPrice: req.body.taxPrice,
//           totalPrice: req.body.totalPrice,
//           user: req.user._id
//       });
//       const createdOrder = await order.save();
//       res.status(201)
//       .send({message: "New order created.", order: createdOrder});
//   }
// })

const imageUploadController = expressAsyncHandler(async (req, res) => {
  var upload = multer(fileUploadConfig).single("image");
  console.log(upload)
  upload(req, res, async function (uploadError) {
    if (uploadError) {
      var errorMessage;
      if (uploadError.code === "LIMIT_FILE_TYPE") {
        errorMessage = uploadError.errorMessage;
      } else if (uploadError.code === "LIMIT_FILE_SIZE") {
        errorMessage =
          "Maximum file size allowed is " + process.env.FILE_SIZE + "MB";
      }
      return res.json({
        error: "unknown error throw",
      });
    }
    // console.log('=== req.file.path video-upload-controller.js [24] ===', req.file.path);
    // console.log('=== req.file.originalname video-upload-controller.js [25] ===', req.file.originalname);
    // console.log('=== req.user.id video-upload-controller.js [26] ===', req.user.id);
    // await ffmpeg(req.file.path).screenshots({
    //   // Will take screens at 20%, 40%, 60% and 80% of the video
    //   count: 4,
    //   folder: "public/uploads",
    //   filename: `${req.file.originalname}.png`,
    // });
    // const video = await Video.create({
    //   id: uuid.v4(),
    //   title: req.file.originalname,
    //   description: "",
    //   url: req.file.path.replace("public/static/", ""),
    //   thumbnail: `uploads/${req.file.originalname}_1.png`,
    //   createdAt: null,
    //   updatedAt: null,
    //   userId: req.user.id,
    // });

    res.status(200).json({ success: true });
  });
});

export default imageUploadController;
