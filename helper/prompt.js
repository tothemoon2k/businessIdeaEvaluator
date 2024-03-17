
const generatePrompt = (idea, checklist) =>{
    return `
        Please evaluate the following business idea based on each item in the following checklist. 
        Please be brutally honest, strictly objective, consider market crowdedness and do not give any false hope. Please return a JSON object with a passing percentage, pass or fail, note for each item. As well as overall pass or fail, overall summary, overall notes, and recommended next steps. Please return only the object and no explaination.
        Please return the object in this exact structure - ""{ "checklists": [ { "items": [ { "item": "Must solve a Painful Problem", "passing_percentage": 85, "passing": true, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." }, { "item": "Must solve a Painful Problem", "passing_percentage": 80, "passing": false, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." }, { "item": "Must solve a Painful Problem", "passing_percentage": 82, "passing": true, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." } ] }, { "items": [ { "item": "Must solve a Painful Problem", "passing_percentage": 85, "passing": true, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." }, { "item": "Must solve a Painful Problem", "passing_percentage": 80, "passing": false, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." }, { "item": "Must solve a Painful Problem", "passing_percentage": 82, "passing": true, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." } ] }, { "items": [ { "item": "Must solve a Painful Problem", "passing_percentage": 85, "passing": true, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." }, { "item": "Must solve a Painful Problem", "passing_percentage": 80, "passing": false, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." }, { "item": "Must solve a Painful Problem", "passing_percentage": 82, "passing": true, "note": "This app aims to solve that problem by providing a convenient platform to connect with local, verified pet care professionals." } ] } ] }""
        
        Business Idea: ""${idea}""
        Checklist: ""${checklist}""
    `
}

module.exports = {
    generatePrompt
}