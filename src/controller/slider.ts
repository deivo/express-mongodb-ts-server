import { Request, Response } from "express";
import { ISliderDocument, Slider } from "../models";

export const list = async (_req: Request, res: Response) => {
    let sliders: ISliderDocument[] = await Slider.find();
    res.json({ success: true, data: sliders })
}