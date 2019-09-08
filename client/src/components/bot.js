import React, { Component } from 'react';

class Bot extends Component {

    handleSelectGame(e, user, index) {
        const { games, actions, status } = this.props;

        let Tempgames = games;
        Tempgames[index] = e.currentTarget.value;

        actions.setBot({
            user,
            status,
            games: Tempgames
        })

    }

    handleSelectStatus(e, user) {
        const { games, actions } = this.props;
        actions.setBot({
            user,
            status: e.currentTarget.value,
            games
        })
    }

    renderGames(ga) {
        const games = [730, 440, 221100, 252490, ''];
        return games.map(game => {
            if (game === ga) {
                return('');
            } else {
                return (<option>{game}</option>);
            }
        })
    }

    render() {
        const { avatar, userName, games } = this.props;
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark navbarbot">
                <div className="flex-column text-center userstatus">
                    <img src={avatar} border="0" alt=""></img>
                    <p>{userName}</p>
                    <select className="form-status" onChange={(e) => this.handleSelectStatus(e, userName)}>
                        <option>online</option>
                        <option>offline</option>
                    </select>
                </div>
                <div className="flex-column games">
                    <p>Games playing <ion-icon name="tv"></ion-icon></p>
                    {games.map((game, index) => {
                        return (
                            <ul className="gamelist">
                                <select className="form-control2" onChange={(e) => this.handleSelectGame(e, userName, index)}>
                                    <option>{game}</option>
                                    {this.renderGames(games[index])}
                                </select>
                            </ul>)
                    })}

                </div>
                <button type="button" className="close" aria-label="Close">
                    <ion-icon name="close-circle" size="large"></ion-icon>
                </button>
            </nav>
        )
    }

}

export default Bot;