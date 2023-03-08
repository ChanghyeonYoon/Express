const express = require('express');
const router = express.Router();

router.get('/', (req: any, res: any) => {
    req.cookies;
    res.cookie('name', encodeURIComponent('value'), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })

    // req.session.id = 'value';

    res.sendFile(path.join(__dirname, './index.html'))
    // MEMO: send 를 한 이후 다른 send 를 하면 에러가 남.
    // ex: sendFile, sendStatus, send, json, redirect, render
});

module.exports = router;