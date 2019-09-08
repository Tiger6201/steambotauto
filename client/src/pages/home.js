import React, { Component } from 'react';
import Header from '../components/header';
import Main from '../components/main-home';
import Footer from '../components/footer';
class Home extends Component {
    render() {

        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}

export default Home;