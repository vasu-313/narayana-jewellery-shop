import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';
import { fetchCategories } from '../services/api';
import '../styles/MobileCategory.css';
import Navbar3 from './Navbar3'

const MobileCategory = () => {
  const [categories, setCategories] = useState([]); // plural for clarity
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories(); // no id param here
        setCategories(categoriesData); // directly set array
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Navbar3 />
      <div className="category-box">
        {categories.map(category => (
          <Link to={`/categories/${category.id}`} key={category.id}>
            <div className="image-name">
              <img
                src={category.image}
                alt={category.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder-image.png';
                }}
              />
              <h2 className="category-name">{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      <BottomNavbar />
    </>
  );
};

export default MobileCategory;
