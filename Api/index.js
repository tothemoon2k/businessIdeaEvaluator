//Setup Express
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

//Get Env Variables
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

//Configure OpenAI
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

//Prompt Helper Func
const { generatePrompt } = require('./promptHelper');


app.post('/evaluate', async (req, res) => {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: generatePrompt(req.body.businessIdea) }],
        model: 'gpt-4',
    });

    console.log(chatCompletion.choices[0].message.content);
    
    res.send("Completed")
  })

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})