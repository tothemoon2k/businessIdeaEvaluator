
const generatePrompt = (idea, checklist) =>{
    return `
        Please evaluate the following business idea based on each item in the following checklist. Please be brutally honest, strictly objective, consider market crowdedness and do not give any false hope. Please return a JSON object with a passing percentage, pass or fail, note for each item. As well as overall pass or fail, overall summary, overall notes, and recommended next steps.
        
        Business Idea: ""${idea}""
        Checklist: ""${checklist}""
    `
}

module.exports = {
    generatePrompt
}