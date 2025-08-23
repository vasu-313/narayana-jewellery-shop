import React, { useEffect, useState } from 'react';
import { fetchCategories, fetchProducts } from '../services/api'; // adjust path if needed
import "../styles/CategoriesNavbar.css";
import { NavLink } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';

const CategoriesNavBar = () => {
  const [categories, setCategories] = useState([]);  // initialize as empty array
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Both fetchCategories() and fetchProducts() return data arrays directly
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchProducts()
        ]);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      }
    };

    fetchData();
  }, []);

  // if (loading) return <div>Loading categories...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <nav className='category-navbar'>
        <ul className='category-list'>
          {Array.isArray(categories) && categories.map(category => (
            <li key={category.id} className='category-item'>
              <NavLink
                to={`/categories/${category.id}`}
                className={({ isActive }) => (isActive ? 'active-link' : '')}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <BottomNavbar />
    </>
  );
};

export default CategoriesNavBar;
