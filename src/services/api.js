import axios from 'axios';

export default axios.create({
  baseURL: "https://bibleapi.co/api/",
});