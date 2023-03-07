const express = require("express");
const path = require("path");

const app = express();

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

app.set('port', process.env.PORT || 3000);

app.get('/', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, './index.html'))
    // MEMO: send 를 한 이후 다른 send 를 하면 에러가 남.
    // ex: sendFile, sendStatus, send, json, redirect, render
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
    console.log(`server is running on port ${app.get('port')} ...`)
});