import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMelodies, addMelody } from '../cmps/store/melody.action';
import { MelodiesList } from '../cmps/MelodiesList';
import Axios from 'axios';
import Filters from '../cmps/Filters';
import { melodyService } from '../service/melody.service.js';
import { Pagination } from '../cmps/Pagination';

export const MelodyPage = () => {
  const CLOUD_NAME = 'dbgfhkg2d';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const inputRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tabsPerPage] = useState(9);
  const [itemUploaded, setItemUploaded] = useState(false);
  const [uploadMode, setUploadMode] = useState(false);
  const [modalClosed, setModalClosed] = useState(true);
  const [imageSelected, setImageSelected] = useState(null);
  const [melody, setMelody] = useState({
    name: '',
    image: null,
    genre: 'none',
    user: null,
  });

  useEffect(() => {
    let data = sessionStorage.getItem('loggedinUser');
    let loggedUser = JSON.parse(data);

    if (data) {
      setCurrentUser(loggedUser);
      setMelody({ ...melody, user: loggedUser._id });
    }
  }, []);

  const melodies = useSelector((state) => state?.melodyModule?.melodies);
  const dispatch = useDispatch();
  const genres = melodyService.getGenres();

  useEffect(() => {
    dispatch(loadMelodies());
  }, [itemUploaded, dispatch]);

  const uploadImage = () => {
    if (!imageSelected) {
      alert('Please select a file!');
      return;
    }
    if (melody.genre === 'none') {
      alert('Please select a genre');
      return;
    }
    if (!melody.name) {
      alert('Please choose a name');
      return;
    }
    const found = melodies.some((el) => el.name.toLowerCase() === melody.name.toLowerCase());
    if (found) {
      alert('Tab already exists');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageSelected[0]);
    formData.append('upload_preset', 'bhbkalyp');

    Axios.post(UPLOAD_URL, formData).then((response) => {
      setItemUploaded(true);
      setMelody({ ...melody, image: response.data.public_id });
    });
  };

  const closeModal = (boolean) => {
    setModalClosed(boolean);
  };

  const onAddMelody = () => {
    if (!melody.image) return;
    dispatch(addMelody(melody));
    setImageSelected(null);
    setItemUploaded(false);
    inputRef.current.value = null;
  };

  const indexOfLastTab = currentPage * tabsPerPage;
  const indexOfFirstTab = indexOfLastTab - tabsPerPage;
  const currentTabs = melodies.slice(indexOfFirstTab, indexOfLastTab);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className=''>
        <Filters paginate={paginate} />
        <div
          className={
            modalClosed
              ? `min-h-screen flex flex-col px-5 overflow-x-hidden lg:px-40 `
              : `min-h-screen flex flex-col bg-black px-5 overflow-x-hidden lg:px-40`
          }>
          {currentUser && (
            <button
              onClick={() => setUploadMode(!uploadMode)}
              className='text-3xl md:text-4xl font-medium mb-2 max-w-2xl mx-auto py-5'>
              Upload a tab
            </button>
          )}
          {uploadMode && (
            <div className='flex flex-col w-full pb-5 h-max-content lg:flex-row'>
              <input
                ref={inputRef}
                required
                className='block appearance-none border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Choose name..'
                value={melody.name}
                onChange={(e) => setMelody({ ...melody, name: e.target.value })}
              />
              <select
                required
                ref={inputRef}
                className='lg:w-1/6 w-full bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                value={melody.genre}
                onChange={(e) => setMelody({ ...melody, genre: e.target.value })}>
                <option value={'none'}>No genre selected</option>
                {genres.map((genre) => (
                  <option value={genre.toLowerCase()}>{genre}</option>
                ))}
              </select>
              <input
                ref={inputRef}
                className='block appearance-none border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline bg-white'
                type='file'
                onChange={(e) => {
                  setImageSelected(e.target.files);
                }}
              />

              <div className='flex h-full '>
                {!itemUploaded && (
                  <button
                    className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                    onClick={uploadImage}>
                    Upload
                  </button>
                )}

                {itemUploaded && (
                  <button
                    className='shadow bg-green-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                    onClick={onAddMelody}>
                    Submit
                  </button>
                )}
                {itemUploaded ? (
                  <span className='block appearance-none border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline bg-white'>
                    Image Uploaded ✅
                  </span>
                ) : (
                  <span></span>
                )}
              </div>
            </div>
          )}
          <MelodiesList melodies={currentTabs} closeModal={closeModal} currentUser={currentUser} />
          <Pagination tabsPerPage={tabsPerPage} totalTabs={melodies.length} paginate={paginate} />
        </div>
      </div>
    </div>
  );
};
