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
    <div className="row visible-xs mt-5">
      <div className="col-md-12 p-0 bg-[#726a6a]">
        <p className="bg-[#524d4d] text-center p-1 mt-1 mb-0 text-white text-xl leading-6">
          <a className="text-white no-underline text-xl" href="https://epaper.samakal.com/pages/2024-08-19/nogor-edition">সব পাতা</a>
        </p>
        <div className="overflow-auto whitespace-nowrap py-4 px-2 mx-2">
          {pagesData.map((page, index) => (
            <PagePreview key={index} imageUrl={page.imageUrl} pageNumber={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPages;
