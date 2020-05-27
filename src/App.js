import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Menu, List, Button, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {fetchBooks} from './features/books/actions';
import {set_current_book} from './features/current_book';
import {set_current_chapter} from './features/current_chapter';
import {fetchVerse} from './features/current_verse/actions';
import { fetch_verses } from "./features/verses";
import {fetchVerses} from './features/verses/actions';
import {BookTwoTone} from '@ant-design/icons';
import "antd/dist/antd.css";

const {TabPane} = Tabs;

const App = () => {

  const livros = useSelector(state => state.books);
  const current_book = useSelector(state=> state.current_book);
  const current_chapter = useSelector(state=> state.current_chapter);
  const current_verse = useSelector(state => state.current_verse);
  const verses = useSelector(state => state.verses);

  const [chapters,setChapters] = useState([]);
  const dispatch = useDispatch();
  const [key,setKey] = useState('1');
  const [load, setLoad] = useState(false);

  const changeKey = (key) =>{
    setKey(key);

    if(key === '1'){
      setLoad(true);
      dispatch(fetchBooks());
      dispatch(set_current_chapter(0));
      dispatch(set_current_book(null));
      dispatch(fetch_verses([]));
      setTimeout(() => {
        setLoad(false);
      }, 500);
    }
  }

  const handleBook = (book) =>{
    setLoad(true);
    var vetor = [];
    for (let index = 1; index <= book.chapters; index++) {
      vetor.push(index);
    }
    setChapters(vetor);
    dispatch(set_current_book(book));
    setKey('2');

    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  const handleChapter = (chapter) =>{
    setLoad(true);
    dispatch(set_current_chapter(chapter));
    handleVerse(current_book.abbrev.pt, chapter);
    setKey('3');
    setTimeout(() => {
      setLoad(false);
    }, 500);
  };

  const handleVerse = (book, chapter) =>{
    dispatch(fetchVerses(book,chapter));
  }

  const handleCurrentVerse = (book, chapter, verse) =>{
    dispatch(fetchVerse(book, chapter, verse));
    setKey('4');
  }

  useEffect(()=>{
    setLoad(true);
    dispatch(fetchBooks());
    setTimeout(() => {
      setLoad(false);
    }, 500);
  },[dispatch]);

  return (
    <div className="app">
      <Menu theme="dark" mode="horizontal">
        <Menu.Item
          icon={<BookTwoTone size={24} />}
          onClick={() => changeKey("1")}
        >
          Biblia Online
        </Menu.Item>
      </Menu>
      <Row justify="center" gutter={{ xs: 24, sm: 24, md: 24, lg: 12 }}>
        <Col span={18} className="gutter-row">
          <Tabs defaultActiveKey="1" activeKey={key} onChange={changeKey}>
            <TabPane tab="Livros" key="1">
              Livros
              <Card style={{ height: 1300 }} loading={load}>
                <Row justify="center">
                  <Col span="24" style={{ marginBottom: "200px" }}>
                    <List
                      bordered
                      dataSource={
                        livros.length ? livros : [{ name: "Gênises" }]
                      }
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
              </Card>
            </TabPane>
            <TabPane
              tab="Cápitulos"
              key="2"
              disabled={Object.keys(current_book).length === 0 ? true : false}
            >
              Capitulos
              <Card style={{ height: 1300 }} loading={load}>
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
              </Card>
            </TabPane>
            <TabPane tab="Versiculos" key="3" disabled={current_chapter === 0}>
              <b>
                Livro de {current_book.name} - Cáp. {current_chapter} -
                Versiculos
              </b>
              <Card style={{ height: 1300 }} loading={load}>
                <Row justify="center">
                  <Col span="24" style={{ marginBottom: "200px" }}>
                    <List
                      bordered
                      dataSource={verses.length ? verses : []}
                      renderItem={(item) => (
                        <List.Item onClick={() => handleCurrentVerse(current_book, current_chapter, item.number)}>
                          <p>
                            <b>{item.number}</b> - {item.text}
                          </p>
                        </List.Item>
                      )}
                    />
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane
              tab="Lendo"
              key="4"
              disabled={Object.keys(current_verse).length === 0 ? true : false}
            >
              <p>
                {current_book.name} - {current_chapter} - {current_verse.number}
              </p>
              {current_verse.text}
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default App;
