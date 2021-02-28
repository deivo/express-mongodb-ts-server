import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import HttpException from "./exceptions/HttpException";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import errorMiddleware from "./middlewares/errorMiddleware";
import * as userController from "./controller/user";
import * as sliderController from "./controller/slider";
import "dotenv/config";
import multer from "multer";
import path from "path";
import { Slider } from './models'
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "uploads"),
  filename(_req: Request, file: Express.Multer.File, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const app: Express = express();
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (_req: Request, res: Response) => {
  res.json({ success: true, message: "hello world" });
});
app.get("/user/validate", userController.validate);
app.post("/user/register", userController.register);
app.post("/user/login", userController.login);
app.post(
  "/user/uploadAvatar",
  upload.single("avatar"),
  userController.uploadAvatar
);
app.get('/slider/list', sliderController.list);
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error: HttpException = new HttpException(404, "Route not found");
  next(error);
});
app.use(errorMiddleware);
const PORT: number = (process.env.PORT && parseInt(process.env.PORT)) || 8000;
(async function () {
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useUnifiedTopology", true);
  await mongoose.connect("mongodb://localhost/shop");
  await createSliders();
  app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
  });
})();

async function createSliders() {
  const sliders = await Slider.find();
  if (sliders.length == 0) {
    const sliders: any = [
      { url: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=banner&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3582174282,4173170907&os=2710395014,1377321588&simid=4041848488,434846250&pn=14&rn=1&di=178090&ln=1821&fr=&fmq=1614487980691_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fimg.zcool.cn%252Fcommunity%252F01ce8c59df0aa8a80121ae0c531a5a.jpg%25401280w_1l_2o_100sh.jpg%26refer%3Dhttp%253A%252F%252Fimg.zcool.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1617079979%26t%3D5af60ed361bfc219029464a18397813c&rpstart=0&rpnum=0&adpicid=0&force=undefined' },
      { url: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=banner&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=1746104344,433111411&os=930439135,3858695743&simid=3361113701,191347322&pn=15&rn=1&di=139700&ln=1821&fr=&fmq=1614487980691_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fimg.zcool.cn%252Fcommunity%252F01247b56877c0c6ac7251bb6f97237.png%26refer%3Dhttp%253A%252F%252Fimg.zcool.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1617079979%26t%3Ddee5c3f465de3a952ea4cd4955f6da26&rpstart=0&rpnum=0&adpicid=0&force=undefined' },
      { url: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=banner&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2222747798,2595429905&os=1439478538,4162902234&simid=11116356,749423935&pn=24&rn=1&di=140910&ln=1821&fr=&fmq=1614487980691_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fimg.zcool.cn%252Fcommunity%252F01c4a059d318d7a80121ae0c63c464.png%25401280w_1l_2o_100sh.png%26refer%3Dhttp%253A%252F%252Fimg.zcool.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1617079979%26t%3Df484a413bffe987f60ce1f02168d92e3&rpstart=0&rpnum=0&adpicid=0&force=undefined' },
      { url: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=banner&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=3731741439,4057676812&os=357716025,298442694&simid=3396582545,314242975&pn=25&rn=1&di=169180&ln=1821&fr=&fmq=1614487980691_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fimg.zcool.cn%252Fcommunity%252F01948d58083180a84a0e282b97ef43.jpg%25401280w_1l_2o_100sh.jpg%26refer%3Dhttp%253A%252F%252Fimg.zcool.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1617079979%26t%3D301b5f7964b8a7de96e6589a6cbc510e&rpstart=0&rpnum=0&adpicid=0&force=undefined' },
      { url: 'https://image.baidu.com/search/detail?ct=503316480&z=undefined&tn=baiduimagedetail&ipn=d&word=banner&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=undefined&hd=undefined&latest=undefined&copyright=undefined&cs=2350817201,1137116540&os=603799335,3997613513&simid=3331250397,390709366&pn=4&rn=1&di=61380&ln=1821&fr=&fmq=1614487980691_R&fm=&ic=undefined&s=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&is=0,0&istype=0&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fimg.zcool.cn%252Fcommunity%252F01f34459b7972ca801211d25f906c9.png%25401280w_1l_2o_100sh.png%26refer%3Dhttp%253A%252F%252Fimg.zcool.cn%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1617079979%26t%3Df5a3bb9edb052c2f8deee3723691d7f6&rpstart=0&rpnum=0&adpicid=0&force=undefined' }
    ]
    Slider.create(sliders);
  }
}