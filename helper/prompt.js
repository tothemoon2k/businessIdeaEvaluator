const minifier = require('string-minify');

const generatePrompt = (idea, checklists) => {
    return minifier(`
        Please evaluate the following business idea based on each item in the following checklist. 
        Please be brutally honest, strictly objective, consider market crowdedness and do not give any false hope. Please return a JSON object with a passing percentage, pass or fail, note for each item. As well as overall pass or fail, overall summary, overall notes. Please return only the object and no explaination.
        Please return the object in this structure, please break up checklists array in the format they are passed in - ""{
            "checklists": [
            {
            "items": [
            {
            "item": "Does the product solve a problem?",
            "passing_percentage": 60,
            "passing": false,
            "note": "A pet photo sharing website does not directly solve a major problem that people have. While it may be a fun and entertaining platform, it is not addressing a significant pain point or need."
            },
            {
            "item": "High profit margin",
            "passing_percentage": 40,
            "passing": false,
            "note": "It's unlikely that a pet photo sharing website would have a high profit margin, as the primary revenue sources would likely be advertising or premium features, which typically have lower margins."
            },
            ]
            },
            {
            "items": [
            {
            "item": "Is it cash flow positive?",
            "passing_percentage": 40,
            "passing": false,
            "note": "It may be challenging for a pet photo sharing website to achieve consistent positive cash flow, as the primary revenue sources (advertising, premium features) may not generate enough income to cover the costs of development, marketing, and operations."
            },
            {
            "item": "Is there potential for a big exit?",
            "passing_percentage": 30,
            "passing": false,
            "note": "Given the niche market and potential challenges with profitability, a pet photo sharing website may not have a high potential for a significant acquisition or exit opportunity."
            }
            ]
            }
            ],
            "overall_passing": false,
            "overall_summary": "Based on the provided checklists, a pet photo sharing website does not appear to be a strong business idea. While it could have some appeal to pet owners and animal lovers, it does not directly solve a major problem, may have limited profit potential, and could face significant competition from existing social media platforms. Additionally, the long-term growth prospects and potential for a big exit may be limited.",
            "overall_notes": "While the idea of a pet photo sharing website could be a fun and entertaining platform for a niche audience, it may struggle to achieve long-term success and profitability due to the lack of a clear problem being solved, limited monetization opportunities, and competition from larger, established platforms. It may be worth exploring alternative ideas that address more significant pain points or have a clearer path to profitability and scalability.",
            }""
        
        Business Idea: ""${idea}""
        Checklists: ""${checklists}""
    `)
}

module.exports = {
    generatePrompt
}