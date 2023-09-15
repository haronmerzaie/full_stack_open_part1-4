import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// Utility function to generate a random ID
const getId = () => (100000 * Math.random()).toFixed(0);

// Convert anecdote string to object format
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increaseVote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      if (anecdote) anecdote.votes += 1;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

// Async actions
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateVote(anecdote);
    dispatch(increaseVote(anecdote.id));
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addToDb(asObject(content));
    dispatch(appendAnecdote(newAnecdote));
  }
}

export const { setAnecdotes, appendAnecdote, increaseVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer;
