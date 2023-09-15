import { useDispatch } from 'react-redux';
import { createFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  // Handler for changing the filter
  const handleChange = (event) => {
    event.preventDefault();
    const content = event.target.value;
    dispatch(createFilter(content));
  }

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}

export default Filter;
