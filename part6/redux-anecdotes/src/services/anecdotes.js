import axios from 'axios'

// Base URL for the API
const baseUrl = 'http://localhost:3001/anecdotes'

// Fetch all anecdotes from the database
const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

// Add a new anecdote to the database
const addToDb = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote);
    return response.data;
}

// Update vote count of a specific anecdote
const updateVote = async (anecdote) => {
    await axios.put(`${baseUrl}/${anecdote.id}`, {...anecdote, vote: anecdote.votes + 1}, {new: true});
}

export default { getAll, addToDb, updateVote };
