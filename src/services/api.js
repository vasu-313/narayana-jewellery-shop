import axios from 'axios';

const JSON_URL = 'https://raw.githubusercontent.com/vasu-313/products-json/main/products.json';

const fetchData = async () => {
  const response = await axios.get(JSON_URL);
  return response.data;
};

export const fetchCategories = async () => {
  const data = await fetchData();
  return data.categories;
};

export const fetchProducts = async () => {
  const data = await fetchData();
  return data.products;
};

export const fetchProductById = async (id) => {
  const data = await fetchData();
  return data.products.find(product => product.id === id);
};

export const fetchProductsByCategoryClient = async (categoryId) => {
  const data = await fetchData();
  return data.products.filter(product => product.category === categoryId);
};
