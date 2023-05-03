import React from 'react';

const Pagination = ({ productPerPage, totalProduct, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProduct / productPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <nav>
      <ul className='flex -space-x-px justify-center p-5'>
        {pageNumbers.map(number => (
          <li key={number}>
            <button onClick={() => paginate(number)} disabled={number === currentPage} className={`px-4 py-2 ${number === currentPage? "bg-gray-600 text-white": "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-600"}`}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;