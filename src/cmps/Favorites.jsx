import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onLoadFavorites } from '../cmps/store/favorite.action';

export const Favorites = () => {
  const favorites = useSelector((state) => state?.favoriteModule?.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onLoadFavorites());
  }, []);

  const onRemoveFavorite = (person) => {
    person.isLiked = false;
    dispatch(removeFavorite(person));
  };

  return (
    <div>
      <div>
        {favorites.map((favorite) => (
          <div>
            <div>
              {favorite?.name.first} {favorite?.name.last}
            </div>
            <div>
              <img alt='person' src={favorite.picture.large}></img>
              <button onClick={() => onRemoveFavorite(favorite)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
