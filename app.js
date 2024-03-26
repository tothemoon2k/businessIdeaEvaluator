//Setup Express
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
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

const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_KEY,
});


//Prompt Helper Func
const { generatePrompt } = require('./helper/prompt');


app.post('/evaluate', async (req, res) => {
    /* When Access to OpenAI is regained
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: generatePrompt(req.body.businessIdea, req.body.checklists[0]) }],
        model: 'gpt-4',
    });

    res.send(chatCompletion.choices[0].message.content);
    */
    console.log(req.body.checklists)

    const msg = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1024,
      messages: [{ role: "user", content: generatePrompt(req.body.businessIdea, req.body.checklists) }],
    });

    res.send(msg.content[0].text);
})

app.post('/sendmail', async (req, res) => {
    console.log(req.body.email);
    console.log(req.body.name)
    console.log(req.body.results);

    let headers = {
        'accept': 'application/json',
        'api-key': process.env.BREVO_KEY,
        'content-type': 'application/json'
    };

    //Add name and email to db

    let data = {
        "sender": {
           "name": "Homerun",
           "email": "app@tryhomerun.io"
        },
        "to": [
           {
              "email": req.body.email,
              "name": req.body.name
           }
        ],
        "subject": "Here is your business idea evaluation",
        "htmlContent": `${req.body.results}`
        };
        axios.post('https://api.brevo.com/v3/smtp/email', data, { headers })
           .then(async response => {
                res.send(`Email sent successfully - ${response.data}`);
           })
           .catch(error => {
                res.send(`Email sent failure`);
                console.log(error);
           });
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;