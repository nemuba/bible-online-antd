import api from "./../../services/api";
import { fetch_verses } from "./index";
import { message } from "antd";

export const fetchVerses = (book, chapter) => {
  return (dispatch) => {
    api
      .get(`verses/nvi/${book}/${chapter}`)
      .then((resp) => dispatch(fetch_verses(resp.data.verses)))
      .catch(() => message.error("Não foi possivel buscar os verses", 10));
  };
};
