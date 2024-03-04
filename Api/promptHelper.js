
const generatePrompt = (idea) =>{
    return `
        Please turn the following text into a hilarious dave chappelle joke: ${idea}
    `
}

module.exports = {
    generatePrompt
}