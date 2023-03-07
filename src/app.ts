const express = require("express");

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req: any, res: any) => {
    res.send('hello express')
})

app.listen(app.get('port'), () => {
    console.log(`server is running on port ${app.get('port')} ...`)
});