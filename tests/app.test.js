const request = require('supertest')
const app = require('../src/server/app')

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app)
      .get('/test')
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});