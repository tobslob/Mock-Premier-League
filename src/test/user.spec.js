import request from 'supertest';
import app from '../app';
import messages from '../utils/messages';
import {
  login, signup, invalidlogin, wrongEmail, adminLogin
} from './models/userModel';

const userUrl = '/api/v1/user/signup';
const loginUrl = '/api/v1/user/login';
const getUsers = '/api/v1/user';

describe('User js', () => {
  let id;
  let adminToken;
  let userToken;
  const invalidId = '5d884a2f81ecaa59818bc3';
  it('should create a user succesfully', async (done) => {
    const res = await request(app).post(userUrl).send(signup);
    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.message).toEqual(messages.user);
    done();
  }, 30000);

  it('should return 409, duplication error', async (done) => {
    const res = await request(app).post(userUrl).send(signup);
    expect(res.status).toEqual(409);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.duplicate);
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

  it('should login admin successfully', async (done) => {
    const res = await request(app).post(loginUrl).send(adminLogin);
    adminToken = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not login user with wrong password', async (done) => {
    const res = await request(app).post(loginUrl).send(invalidlogin);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.IncorrectLoginDetails);
    done();
  }, 30000);

  it('should not login user with invalid mail', async (done) => {
    const res = await request(app).post(loginUrl).send(wrongEmail);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should get all users', async (done) => {
    const res = await request(app).get(getUsers).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not get all users if token is not provided', async (done) => {
    const res = await request(app).get(getUsers);
    expect(res.status).toEqual(401);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorized);
    done();
  }, 30000);

  it('should not get all users if not admin token', async (done) => {
    const res = await request(app).get(getUsers).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should get a user', async (done) => {
    const res = await request(app).get(`${getUsers}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    done();
  }, 30000);

  it('should not get a user with invalid ID', async (done) => {
    const res = await request(app).get(`${getUsers}/${invalidId}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should not get a user if not admin token', async (done) => {
    const res = await request(app).get(`${getUsers}/${id}`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should not delete a user if not admin token', async (done) => {
    const res = await request(app).delete(`${getUsers}/${id}`).set('authorization', `Bearer ${userToken}`);
    expect(res.status).toEqual(403);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.unAuthorizedRoute);
    done();
  }, 30000);

  it('should delete a user successfully', async (done) => {
    const res = await request(app).delete(`${getUsers}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.message).toEqual(messages.deleteMessage);
    done();
  }, 30000);

  it('should not delete an unexist user', async (done) => {
    const res = await request(app).delete(`${getUsers}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);

  it('should not delete a user with an invalid ID', async (done) => {
    const res = await request(app).delete(`${getUsers}/${invalidId}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.castError);
    done();
  }, 30000);

  it('should not get an unexist user', async (done) => {
    const res = await request(app).get(`${getUsers}/${id}`).set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notfound);
    done();
  }, 30000);
});
