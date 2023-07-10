import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '36522902-e434b1ffe87f6bbd67c141777';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
});

export const getData = async (query, page, per_page) => {
  const response = await axios.get(
    `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&${searchParams}&per_page=${per_page}`
  );
  return response.data;
};
