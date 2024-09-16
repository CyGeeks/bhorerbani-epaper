'use client';

import { useEffect, useState } from 'react';

// Function to convert English numerals to Bengali numerals
const convertToBengaliNumerals = (number:number) => {
    const bengaliNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number.toString().split('').map(digit => bengaliNumerals[parseInt(digit, 10)]).join('');
};

const AllPages = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        // Fetch the JSON data
        fetch('/data.json')
            .then(response => response.json())
            .then(data => setPages(data))
            .catch(error => console.error('Error fetching the data:', error));
    }, []);

    return (
        <div className="flex items-center justify-center md:px-28 py-12">
            <div className="grid grid-cols-6 gap-x-4 gap-y-8">
                {pages.map((page, index) => (
                    <div key={index} className="flex flex-col items-center justify-center">
                        <img
                            style={{ border: '1px solid grey' }}
                            src={page.preview}
                            alt={`Page ${index + 1}`}
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
