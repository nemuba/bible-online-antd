import api from './../../services/api';
import { set_current_verse} from './index';
import { message } from 'antd';

export const fetchVerse = (book, chapter, verse) => {
  return (dispatch) => {
    api
      .get(`/verses/nvi/${book.abbrev.pt}/${chapter}/${verse}`)
      .then(resp => dispatch(set_current_verse(resp.data)))
      .catch(() => message.error("Não foi possivel buscar o verso", 10));
  }
}