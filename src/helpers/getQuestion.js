export async function getQuestion() {
    try {
    const response = await fetch('https://the-trivia-api.com/api/questions?limit=1&region=ES&difficulty=easy');
    if (!response.ok) {
        throw new Error('No se pudo obtener la pregunta de trivia');
    }
    const data = await response.json();
    return data
    } catch (error) {
    console.error(error);
    }
}


