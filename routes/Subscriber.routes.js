
import express from "express";
import { addSubscribeController } from "../controllers/Subscriber.Controller.js";

const subscriberRouter = express.Router();


//  @route POST /api/subscribe
//  @desc Handle newsLetter subscription
//  @access Public
subscriberRouter.post("/", addSubscribeController);





export default subscriberRouter;