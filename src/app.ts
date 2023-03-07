const express = require("express");
const path = require("path");

const app = express();

// Middleware
app.use((req: any, res: any, next: any) => {
    console.log('모든 요청에 실행 됨');
    next();
})

app.set('port', process.env.PORT || 3000);

app.get('/', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, './index.html'))
})


app.listen(app.get('port'), () => {
    console.log(`server is running on port ${app.get('port')} ...`)
});