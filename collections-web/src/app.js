import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './components/nav/header';
import SecondNavRouter from './components/nav/secondNavRouter';
import Notification from './components/notification/notification';
import { withRouter } from 'react-router-dom';

class App extends Component {   

  constructor(props){
    super(props);
  }

  componentDidMount(){
    const pathName = window.location.pathname;
    if(pathName.length<2){
      this.props.history.push("/data/sources/pipeline");
    }
  }

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

export default withRouter(App);