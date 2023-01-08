import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadMelodies } from '../cmps/store/melody.action.js';
import { melodyService } from '../service/melody.service.js';

const Filters = ({ paginate }) => {
  const dispatch = useDispatch();
  const genres = melodyService.getGenres();
  const [filter, setFilter] = useState({
    text: '',
    genre: '',
  });

  useEffect(() => {
    dispatch(loadMelodies(filter));
    paginate(1);
  }, [filter, dispatch]);

  return (
    <div className='header-image'>
      <input
        className='block appearance-none border text-sm border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline '
        type='text'
        placeholder='Search...'
        value={filter.text}
        onChange={(e) => setFilter({ ...filter, text: e.target.value })}
      />
      <select
        className=' block appearance-none border text-sm border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
        value={filter.genre}
        onChange={(e) => setFilter({ ...filter, genre: e.target.value })}>
        <option value={''}>None</option>
        {genres.map((genre) => (
          <option value={genre.toLowerCase()}>{genre}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
