import React, { Component } from 'react';
import Bot from './bot';
import FormBotAdd from './form-addBot';
class NavBot extends Component {


  componentDidMount() {
    const { actions } = this.props;
    actions.getBot();
  }

  renderAddBot() {
    const { actions, addingField, addingBot } = this.props;

    return (<div className="btnAddingBot">
      {addingBot === true ? <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div> : ""}
      {addingField === false ? <button onClick={() => actions.showAddField()} style={{display: 'contents'}}><ion-icon name="add-circle" size="large" style={{ color: "#88ba3c" }}></ion-icon></button> : <FormBotAdd actions={actions} />}
    </div>)
  }

  renderBots() {

    const { bots, actions } = this.props;

    if (bots.length === 0) {
      return (this.renderAddBot())
    }

    return (bots.map((bot, n) => {
      if (bots.length === n + 1) {
        return (<div>
          <Bot avatar={bot.avatar}
            userName={bot.user}
            games={bot.games}
            status={bot.status}
            steamGuardNeeded={bot.steamGuardNeeded}
            actions={actions}
          />
          {this.renderAddBot()}
        </div>
        )
      }
      return (<Bot avatar={bot.avatar}
        userName={bot.user}
        games={bot.games}
        status={bot.status}
        steamGuardNeeded={bot.steamGuardNeeded}
        actions={actions}
      />)

    }))

  }
  render() {
    return (
      <div>
        {this.renderBots()}
      </div>
    )
  }

}

export default NavBot;