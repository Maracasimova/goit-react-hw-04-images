import axios from 'axios';

const API_KEY = '35093909-87304c45613df24ba6fd5782f';
const BASE_URL = 'https://pixabay.com/api/';

const pixabayAPI = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

const fetchImages = async ({ searchQuery = '', currentPage = 1 }) => {
  const response = await pixabayAPI.get('', {
    params: { q: searchQuery, page: currentPage },
  });
  return response.data.hits;
};

export default fetchImages;
