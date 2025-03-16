const request = require('supertest');
const app = require('../src/app');

describe('Decision-Making Reports API', () => {
    it('should return a weekly sales report', async () => {
        const res = await request(app).get('/api/reports/sales/weekly');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('_sum');
    });

    it('should return an error for invalid period', async () => {
        const res = await request(app).get('/api/reports/sales/invalid');
        expect(res.status).toBe(400);
    });
});
