import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./App.css";
import Logo from "../src/assets/header.jpeg";

// Define the type for a car object
interface Car {
  make: string;
  model: string;
  year: string;
  price: string;
  imageUrl: string;
}

const Poster = () => {
  const [cars, setCars] = useState<Car[]>([]); // Initialize with an empty array of type Car
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null); // State to track the selected poster

  const [formData, setFormData] = useState<Car>({
    make: "",
    model: "",
    year: "",
    price: "",
    imageUrl: "",
  });

  const posterRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCar = () => {
    setCars((prevCars) => [...prevCars, formData]);
    setFormData({
      make: "",
      model: "",
      year: "",
      price: "",
      imageUrl: "",
    });
  };

  const deleteCar = (index: number) => {
    setCars((prevCars) => prevCars.filter((_, i) => i !== index));
  };

  const downloadPoster = async () => {
    const posterElement = posterRef.current;
    if (!posterElement) {
      console.error("Poster element not found");
      return;
    }

    try {
      const canvas = await html2canvas(posterElement, {
        allowTaint: true,
        useCORS: true,
      });

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "poster.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Image saved");
    } catch (error) {
      console.error("Could not generate image", error);
    }
  };

  const handlePosterClick = (index: number) => {
    setSelectedPoster((prevSelected) => (prevSelected === index ? null : index));
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-screen-lg mx-auto p-4 rounded shadow-md bg-white">
        {cars.length === 6 ? (
          ""
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Add Car Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                placeholder="Make"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Milage/Engine Model"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="Year"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <button
                onClick={addCar}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Add Car
              </button>
            </div>
          </div>
        )}

        {/* Display Poster */}
        <div
          id="poster"
          ref={posterRef}
          className="max-w-screen-lg mx-auto p-4 rounded shadow-md bg-gray-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 bg-black p-4 rounded-xl text-white flex-row-reverse">
            <img
              src={Logo}
              alt="SMSCARZ Logo"
              className="w-32 self-start object-cover"
            />
            <div className="w-fit ">
            <span className="text-5xl font-black">Ostrich Tanzania</span>
            </div>
            <div className="">
              <div className="text-start mt-4">
                <p className="font-bold">Contact Us:</p>
                <p>+255 777 585 750</p>
                {/* <p className="font-extrabold underline">www.smscarz.co.tz</p> */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
            {cars.slice(0, 6).map((car, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 relative hover:shadow-lg transition"
                onClick={() => handlePosterClick(index)}
              >
                {selectedPoster === index && (
                  <button
                    onClick={() => deleteCar(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                )}
                <h2 className="font-semibold text-xl">
                  Make: <span className="font-normal">{car.make}</span>
                </h2>
                <p className="mt-2 font-bold">
                  Milage/Engine Model: <span className="font-normal">{car.model}</span> |
                  Year: <span className="font-normal">{car.year}</span>
                </p>
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  className="mt-4 h-48 w-full object-cover rounded-md"
                />
                <p className="mt-2 font-bold">
                  Price: Tsh - <span className="font-normal">{formatPrice(car.price)}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={downloadPoster}
          className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full"
        >
          Download Poster
        </button>
      </div>
    </div>
  );
};

export default Poster;