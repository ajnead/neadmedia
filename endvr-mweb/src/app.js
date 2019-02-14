import React, { Component } from 'react';
import { Container } from 'reactstrap'
import Header from './components/header/header';
import Footer from './components/navigation/footer';
import ContainerSwitch from './components/navigation/containerSwitch';
import RequestHistoryListener from './components/listeners/requestHistoryListener';

class App extends Component {
  render() {
    return (
      <Container fluid className="padding-0">
        <Header version={'alpha'} />
        <div className="container">      
          <ContainerSwitch />
        </div>
        <Footer />
        <div className="display-none">
          <RequestHistoryListener />
        </div>
      </Container>
    );
  }
}

export default App;
