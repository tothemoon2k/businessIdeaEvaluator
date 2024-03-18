
const generatePrompt = (idea, checklists) =>{
    return `
        Please evaluate the following business idea based on each item in the following checklist. 
        Please be brutally honest, strictly objective, consider market crowdedness and do not give any false hope. Please return a JSON object with a passing percentage, pass or fail, note for each item. As well as overall pass or fail, overall summary, overall notes, and recommended next steps. Please return only the object and no explaination.
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
            {
            "item": "Mass market appeal",
            "passing_percentage": 70,
            "passing": true,
            "note": "Pet owners and animal lovers could potentially find a pet photo sharing website appealing, which could provide a decent market size."
            },
            {
            "item": "Product not sold in most retail stores",
            "passing_percentage": 100,
            "passing": true,
            "note": "As a digital product, a pet photo sharing website would not be sold in retail stores."
            },
            {
            "item": "Product is undiscovered",
            "passing_percentage": 30,
            "passing": false,
            "note": "While there may not be a dominant player in the pet photo sharing space, similar social media platforms and photo sharing apps already exist, so the concept is not entirely undiscovered."
            }
            ]
            },
            {
            "items": [
            {
            "item": "Is there hustle involved?",
            "passing_percentage": 60,
            "passing": true,
            "note": "Building and promoting a successful pet photo sharing website would likely require significant hustle and effort to attract users, monetize the platform, and stand out in a crowded market."
            },
            {
            "item": "Can it grow long into the future?",
            "passing_percentage": 50,
            "passing": false,
            "note": "While a pet photo sharing website could potentially grow in the short term, it may have limited long-term growth potential due to the niche market and competition from larger social media platforms."
            },
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
            "recommended_next_steps": "- Conduct thorough market research to better understand the potential user base and competition. - Explore alternative business ideas that solve more significant problems or have higher profit potential. - Consider pivoting the idea to address a more pressing need or incorporate additional features beyond just photo sharing."
            }""
        
        Business Idea: ""${idea}""
        Checklists: ""${checklists}""
    `
}

module.exports = {
    generatePrompt
}