import express from 'express';

const app = express();

app.get('/location/byZip/:zip((\\d+)(?:-\\d+)?)', (req, res) => {
    res.json({message: 'Hello world!', zip: req.params.zip })
});

app.listen(9933, () => console.info('API server started'));
