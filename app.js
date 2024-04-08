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
            *{
                font-family: sans-serif;
            }

            strong {
                font-weight: bold; 
            }

            em {
                font-style: italic; 
            }

            table {
                background: #f5f5f5;
                border-collapse: separate;
                box-shadow: inset 0 1px 0 #fff;
                font-size: 12px;
                line-height: 24px;
                text-align: left;
                width: 800px;
                margin-top: 30px;
            }	

            th {
                background: url(https://jackrugile.com/images/misc/noise-diagonal.png), linear-gradient(#777, #444);
                border-left: 1px solid #555;
                border-right: 1px solid #777;
                border-top: 1px solid #555;
                border-bottom: 1px solid #333;
                box-shadow: inset 0 1px 0 #999;
                color: #fff;
            font-weight: bold;
                padding: 10px 15px;
                position: relative;
                text-shadow: 0 1px 0 #000;	
            }

            th:first-child {
                border-left: 1px solid #777;	
                box-shadow: inset 1px 1px 0 #999;
            }

            th:last-child {
                box-shadow: inset -1px 1px 0 #999;
            }

            td {
                border-right: 1px solid #fff;
                border-left: 1px solid #e8e8e8;
                border-top: 1px solid #fff;
                border-bottom: 1px solid #e8e8e8;
                padding: 10px 15px;
                position: relative;
                transition: all 300ms;
            }

            td:first-child {
                box-shadow: inset 1px 0 0 #fff;
            }	

            td:last-child {
                border-right: 1px solid #e8e8e8;
                box-shadow: inset -1px 0 0 #fff;
            }	

            tr:nth-child(odd) td {
                background: #f1f1f1;	
            }

            tr:last-of-type td {
                box-shadow: inset 0 -1px 0 #fff; 
            }

            tr:last-of-type td:first-child {
                box-shadow: inset 1px -1px 0 #fff;
            }	

            tr:last-of-type td:last-child {
                box-shadow: inset -1px -1px 0 #fff;
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