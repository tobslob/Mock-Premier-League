const createFixture = {
  teamA: [{ name: 'Arsenal', score: 0 }],
  teamB: [{ name: 'Aston Villa', score: 0 }],
  matchInfo: [{ date: '2019-11-26T16:24:32.674+00:00' }, { stadium: 'Craven Cottage' }]
};

const sameTeam = {
  teamA: [{ name: 'Arsenal', score: 0 }],
  teamB: [{ name: 'Arsenal', score: 0 }],
  matchInfo: [{ date: '2019-11-26T16:24:32.674+00:00' }, { stadium: 'Craven Cottage' }]
};

const validFixture = {
  teamA: [{ name: 'Arsenal', score: 0 }],
  teamB: [{ name: 'Chelsea', score: 0 }],
  matchInfo: [{ date: '2019-11-26T16:24:32.674+00:00' }, { stadium: 'Craven Cottage' }]
};

const adminLogin = {
  email: 'admin@premierleague.com',
  password: 'Kazeem27'
};

const login = {
  email: 'kaztech2016@gmail.com',
  password: 'Kazeem27'
};

export {
  createFixture, adminLogin, login, sameTeam, validFixture
};
