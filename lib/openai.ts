
// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API Key is not set in .env.local file');
    throw new Error('OpenAI API Key is required');
}

console.log('OpenAI API Key:', process.env.OPENAI_API_KEY?.substring(0, 5) + '...'); // Log first 5 chars for verification

export async function generatePdfSummary(pdfText: string) {
    try {
        if (!pdfText || pdfText.trim() === '') {
            throw new Error('No text provided for summary');
        }

        // Simple local summarization
        const words = pdfText.split(' ');
        const maxWords = 100;
        const summary = words.slice(0, maxWords).join(' ') + (words.length > maxWords ? '...' : '');

        // Add some formatting
        const formattedSummary = `
✨ Document Summary ✨

${summary}

✅ Key Points:
• ${words.slice(0, 5).join(' ')}...
• ${words.slice(5, 10).join(' ')}...
• ${words.slice(10, 15).join(' ')}...

💡 Tip: Read the full document for more details!
`;        

        return formattedSummary;
    } catch (error) {
        console.error('Error in local summarization:', error);
        throw new Error(`Failed to generate summary: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}