const express = require('express');

const app = express();

app.use(express.json());

/* Enter code Below */
const messages = []
app.get('/messages', (req, res) => {
    res.json(messages)
})
app.post('/messages', (req, res) => {
    const body = req.body;
    messages.push({body: body.body, user: body.user})
    res.send('sent')
})


/* Enter code Above */

module.exports = app;