import React, { Component } from 'react';
import { Container } from 'reactstrap'
import Header from './components/header/header';
import Footer from './components/navigation/footer';
import ContainerSwitch from './components/navigation/containerSwitch';
import RequestHistoryListener from './components/listeners/requestHistoryListener';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    const pathName = window.location.pathname;
    if(pathName.length<2){
      this.props.history.push("/home");
    }
  }

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

export default withRouter(App);
