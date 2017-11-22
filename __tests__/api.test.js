const request = require('supertest');
const app = require('./server');

describe('Test the root path', () => {
	test('It should response the GET method', () => {
		return request(app).get("/users").then(response => {
			expect(response.statusCode).toBe(200);
		});
	});
});
