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
const {generateTable} = require('./helper/generateTable');


app.post('/evaluate', async (req, res) => {
    /* When Access to OpenAI is regained
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: generatePrompt(req.body.businessIdea, req.body.checklists[0]) }],
        model: 'gpt-4',
    });

    res.send(chatCompletion.choices[0].message.content);
    */
    console.log(req.body.checklists)

    console.log(generatePrompt(req.body.businessIdea, req.body.checklists))

    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 2000,
      messages: [{ role: "user", content: generatePrompt(req.body.businessIdea, req.body.checklists) }],
    });

    console.log(msg.content[0].text);

    res.send(msg.content[0].text);
})

app.post('/sendmail', async (req, res) => {
    console.log(req.body.email);
    console.log(req.body.name)
    console.log(req.body.results);

    let tables = ``;

    for(let checklist of req.body.results.checklists){
        console.log(checklist)
        tables = `${tables} ${generateTable([checklist])}`
    }

    let headers = {
        'accept': 'application/json',
        'api-key': process.env.BREVO_KEY,
        'content-type': 'application/json'
    };

    let data = { 
        "sender": {
           "name": "Percepto",
           "email": "hi@trypercepto.com"
        },
        "to": [
           {
              "email": req.body.email,
              "name": req.body.name
           }
        ],
        "subject": "Here is your business idea evaluation",
        "htmlContent": `
        <style>
        * {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-sizing: border-box;
        }

        body {
        background-color: #f5f5f5;
        margin: 0;
        padding: 20px;
        }

        h2 {
        color: #333;
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 30px;
        }

        table {
        background-color: #fff;
        border-collapse: collapse;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        font-size: 14px;
        line-height: 1.5;
        margin: 30px auto;
        max-width: 800px;
        overflow: hidden;
        width: 100%;
        }

        th {
        background-color: #4CAF50;
        color: #fff;
        font-weight: 600;
        padding: 12px 16px;
        text-align: left;
        }

        td {
        border-bottom: 1px solid #ddd;
        padding: 12px 16px;
        }

        tr:last-child td {
        border-bottom: none;
        }

        tr:nth-child(even) td {
        background-color: #f2f2f2;
        }

        tr:hover td {
        background-color: #e6e6e6;
        }
        </style>
        
        <h2>Here is your business idea evaluation:</h2>

        ${
            tables
        }`
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