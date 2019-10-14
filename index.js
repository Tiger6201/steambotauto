
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3333
const SteamUser = require('steam-user');
const steamBot = require('./class/steamBot');
const path = require('path');
let hostName = null;
var http = require("http");

const app = express();
app.listen(port, () => console.log('Server running on port', port));



/////////middlewares/////////
const cors = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    next()
}

app.use(express.json())
app.use(cors);
app.use((req, res, next) => {
    hostName = req.headers.host;
    next();
})

/////////API/////////
let bots = [];

app.get('/api/list', (req, res) => {
    let users = {};
    users['users'] = [];

    bots.map(user => {
        let tempUser = {};
        if (user.user._playingAppIds.length === 0)
            user.user._playingAppIds = ['', '', ''];

        if (user.steamGuardNeeded) {
            tempUser.steamGuardNeeded = true;
        }
        tempUser.user = user.details.user;
        tempUser.games = user.user._playingAppIds;
        tempUser.status = user.status;
        tempUser.avatar = user.avatar;
        users['users'].push(tempUser);


    })

    res.send(JSON.stringify(users));

})

if (process.env.NODE_ENV === "production") {

    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })

}

app.post('/api/configuser', (req, res) => {
    let userExists = null;

    bots.forEach(user => {
        if (user.details.user === req.body.user) {
            userExists = true;
            const userConfig = {
                user: req.body.user,
                status: req.body.status,
                games: req.body.games,
                avatar: user.avatar
            }
            userConfig.games.forEach((game, index, tableau) => {
                tableau[index] = parseInt(game);
            })

            if (userConfig.status === 'online')
                userConfig.status = 1;

            if (userConfig.status === 'offline')
                userConfig.status = 0;

            console.log(userConfig.games)
            user.user.gamesPlayed(userConfig.games);
            user.user.setPersona(userConfig.status);
            res.send(JSON.stringify(userConfig));
        }
    })

    if (userExists === null) {
        return res.send('user doesnt exist');
    }

})

app.post('/api/connect', (req, res) => {
    let userExists = false;

    bots.forEach(user => {
        if (user.details.user === req.body.user) {
            userExists = true;
        }
    })

    if (userExists === true) {
        return res.send('already connected');
    }

    const bot = new steamBot({ user: req.body.user, mdp: req.body.password });

    bot.connect(() => {
        console.log('Disconnected');
    }).then((steamguard) => {
        if (steamguard === "steamguard") {
            res.send(JSON.stringify({ connected: true, user: { user: req.body.user, avatar: bot.avatar, games: ['', '', ''], status: bot.status, steamGuardNeeded: true } }));
        } else {
            res.send(JSON.stringify({ connected: true, user: { user: req.body.user, avatar: bot.avatar, games: ['', '', ''], status: bot.status } }))
        }
        bots.push(bot)
    }).catch(err => {
        res.send('Wrong user or password');
    })

})

app.post('/api/steamguard', (req, res) => {
    let userExists = false;
    let tempUser = null;
    bots.forEach(user => {
        if (user.details.user === req.body.user) {
            userExists = true;
            tempUser = user;
        }
    })

    if (userExists === true && tempUser.steamGuardNeeded) {
        tempUser.steamGuardNeeded(req.body.steamGuardNeeded).then((bot) => {
            res.send(JSON.stringify({ connected: true, user: { user: req.body.user, avatar: bot.avatar, games: ['', '', ''], status: bot.status } }));
        }).catch((err) => {
            res.send({ connected: false, message: err })
        })
    } else {
        res.send({ connected: false })
    }
})

app.post('/api/removebot', (req, res) => {

    let userExists = false;
    let indexAccount = null;
    let tempUser = null;

    bots.forEach((user, index) => {
        if (user.details.user === req.body.user) {
            userExists = true;
            tempUser = user;
            indexAccount = index;
        }
    })

    if (userExists === true) {
        bots[indexAccount].user.logOff();
        bots.splice(indexAccount, 1);
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }

})

// keeps heroku app alive
setInterval(() => {

    if (hostName) {
        http.get("http://" + hostName);
    }

}, 300000);
