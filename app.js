//Setup Express
const express = require('express');
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

    res.send({
      "checklists": [
        {
          "items": [
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 85,
              "passing": true,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            },
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 80,
              "passing": false,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            },
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 82,
              "passing": true,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            }
          ]
        },
        {
          "items": [
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 85,
              "passing": true,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            },
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 80,
              "passing": false,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            },
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 82,
              "passing": true,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            }
          ]
        },
        {
          "items": [
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 85,
              "passing": true,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            },
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 80,
              "passing": false,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            },
            {
              "item": "Must solve a Painful Problem",
              "passing_percentage": 82,
              "passing": true,
              "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
            }
          ]
        }
      ]
    });
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;