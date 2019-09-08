import React, { Component } from 'react';

import Header from '../components/header';
import MainPricing from '../components/main-pricing';
import Footer from '../components/footer';
class Pricing extends Component {
    render() {

        return (
            <div>
                <Header />
                <MainPricing />
                <Footer />
            </div>
        )
    }
}

export default Pricing;