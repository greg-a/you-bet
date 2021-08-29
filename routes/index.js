const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
  });
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/login.html'));
  });
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/signup.html'));
  });
  app.get('/:username', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/[username].html'));
  });
  app.get('/:username/bets/:betId', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/[username]/bet/[betId].html'));
  });
}
