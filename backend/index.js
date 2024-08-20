const express = require('express');
const app = express();
const {Client} = require('pg');

app.use(express.json());

app.post('/predict', async(req, res) => {
    const input = req.body;
    const prediction = await fetch('https://<your-worker>.workers.dev',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ messages: [{role: "user", content: 'Predict with ${input}'}]})

    }).then(res => res.json());

    const client = new Client();
    await client.connect();
    await client.query('INSERT INTO predictions (input, predictions) VALUES ($1, $2)', [input, direction]);
    res.json({prediction});

});

app.listen(5000, () => console.log('Server running on port 5000'));