import { useDispatch } from 'react-redux';
import { loadMelodies, removeMelody } from './store/melody.action';
import { Modal } from './Modal';
import { useState } from 'react';
import TrashIcon from '../assets/Images/trash.png';
import Printer from '../assets/Images/printer.png';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const MelodyPreview = ({ melody, closeModal, currentUser }) => {
  const CLOUD_NAME = 'dbgfhkg2d';
  const dispatch = useDispatch();
  const onRemoveMelody = (melody) => {
    if (window.confirm(`Are you sure you want to delete ${melody.name}?`)) {
      dispatch(removeMelody(melody._id));
      dispatch(loadMelodies());
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [modal, setModal] = useState(false);

  const handleCloseModal = () => {
    closeModal(modal);
    setModal(!modal);
  };

  const image = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${melody.image}`;

  return (
    <div className='bg-white shadow-2xl ' ref={componentRef}>
      <div className='relative'>
        <div className='text-center text-2xl py-3 font-cormorant lg:text-4xl'>{melody.name}</div>
        <button className='absolute right-1 top-1 h-4 w-4 hidden lg:flex' onClick={handlePrint}>
          <img className='h-max-content' src={Printer} />
        </button>
        {currentUser && (
          <button className='absolute left-1 top-1 h-4 w-4' onClick={() => onRemoveMelody(melody)}>
            <img className='h-max-content' src={TrashIcon} alt='trash-icon' />
          </button>
        )}
      </div>
      <div className='aspect-w-3 aspect-h-2 cursor-pointer' onClick={() => handleCloseModal(modal)}>
        <img src={image} alt='tab-modal' id='section-to-print' />
        {modal && <Modal children={<img src={image} alt='tab-modal' />} />}
      </div>
    </div>
  );
};

// https://day.js.org/docs/en/display/format
