import React, { Component } from 'react';

class Bot extends Component {

    constructor(props) {
        super(props)

        this.state = {
            steamguard: '',
            needToUpdate: false,
            games:[], // this is the client side games
            undoGames:[]
        }
    }


    handleChange(e, key) {
        switch (key) {
            case 'steamguard':
                this.setState({ steamguard: e.currentTarget.value });
                break;
            default:
                break;
        }
    }

    handleSelectGame(e, user, index) {
        const { games, actions, status } = this.props; // props.games is server side

        let Tempgames = games;
        Tempgames[index] = e.currentTarget.value;

        actions.setBot({
            user,
            status,
            games: Tempgames
        })

    }

    needToUpdate(){
        this.setState({needToUpdate:true});
    }

    handleSelectStatus(e, user) {
        const { games, actions } = this.props;
        actions.setBot({
            user,
            status: e.currentTarget.value,
            games
        })
    }
    handleChangeGame(event, index)
    {
        if(index === undefined){
           this.setState({games:[event.target.value]})
        }else{ 
            const {games} = this.state;
            games[index] = event.target.value;
            this.setState({games})
        }
       this.needToUpdate();
        console.log(this.state.games)
    }

    addGame(){
        let tempGames = [...this.props.games];
        tempGames.push('');
        this.setState({games:tempGames})
        this.needToUpdate();
    }

    deleteGame(index){
        let tempGames = this.state.games;
        tempGames.splice(index,1);
        this.setState({games:tempGames});
        this.needToUpdate();
    }

    renderGames(ga) {
        const games = this.state.needToUpdate ? this.state.games : this.props.games
        if(games.length){
            return (<div>{games.map((item, index)=>{
                return (<div style={{"display":"block"}}><input key={index} onChange={(event)=>this.handleChangeGame(event, index)} value={item} /><span className="delete-game" onClick={() => this.deleteGame(index)}>x</span></div>) 
            })}{this.state.needToUpdate ? null : <p className="Add-game" onClick={this.addGame.bind(this)}>Add</p>}</div>)
        }else{
            return(<div>{this.state.needToUpdate ? null:<p className="Add-game" onClick={this.addGame.bind(this)}>Add</p>}</div>)
        }
    }

    updateGames(){
        const { avatar, userName, games, steamGuardNeeded,status, actions } = this.props;
        actions.setBot({
            user:userName,
            status,
            games: this.state.games
        })
        console.log('update undo')
        this.setState({
            needToUpdate: false,
            undoGames: [...this.state.games]
        })
    }

    undoGames(){
        console.log(this.state.undoGames, this.state.games)
        this.setState(
            {games: [...this.state.undoGames],
            needToUpdate:false
        });
    }

    render() {
        const { avatar, userName, games, steamGuardNeeded, actions } = this.props;
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
                {steamGuardNeeded === true ? <div className="steamguard-form"><input onChange={(e)=> this.handleChange(e, 'steamguard') } class="form-control form-steamguard" placeholder="SteamGuard" value={this.state.steamguard}></input>
                    <button type="submit" class="btn btn-primary" onClick={() => actions.submitSteamGuard({ user: userName, steamGuardNeeded: this.state.steamguard })}>Submit</button>
                </div> :
                    <div className="flex-column games">
                        <p>Games playing <ion-icon name="tv"></ion-icon></p>
                        {this.renderGames()}
                        {this.state.needToUpdate ? 
                        <button className="button-save" onClick={this.updateGames.bind(this)}>Update</button>: 
                        <button className="button-save button-hide">Update</button>}
                         
                         {this.state.needToUpdate ? 
                        <button className="button-save" onClick={this.undoGames.bind(this)}>Cancel</button>: 
                        <button className="button-save button-hide">Cancel</button>}
                    </div>}
                <button onClick={()=> actions.removeBot({user: userName})} type="button" className="close" aria-label="Close">
                    <ion-icon name="close-circle" size="large"></ion-icon>
                </button>
            </nav>
        )
    }

}

export default Bot;