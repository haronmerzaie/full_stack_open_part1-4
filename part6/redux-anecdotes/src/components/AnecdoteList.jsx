import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  // Fetch anecdotes based on the current filter
  const anecdotes = useSelector((state) => {
    const filter = state.filter;
    return state.anecdotes.filter((a) =>
      a.content?.toLowerCase().includes(filter?.toLowerCase())
    );
  });

  const dispatch = useDispatch();

  // Handler to vote for an anecdote
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes) // Sorting anecdotes by votes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;

