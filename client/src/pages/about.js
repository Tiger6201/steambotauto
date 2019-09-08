import React, { Component } from 'react';
import Header from '../components/header';
import About from '../components/main-about';
import Footer from '../components/footer';
class Home extends Component {
    render() {

        return (
            <div>
                <Header />
                <About />
                <Footer />
            </div>
        )
    }
}

export default Home;