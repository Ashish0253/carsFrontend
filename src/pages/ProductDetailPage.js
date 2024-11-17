import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './ProductDetailPage.css'; // Import the CSS file

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      setCar(data);
      setTitle(data.title);
      setDescription(data.description);
      setTags(data.tags.join(','));
    };

    fetchCar();
  }, [id]);

  const uploadImages = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.fileUrls;
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const imageUrls = await uploadImages(images);
    await axios.put(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/cars/${id}`, {
      title,
      description,
      images: imageUrls.join(','),
      tags,
    }, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
      },
    });
    navigate('/');
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_ORIGIN}/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
  };

  return car ? (
    <div className="product-detail-page">
      <h1>{car.title}</h1>
      <div className="slider-container">
        {car.images.length > 0 && (
          <Slider {...sliderSettings}>
            {car.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={car.title} />
              </div>
            ))}
          </Slider>
        )}
      </div>
      <p className="description">{car.description}</p>
      <p className="tags">{car.tags.join(', ')}</p>
      <form onSubmit={updateHandler} className="update-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={handleImageChange}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button type="submit">Update Car</button>
      </form>
      <button onClick={deleteHandler} className="delete-button">Delete Car</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetailPage;