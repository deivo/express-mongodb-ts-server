"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const HttpException_1 = __importDefault(require("./exceptions/HttpException"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const userController = __importStar(require("./controller/user"));
const sliderController = __importStar(require("./controller/slider"));
const lessonController = __importStar(require("./controller/lesson"));
require("dotenv/config");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const models_1 = require("./models");
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, "public", "uploads"),
    filename(_req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
const upload = multer_1.default({ storage });
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "public")));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (_req, res) => {
    res.json({ success: true, message: "hello world" });
});
app.get("/user/validate", userController.validate);
app.post("/user/register", userController.register);
app.post("/user/login", userController.login);
app.post("/user/uploadAvatar", upload.single("avatar"), userController.uploadAvatar);
app.get('/slider/list', sliderController.list);
app.get("/lesson/list", lessonController.list);
app.use((_req, _res, next) => {
    const error = new HttpException_1.default(404, "Route not found");
    next(error);
});
app.use(errorMiddleware_1.default);
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 8000;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.set("useNewUrlParser", true);
        mongoose_1.default.set("useUnifiedTopology", true);
        yield mongoose_1.default.connect("mongodb://localhost/shop");
        yield createSliders();
        yield createLessons();
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`);
        });
    });
})();
function createSliders() {
    return __awaiter(this, void 0, void 0, function* () {
        const sliders = yield models_1.Slider.find();
        if (sliders.length == 0) {
            const sliders = [
                { url: 'http://img.zhufengpeixun.cn/post_reactnative.png' },
                { url: 'http://img.zhufengpeixun.cn/post_react.png' },
                { url: 'http://img.zhufengpeixun.cn/post_vue.png' },
                { url: 'http://img.zhufengpeixun.cn/post_wechat.png' },
                { url: 'http://img.zhufengpeixun.cn/post_architect.jpg' }
            ];
            models_1.Slider.create(sliders);
        }
    });
}
function createLessons() {
    return __awaiter(this, void 0, void 0, function* () {
        const lessons = yield models_1.Lesson.find();
        if (lessons.length == 0) {
            const lessons = [
                {
                    order: 1,
                    title: "1.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥100.00元",
                    category: "react",
                },
                {
                    order: 2,
                    title: "2.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥200.00元",
                    category: "react",
                },
                {
                    order: 3,
                    title: "3.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥300.00元",
                    category: "react",
                },
                {
                    order: 4,
                    title: "4.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥400.00元",
                    category: "react",
                },
                {
                    order: 5,
                    title: "5.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥500.00元",
                    category: "react",
                },
                {
                    order: 6,
                    title: "6.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥100.00元",
                    category: "vue",
                },
                {
                    order: 7,
                    title: "7.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥200.00元",
                    category: "vue",
                },
                {
                    order: 8,
                    title: "8.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥300.00元",
                    category: "vue",
                },
                {
                    order: 9,
                    title: "9.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥400.00元",
                    category: "vue",
                },
                {
                    order: 10,
                    title: "10.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥500.00元",
                    category: "vue",
                },
                {
                    order: 11,
                    title: "11.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥600.00元",
                    category: "react",
                },
                {
                    order: 12,
                    title: "12.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥700.00元",
                    category: "react",
                },
                {
                    order: 13,
                    title: "13.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥800.00元",
                    category: "react",
                },
                {
                    order: 14,
                    title: "14.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥900.00元",
                    category: "react",
                },
                {
                    order: 15,
                    title: "15.React全栈架构",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/react_poster.jpg",
                    url: "http://img.zhufengpeixun.cn/react_url.png",
                    price: "¥1000.00元",
                    category: "react",
                },
                {
                    order: 16,
                    title: "16.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥600.00元",
                    category: "vue",
                },
                {
                    order: 17,
                    title: "17.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥700.00元",
                    category: "vue",
                },
                {
                    order: 18,
                    title: "18.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥800.00元",
                    category: "vue",
                },
                {
                    order: 19,
                    title: "19.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥900.00元",
                    category: "vue",
                },
                {
                    order: 20,
                    title: "20.Vue从入门到项目实战",
                    video: "http://img.zhufengpeixun.cn/gee2.mp4",
                    poster: "http://img.zhufengpeixun.cn/vue_poster.png",
                    url: "http://img.zhufengpeixun.cn/vue_url.png",
                    price: "¥1000.00元",
                    category: "vue",
                },
            ];
            models_1.Lesson.create(lessons);
        }
    });
}
//# sourceMappingURL=index.js.map