import React from 'react';
import html2canvas from 'html2canvas';
// import pkg from 'file-saver';
// const { saveAs } = pkg;
import './App.css';

const cars = [
  {
    make: 'Toyota',
    model: 'Noah',
    year: '2014',
    price: '150,000,000 Tsh (50 Million in Tsh)',
    imageUrl: 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?q=80&w=2898&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    make: 'Mazda',
    model: 'CX-5',
    year: '2008',
    price: '150,000,000 Tsh (50 Million in Tsh)',
    imageUrl: 'https://images.unsplash.com/photo-1459603677915-a62079ffd002?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyfGVufDB8MHwwfHx8MA%3D%3D'
  },
  {
    make: 'Toyota',
    model: 'Noah',
    year: '2014',
    price: '150,000,000 Tsh (50 Million in Tsh)',
    imageUrl: 'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnxlbnwwfDB8MHx8fDA%3D'
  },
  {
    make: 'Mazda',
    model: 'CX-5',
    year: '2008',
    price: '150,000,000 Tsh (50 Million in Tsh)',
    imageUrl: 'https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    make: 'Toyota',
    model: 'Noah',
    year: '2014',
    price: '150,000,000 Tsh (50 Million in Tsh)',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNhcnxlbnwwfDB8MHx8fDA%3D'
  },
  {
    make: 'Mazda',
    model: 'CX-5',
    year: '2008',
    price: '150,000,000 Tsh (50 Million in Tsh)',
    imageUrl: 'https://images.unsplash.com/photo-1490985830292-06e0fe60d725?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhcnxlbnwwfDB8MHx8fDA%3D'
  },
  // Add more car details as necessary
];

const Poster = () => {
  const downloadPoster = async () => {
    const posterElement = document.getElementById('poster');
  
    // Check if the poster element exists
    if (!posterElement) {
      console.error('Poster element not found');
      return;
    }
  
    try {
      // Use html2canvas to draw the poster element on the canvas
      const canvas = await html2canvas(posterElement, {
        allowTaint: true, // Allow cross-origin images
        useCORS: true, // Enable CORS
      });
      
      // Convert the canvas to a data URL and download it
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'poster.png'; // Set default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Image saved');
    } catch (error) {
      console.error('Could not generate image', error);
    }
  };

  return (
    <div className="p-8">
      <div id="poster" className="max-w-screen-lg mx-auto p-4  rounded shadow-md">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8 bg-black p-4 rounded-xl text-white">
          <img src="https://smscarz.co.tz/wp-content/uploads/2023/04/Asset-3-1.png" alt="SMSCARZ Logo" className="w-72 self-start object-cover" />
          <div className='w-full'>
          <div className="text-start mt-4">
            <p className='font-bold'>Contact Us:</p>
            <p>+ 255 xxx xxx xxx</p>
            <p>+ 255 xxx xxx xxx</p>
            <p className='font-extrabold underline'>www.smscarz.co.tz</p>
          </div>
          </div>
        </div>

        {/* Car Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
          {cars.map((car, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4">
              <h2 className="font-semibold text-xl">Make:<span className='font-normal'> {car.make}</span></h2>
              <p className="mt-2 font-bold">Model:<span className='font-normal text-sm'>  {car.model} </span>| Year: <span className='font-normal text-sm'>{car.year}</span></p>
              <img src={car.imageUrl} className="mt-4 h-48 w-full object-cover rounded-md" />
              <p className="mt-2 font-bold">Price:<span className='font-normal text-sm'>  {car.price}</span></p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={downloadPoster}
        className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg"
      >
        Download Poster
      </button>
    </div>
  );
};

export default Poster;
