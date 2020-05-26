import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import {BookTwoTone} from '@ant-design/icons';
import { Tabs, Row, Col, Menu, List, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {fetchBooks} from './features/books/actions';
import {set_current_book} from './features/current_book';
import {set_current_chapter} from './features/current_chapter';
import { fetch_verses } from "./features/verses";
import {fetchVerses} from './features/verses/actions';

const {TabPane} = Tabs;

const App = () => {

  const livros = useSelector(state => state.books);
  const current_book = useSelector(state=> state.current_book);
  const current_chapter = useSelector(state=> state.current_chapter);
  const verses = useSelector(state => state.verses);

  const [chapters,setChapters] = useState([]);
  const dispatch = useDispatch();
  const [key,setKey] = useState('1');

  const changeKey = (key) =>{
    setKey(key);

    if(key === '1'){
      dispatch(fetchBooks());
      dispatch(set_current_chapter(0));
      dispatch(set_current_book(null));
      dispatch(fetch_verses([]));
    }
  }

  const handleBook = (book) =>{
    var vetor = [];
    for (let index = 1; index <= book.chapters; index++) {
      vetor.push(index);
    }
    setChapters(vetor);
    dispatch(set_current_book(book));
    setKey('2');
  };

  const handleChapter = (chapter) =>{
    dispatch(set_current_chapter(chapter));
    handleVerse(current_book.abbrev.pt, chapter);
    setKey('3');
  };

  const handleVerse = (book, chapter) =>{
    dispatch(fetchVerses(book,chapter));
  }

  useEffect(()=>{
    dispatch(fetchBooks());
  },[dispatch]);

  return (
    <div className="app">
      <Menu theme="dark" mode="horizontal">
        <Menu.Item icon={<BookTwoTone size={24} />} onClick={()=> setKey('1')}>
          Biblia Online
        </Menu.Item>
      </Menu>
      <Row justify="center" gutter={{ xs: 24, sm: 24, md: 24, lg: 12 }}>
        <Col span={18} className="gutter-row">
          <Tabs defaultActiveKey="1" activeKey={key} onChange={changeKey}>
            <TabPane tab="Livros" key="1">
              Livros
              <Row justify="center">
                <Col span="24" style={{ marginBottom: "200px" }}>
                  <List
                    bordered
                    dataSource={livros.length ? livros : [{ name: "Gênises" }]}
                    renderItem={(item) => (
                      <List.Item style={{ padding: 0 }}>
                        <Button
                          type="primary"
                          block
                          onClick={() => handleBook(item)}
                        >
                          {item.name}
                        </Button>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab="Cápitulos"
              key="2"
              disabled={Object.keys(current_book).length === 0 ? true : false}
            >
              Capitulos
              <Row justify="center">
                <Col span="24" style={{ marginBottom: "200px" }}>
                  <List
                    bordered
                    dataSource={chapters.length ? chapters : []}
                    renderItem={(item) => (
                      <List.Item style={{ padding: 0 }}>
                        <Button
                          type="primary"
                          block
                          onClick={() => handleChapter(item)}
                        >
                          {item}
                        </Button>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Versiculos" key="3" disabled={current_chapter === 0}>
              <b>
                Livro de {current_book.name} - Cáp. {current_chapter} -
                Versiculos
              </b>
              <Row justify="center">
                <Col span="24" style={{ marginBottom: "200px" }}>
                  <List
                    bordered
                    dataSource={verses.length ? verses : []}
                    renderItem={(item) => (
                      <List.Item>
                        <p>
                          <b>{item.number}</b> - {item.text}
                        </p>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default App;
