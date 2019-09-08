const SteamUser = require('steam-user');

class steamBot {
    constructor(details) {
        this.connected = null;
        this.user = new SteamUser();
        this.details = details;
        this.avatar = '';
        this.status = '';
        this.games = this.user._playingAppIds;
    }

    connect(callback) {
        return new Promise((resolve, reject) => {
            this.user.logOn({
                "accountName": this.details.user,
                "password": this.details.mdp
            });

            this.user.on('error', (err) => {
                console.log('error');
                if (this.connected === true) {
                    callback()
                }
                this.connected = false;
                reject(err);
            })

            this.user.on('loggedOn', (details) => {

                if (this.user._logOnDetails.anon_user_target_account_name === 'anonymous') {
                    return reject('anonymous');
                }

                this.connected = true;
                this.user.getPersonas([this.user.logOnResult.client_supplied_steamid], (err, personas) => {
                    if (err) {
                    } else {
                        this.avatar = personas[this.user.logOnResult.client_supplied_steamid].avatar_url_medium;
                        this.status = 'online';
                        this.changeStatus(1)
                    }
                    resolve();
                })
            })

            this.user.on('disconnected', (count, friends) => {
                console.log('disconnected');
                if (this.connected === true) {
                    callback()
                }
                this.connected = false;
            })

            this.user.on('playingState', (blocked, playingApp) => {
                console.log('blocked:', blocked)
                console.log('current playing:', playingApp)
            })
        })

    }

    playGame(appid) {
        this.user.gamesPlayed(appid);
    }

    changeStatus(status) {
        switch (status) {
            case 1:
                this.user.setPersona(SteamUser.EPersonaState.Online);
                break;
        }
    }
}

module.exports = steamBot;