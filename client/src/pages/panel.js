import React, { Component } from 'react';
import PanelHeader from '../containers/panel-header';
import Footer from '../components/footer';
import NavBots from '../containers/bots-panel';
class Home extends Component {
    render() {

        return (
            <div>
                <PanelHeader />
                <div className="container">
                <NavBots />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home;