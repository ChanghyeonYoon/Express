const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const multer = require("multer");
const fs = require("fs");

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // combined, common, dev, short, tiny

// app.use('요청경로', express.static(__dirname, '실제 경로')); // 정적인 파일을 제공할 때 사용.

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
    },
    name: 'connect.sid',
}));
app.use(express.json()); // json 형식의 데이터를 받을 수 있게 해줌.
app.use(express.urlencoded({ extended: true })); // form 의 데이터를 받을 수 있게 해줌. true: qs, false: querystring

const indexRouter = require("./routes");


app.use('/', indexRouter);

// MEMO 파일 업로드
try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req: any, file: any, cb: any) {
            cb(null, 'uploads/');
        },
        filename(req: any, file: any, cb: any) {
            const ext = path.extname(file.originalname); // 확장자 추출
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일명 중복 방지를 위해 날짜 추가
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

app.get('/upload', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, './upload.html'));
});

// upload.single('image') 는 이미지 하나만 업로드 가능.
// upload.array('image', 10) 는 이미지 10개까지 업로드 가능.
// upload.fields([{ name: 'image1' }, { name: 'image2' }]) 는 image1, image2 두개의 이미지를 업로드 가능.
// upload.none() 은 이미지를 업로드 하지 않음. (데이터만 multipart/form-data 일 때 사용)
app.post('/upload', upload.single('image'), (req: any, res: any) => {
    console.log(req.file, req.body);
    // 이미지 여러개면 req.files
    // fields 면 req.files.image1, req.files.image2
    res.send('ok');
});





app.use((req: any, res: any, next: any) => {
    // Middleware
    console.log('모든 요청에 실행 됨');
    next();
}, (req: any, res: any, next: any) => {
    // Middleware
    console.log('2번째 미들웨어');
    next();
}, (req: any, res: any, next: any) => {
    // Middleware
    console.log('계속 추가 가능');
    next();
});

app.use('/about', (req: any, res: any, next: any) => {
    // Middleware
    console.log('about 페이지 요청에 실행 됨');
    next();
});





app.get('/category/:name', (req: any, res: any) => {
    res.send(`category ${req.params.name}`);
});

app.get('*', (req: any, res: any) => {
    res.send('404 Not Found');
});

// 404 Error handler (와일드카드 있으면 여기 안옴.)
app.use((req: any, res: any) => {
    res.status(404).send('404 Not Found');
});

// Error handler (next 까지 다 넣어야함)
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err);
    res.send('Error!');
});


app.listen(app.get('port'), () => {
    console.log(`모에모에뀽 >< ${app.get('port')} ...`)
});