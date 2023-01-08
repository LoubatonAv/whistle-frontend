import React, { useState, useRef, useCallback } from 'react';
import { MelodyPreview } from './MelodyPreview';

export const MelodiesList = ({ melodies, closeModal, currentUser }) => {
  return (
    <div>
      <div className='grid gap-5 sm:grid-cols-1 pt-10 lg:grid-cols-3 pb-10 '>
        {melodies.map((melody, index) => (
          <MelodyPreview melody={melody} closeModal={closeModal} currentUser={currentUser} key={index} />
        ))}
      </div>
    </div>
  );
};
