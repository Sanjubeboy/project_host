import express from "express";
import {Updatestory} from "../controllers/Updatestory.js";

const router = express.Router()


router.post("/", Updatestory)


export default router