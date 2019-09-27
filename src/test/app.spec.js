import request from 'supertest';
import app from '../app';
import messages from '../utils/messages';

describe('App js', () => {
  it('should display a welcome message successfully', async (done) => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('success');
    expect(res.body.data.message).toEqual(messages.welcome);
    done();
  }, 3000);

  it('should return 404 if route not found', async (done) => {
    const res = await request(app).get('/home');
    expect(res.status).toEqual(404);
    expect(res.body.status).toEqual('error');
    expect(res.body.data.message).toEqual(messages.notFound);
    done();
  }, 3000);
});
