import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './ProductListPage.css'; // Import the CSS file

const ProductListPage = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/cars`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      setCars(data);
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(car =>
    car.title.toLowerCase().includes(search.toLowerCase()) ||
    car.description.toLowerCase().includes(search.toLowerCase()) ||
    car.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
  };

  return (
    <div className="product-list-page">
      <h1>My Cars</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <div className="car-list">
        {filteredCars.map((car) => (
          <div key={car._id} className="car-card">
            <Link to={`/car/${car._id}`}>
              <h2>{car.title}</h2>
              {car.images.length > 0 && (
                <Slider {...sliderSettings}>
                  {car.images.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={car.title} />
                    </div>
                  ))}
                </Slider>
              )}
              <p className="car-tags">{car.tags.join(', ')}</p>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/create" className="add-car-button">Add New Car</Link>
    </div>
  );
};

export default ProductListPage;