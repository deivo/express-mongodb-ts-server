"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.list = void 0;
const models_1 = require("../models");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { category } = req.query;
    let offset = req.query.offset;
    let limit = req.query.limit;
    offset = isNaN(offset) ? 0 : parseInt(offset);
    limit = isNaN(limit) ? 5 : parseInt(limit);
    let query = {};
    if (category && category != "all")
        query.category = category;
    let total = yield models_1.Lesson.count(query);
    let list = yield models_1.Lesson.find(query)
        .sort({ order: 1 })
        .skip(offset)
        .limit(limit);
    list = list.map((item) => item.toJSON());
    setTimeout(function () {
        res.json({ code: 0, data: { list, hasMore: total > offset + limit } });
    }, 1000);
});
exports.list = list;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let lesson = yield models_1.Lesson.findById(id);
    res.json({ success: true, data: lesson });
});
exports.get = get;
//# sourceMappingURL=lesson.js.map