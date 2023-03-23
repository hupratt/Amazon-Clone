// const express = require("express");
import express from 'express';
const imageRouter = express.Router();
import imageUploadController from "../controller/image-upload-controller.js"
import { isAuth } from '../utils.js';



// imageRouter.route('/upload').post(protect, imageUploadController.uploadFile);


imageRouter.post('/', isAuth ,imageUploadController);

export default imageRouter;
