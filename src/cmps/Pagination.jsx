import React, { useState } from 'react';

export const Pagination = ({ tabsPerPage, totalTabs, paginate }) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);

  for (let i = 1; i <= Math.ceil(totalTabs / tabsPerPage); i++) {
    pageNumbers.push(i);
  }

  const navigateToPage = (number) => {
    setCurrentPage(number);

    paginate(number);
  };

  return (
    <nav>
      {pageNumbers.length > 1 && (
        <ul className='gap-5 text-7xl justify-evenly flex pb-20'>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                className={currentPage === number ? 'text-red-400' : 'text-black'}
                onClick={() => navigateToPage(number)}
                href={`#`}>
                {number}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};
