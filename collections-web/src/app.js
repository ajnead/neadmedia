import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './components/nav/header';
import SecondNavRouter from './components/nav/secondNavRouter';
import Notification from './components/notification/notification';

class App extends Component {   

  render() {
    return (
      <Container fluid className="no-padding body-all">
        <Header />
        <div className="body-page">
          <SecondNavRouter />
        </div>
        <Notification />
      </Container>
    );
  }
}

export default App;