# Mock-Premier-League
API that serves the latest scores of fixtures of matches in a “Mock Premier League”

[![Reviewed by Hound](http://img.shields.io/badge/Reviewed%20By-Hound-%23a874d1)](https://houndci.com)
[![Build Status](https://travis-ci.org/tobslob/Mock-Premier-League.svg?branch=master)](https://travis-ci.org/tobslob/Mock-Premier-League.svg?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1f78f6d74b35d99749f3/test_coverage)](https://codeclimate.com/github/tobslob/Mock-Premier-League/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/1f78f6d74b35d99749f3/maintainability)](https://codeclimate.com/github/tobslob/Mock-Premier-League/maintainability)

## Features

**Admin accounts**
- signup/login
- manage teams (add, remove, edit, view)
- create fixtures (add, remove, edit, view)
- Generate unique links for fixture

**Users accounts**

- signup/login
- view teams
- view completed fixtures
- view pending fixtures
- search fixtures/teams

## Technologies

- NodeJs
- MongoDB
- Redis
- Docker
- POSTMAN
- Jest
- Express
- Travis
- Codeclimate

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node.js

- To run:

```sh
git clone <https://github.com/tobslob/Mock-Premier-League.git>
cd Mock-Premier-League
npm install
npm run start:dev
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/user/signup Create user account`

`- DELETE /api/api/v1/user/:userId Delete a user`

`- POST /api/v1/user/login Login a user`

`- GET /api/v1/user/:userId Get a user`

`- GET /api/v1/user Get all user`

`- POST /api/v1/team Admin can add a team`

`- DELETE /api/v1/team/:teamId Admin can remove team`

`- PUT /api/v1/team/:teamId Admin can edit a team`

`- GET /api/v1/team/:teamId Admin can view a single team`

`- GET /api/v1/teams Admin can view all teams`

`- POST /api/v1/fixture Admin can add a fixture`

`- DELETE /api/v1/fixture/:fixtureId Admin can remove fixture`

`- PUT /api/v1/fixture/:fixtureId Admin can update fixture`

`- GET /api/v1/fixture/:fixtureId Admin can view a single fixture`

`- GET /api/v1/fixtures Admin can view all fixture`

`- GET /api/v1/fixtures/completed User can view all completed fixtures`

`- GET /api/v1/fixtures/pending User can view all pending fixtures`

`- POST /api/v1/fxtures/search User can search fixture robustly`

`- POST /api/v1/teams/search User can search team robustly`

## API

The API is hosted at
[https://mock-premier-league-api.herokuapp.com/](https://mock-premier-league-api.herokuapp.com/)

## API Documentation

[https://documenter.getpostman.com/view/6225567/SVn3tFec](https://documenter.getpostman.com/view/6225567/SVn3tFec)

## Author

Kazeem Oluwatobi Odutola
