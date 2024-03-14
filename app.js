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
    /* When Access to OpenAI is regained
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: generatePrompt(req.body.businessIdea, req.body.checklists[0]) }],
        model: 'gpt-4',
    });

    res.send(chatCompletion.choices[0].message.content);
    */

    res.send(
        {
            "items": [
              {
                "item": "Must solve a Painful Problem",
                "passing_percentage": "85",
                "passing": true,
                "note": "Finding reliable and trustworthy pet care providers can be a painful problem for many pet owners, especially when traveling or working long hours. This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals."
              },
              {
                "item": "Market must be undergoing rapid growth",
                "passingPercentage": "62",
                "passing": true,
                "note": "The pet care industry is experiencing significant growth due to increasing pet ownership rates, busy lifestyles, and the growing trend of treating pets as family members. The market for pet care services, including pet sitting and dog walking, is expected to continue growing rapidly."
              },
              {
                "item": "Easy to build MVP",
                "passing_percentage": "94",
                "passing": false,
                "note": "While the core functionality of the app (listing pet care providers, booking services, and secure payments) may seem straightforward, building a robust and user-friendly platform with features like provider verification, reviews, and secure payment processing can be challenging, especially for an MVP. Additionally, building a critical mass of users (both pet owners and service providers) may be difficult in the early stages."
              }
            ],
            "overall_passing_percentage": "73",
            "overall_pass": false,
            "overall_summary": "The business idea of an app that connects pet owners with local pet care providers has potential, as it addresses a real pain point and operates in a rapidly growing market. However, building a successful MVP may be more challenging than it appears, as it requires robust features, user acquisition strategies, and a critical mass of users from the start.",
            "overall_notes": "While the concept is promising, the success of this app will heavily depend on its execution, including the ability to attract and retain both pet owners and reliable, verified pet care providers. Building trust and ensuring a positive user experience will be crucial. Additionally, the market for pet care apps is becoming increasingly crowded, with established players and new entrants constantly emerging.",
            "recommended_next_steps": [
              "Conduct thorough market research and competitive analysis to understand the existing players, their strengths and weaknesses, and identify potential gaps or opportunities for differentiation.",
              "Develop a comprehensive user acquisition and retention strategy, including plans for marketing, partnerships, and incentives for early adopters.",
              "Create a detailed business plan that addresses potential challenges, such as provider vetting, liability concerns, and scaling the platform effectively.",
              "Consider starting with a focused geographic area or niche market to build a strong user base before expanding.",
              "Explore strategic partnerships or collaborations with existing pet care businesses, veterinary clinics, or pet-related companies to leverage their customer base and expertise."
            ]
           }
    )
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;