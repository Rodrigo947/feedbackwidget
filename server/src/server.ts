import express from 'express';

const app = express();

const PORT = 3333;

app.get('/users', (req, res) => {
  return res.send('Hello World')
})

app.listen(PORT, ()=>{
  console.log(`HTTP server running on port ${PORT}`)
});