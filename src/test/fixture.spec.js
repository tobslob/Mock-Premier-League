/* eslint-disable max-len */
import request from 'supertest';
import app from '../app';
import messages from '../utils/messages';
import {
  createFixture, adminLogin, login, sameTeam, validFixture, searchFixture
} from './models/fixtureModel';

// const baseUrl = '/api/v1';
const fixtureUrl = '/api/v1/fixture';
const fixturesUrl = '/api/v1/fixtures';
const loginUrl = '/api/v1/user/login';

describe('Fixture js', () => {
  let id;
  let adminToken;
  let userToken;
  const invalidId = '5d884a2f81ecaa59818bc3';
  const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDg4YWEyYjg4YTljYTRmMjhhNzExMmUiLCJlbWFpbCI6ImFkbWluQHByZW1pZXJsZWFndWUuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTY5MzEwNzIzLCJleHAiOjE1NjkzOTcxMjN9.9Cvg8yjyRUsJ43cBmSrs6ezbx2r2774L7GzaYjgJGVQ';

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

  it('should not create a fixture for unavailable team', async (done) => {
    const res = await request(app).post(fixtureUrl).send(createFixture).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.teamNotFound);
    done();
  }, 30000);

  it('should not create a fixture if teamA is the same with teamB', async (done) => {
    const res = await request(app).post(fixtureUrl).send(sameTeam).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(409);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.sameTeam);
    done();
  }, 30000);

  it('should not create a fixture if its user token', async (done) => {
    const res = await request(app).post(fixtureUrl).send(validFixture).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should create a fixture successfully', async (done) => {
    const res = await request(app).post(fixtureUrl).send(validFixture).set('authorization', `Bearer ${adminToken}`);
    id = res.body.data.createfixture._id;
    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not create a fixture if same and its status is pending', async (done) => {
    const res = await request(app).post(fixtureUrl).send(validFixture).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(409);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.existingFixture);
    done();
  }, 30000);

  it('should get a fixture', async (done) => {
    const res = await request(app).get(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should get all fixtures', async (done) => {
    const res = await request(app).get(fixturesUrl).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not get all fixtures if not admin', async (done) => {
    const res = await request(app).get(fixturesUrl).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should not get all teams if token is not provided', async (done) => {
    const res = await request(app).get(fixturesUrl).set('authorization', `Bearer ${expiredToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.tokenExpired);
    done();
  }, 30000);

  it('should not get a fixture with invalid ID', async (done) => {
    const res = await request(app).get(`${fixtureUrl}/${invalidId}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should get a fixture successfully', async (done) => {
    const res = await request(app).get(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    done();
  }, 30000);

  it('should get all pending fixture successfully', async (done) => {
    const res = await request(app).get(`${fixturesUrl}/pending`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should get all completed fixture successfully', async (done) => {
    const res = await request(app).get(`${fixturesUrl}/completed`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);


  it('should edit a fixture successfully', async (done) => {
    const res = await request(app).put(`${fixtureUrl}/${id}`).send(validFixture).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not edit a fixture if not admin token', async (done) => {
    const res = await request(app).put(`${fixtureUrl}/${id}`).send(validFixture).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should not throw 400 error if valid fixture datas are not provided', async (done) => {
    const res = await request(app).put(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    done();
  }, 30000);

  it('should not throw an error if id is invalid', async (done) => {
    const res = await request(app).put(`${fixtureUrl}/${invalidId}`).send(validFixture).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should not delete a fixture if not admin token', async (done) => {
    const res = await request(app).delete(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should delete a fixture successfully', async (done) => {
    const res = await request(app).delete(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.message).toEqual(messages.deleteMessage);
    done();
  }, 30000);

  it('should not delete an unexist fixture', async (done) => {
    const res = await request(app).delete(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should not delete a fixture with an invalid ID', async (done) => {
    const res = await request(app).delete(`${fixtureUrl}/${invalidId}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should not get an unexist fixture', async (done) => {
    const res = await request(app).get(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should not edit a fixture if not exist', async (done) => {
    const res = await request(app).put(`${fixtureUrl}/${id}`).set('authorization', `Bearer ${adminToken}`).send(validFixture);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should search fixture robustly', async (done) => {
    const res = await request(app).post(`${fixturesUrl}/search`).send(searchFixture);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);
});
