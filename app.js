//Setup Express
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

//Get Env Variables
const path = require('path');
require('dotenv').config();

//Configure OpenAI
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY, // This is the default and can be omitted
});

//Prompt Helper Func
const { generatePrompt } = require('./helper/prompt');


app.post('/evaluate', async (req, res) => {
    res.send("Yuh") //chatCompletion.choices[0].message.content

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: generatePrompt(req.body.businessIdea, req.body.checklists[0]) }],
        model: 'gpt-4',
    });

    
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;