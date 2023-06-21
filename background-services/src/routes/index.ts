import { changePassword } from './../controllers/changePassword';
import { Router } from "express";
import { confirmEmail } from "../controllers/confirmEmail";

export const emailRoute = Router()
emailRoute.post('/:token', confirmEmail)

export const passwordRoute = Router()
passwordRoute.post('/:token', changePassword)