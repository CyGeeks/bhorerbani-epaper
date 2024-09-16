'use client';
import React, { useState, useEffect } from 'react';

// Function to convert English numerals to Bengali numerals
const convertToBengaliNumerals = (number) => {
  const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return number.toString().split('').map(digit => bengaliNumerals[digit]).join('');
};

const PagePreview = ({ imageUrl, pageNumber }) => (
  <div className="inline-block mx-0.5">
    <p className="mb-0">
      <a title={`Page ${convertToBengaliNumerals(pageNumber)}`} href={`https://epaper.samakal.com/nogor-edition/2024-08-19/${pageNumber}`}>
        <img className="w-24" src={imageUrl} alt={`Page ${convertToBengaliNumerals(pageNumber)}`} />
      </a>
    </p>
    <p className="bg-[#524d4d] text-center p-0.5 mt-1 mb-0 text-white text-lg leading-6">
      <a className="text-white no-underline text-lg" title={`Page ${convertToBengaliNumerals(pageNumber)}`} href={`https://epaper.samakal.com/nogor-edition/2024-08-19/${pageNumber}`}>পাতা {convertToBengaliNumerals(pageNumber)}</a>
    </p>
  </div>
);

const AllPages = () => {
  const [pagesData, setPagesData] = useState([]);

  useEffect(() => {
    // Fetch data from the external JSON file
    const fetchPagesData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setPagesData(data);
      } catch (error) {
        console.error('Error fetching pages data:', error);
      }
    };

    fetchPagesData();
  }, []);

  return (
    <div className="flex items-center justify-center md:px-28 py-12">
      <div className="grid grid-cols-6 gap-x-4 gap-y-8">
        {pagesData.map((page, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <img
              style={{ border: '1px solid grey' }}
              src={page.preview}
              alt={`পেজ ${index + 1}`}
            />
            <div className="bg-[#524D4D] w-full flex items-center justify-center text-white font-semibold p-1">
              পাতা {convertToBengaliNumerals(index + 1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPages;
