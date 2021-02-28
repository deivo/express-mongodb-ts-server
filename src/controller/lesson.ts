import { Request, Response } from "express";
import { Lesson, ILessonDocument } from "../models";
import { FilterQuery } from 'mongoose'
export const list = async (req: Request, res: Response) => {
  let { category } = req.query;  // 获取 分类
  let offset: any = req.query.offset; // 偏移量索引
  let limit: any = req.query.limit;  // 取多少条
  offset = isNaN(offset) ? 0 : parseInt(offset); //偏移量
  limit = isNaN(limit) ? 5 : parseInt(limit); //每页条数
  let query: FilterQuery<ILessonDocument> = {};
  if (category && category != "all") query.category = category as string;
  const total = await Lesson.count(query);
  const list = await Lesson.find(query).sort({ order: 1 }).skip(offset).limit(limit);
  const newList = list.map((item: ILessonDocument) => item.toJSON())
  setTimeout(function () {
    res.json({ success: true, data: { list: newList, hasMore: total > offset + limit } })
  })
};
export const get = async (req: Request, res: Response) => {
  let id = req.params.id;
  let lesson = await Lesson.findById(id);
  res.json({ success: true, data: lesson });
};