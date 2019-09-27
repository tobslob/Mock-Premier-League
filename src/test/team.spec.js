/* eslint-disable max-len */
import request from 'supertest';
import app from '../app';
import messages from '../utils/messages';
import { createTeam, adminLogin, login } from './models/teamModel';

// const baseUrl = '/api/v1';
const teamUrl = '/api/v1/team';
const teamsUrl = '/api/v1/teams';
const loginUrl = '/api/v1/user/login';
const postTeam = '/api/v1/team/%';

describe('Team js', () => {
  let id;
  let adminToken;
  let userToken;
  const invalidId = '5d884a2f81ecaa59818bc3';

  it('should login admin successfully', async (done) => {
    const res = await request(app).post(loginUrl).send(adminLogin);
    adminToken = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should login user successfully', async (done) => {
    const res = await request(app).post(loginUrl).send(login);
    id = res.body.data._id;
    userToken = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should create a team successfully', async (done) => {
    const res = await request(app).post(teamUrl).send(createTeam).set('authorization', `Bearer ${adminToken}`);
    id = res.body.data.team._id;
    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not create a team if its user token', async (done) => {
    const res = await request(app).post(teamUrl).send(createTeam).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);


  it('should return 409, duplication error', async (done) => {
    const res = await request(app).post(teamUrl).send(createTeam).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(409);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.duplicateName);
    done();
  }, 30000);

  it('should get all teams', async (done) => {
    const res = await request(app).get(teamsUrl).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not get all teams if token is not provided', async (done) => {
    const res = await request(app).get(teamsUrl);
    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorized);
    done();
  }, 30000);

  it('should not get a team with invalid ID', async (done) => {
    const res = await request(app).get(`${teamUrl}/${invalidId}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should get a team successfully', async (done) => {
    const res = await request(app).get(`${teamUrl}/${id}`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should edit a team successfully', async (done) => {
    const res = await request(app).put(`${teamUrl}/${id}`).set('authorization', `Bearer ${adminToken}`).send(createTeam);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not edit a team if not admin token', async (done) => {
    const res = await request(app).put(`${teamUrl}/${id}`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should not edit a team if id is invalid', async (done) => {
    const res = await request(app).put(`${teamUrl}/${invalidId}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should not delete a team if not admin token', async (done) => {
    const res = await request(app).delete(`${teamUrl}/${id}`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should delete a team successfully', async (done) => {
    const res = await request(app).delete(`${teamUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.message).toEqual(messages.deleteMessage);
    done();
  }, 30000);

  it('should not delete an unexist team', async (done) => {
    const res = await request(app).delete(`${teamUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should not delete a team with an invalid ID', async (done) => {
    const res = await request(app).delete(`${teamUrl}/${invalidId}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should not get an unexist team', async (done) => {
    const res = await request(app).get(`${teamUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should not edit a team if not exist', async (done) => {
    const res = await request(app).put(`${teamUrl}/${id}`).set('authorization', `Bearer ${adminToken}`).send(createTeam);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should return 500 internal error', async (done) => {
    const res = await request(app).post(postTeam).set('authorization', `Bearer ${adminToken}`).send(createTeam);
    expect(res.status).toEqual(500);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.serverError);
    done();
  }, 30000);
});
