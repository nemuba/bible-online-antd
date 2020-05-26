import api from './../../services/api';
import {fetch_books} from './index';
import { message } from 'antd';

export const fetchBooks = ()=>{
  return (dispatch) =>{
    api
    .get('books')
    .then(resp=> dispatch(fetch_books(resp.data)))
    .catch(()=> message.error("Não foi possivel buscar os livros",10));
  }
}