import { test, expect } from '../fixtures/userGaragePage.fixure.js';

test.describe('FIXTURE_BASED: API tests', {
    tag: ['@API-REQUESTS'],
},
    () => {
        test('Intercept profile request', { tag: '@Interception' }, async ({ garagePage, page }) => {
            await page.route('**/profile', async route => {
                const response = await route.fetch();
                const json = await response.json();
                json.data['name'] = 'Vader';
                json.data['lastName'] = 'Darth';
                await route.fulfill({ response, json });
            });

            await garagePage.checkButtonProfileAndClick();
            await expect(garagePage.profileName).toContainText('Vader Darth');
        });

        test('Create new car with invalid BrandId ', { tag: '@API-REQUEST-CONTEXT' }, async ({ garagePage, page }) => {
            const res = await page.request.post('/api/cars', { data: { carBrandId: -99999, carModelId: 1, mileage: 100 } });

            const json = await res.json() 

            expect(res.status()).toEqual(404);
            expect(json.status).toBe('error')
            expect(json.message).toBe('Brand not found')
        });

        test('Create new car with invalid ModelId ', { tag: '@API-REQUEST-CONTEXT' }, async ({ garagePage, page }) => {
            const res = await page.request.post('/api/cars', { data: { carBrandId: 1, carModelId: -99991, mileage: 100 } });

            const json = await res.json() 

            expect(res.status()).toEqual(404);
            expect(json.status).toBe('error')
            expect(json.message).toBe('Model not found')
        });

        test('Create new car with valid data', { tag: '@API-REQUEST-CONTEXT' }, async ({ garagePage, page }) => {
            const res = await page.request.post('/api/cars', { data: { carBrandId: 1, carModelId: 1, mileage: 100 } });

            const json = await res.json() 

            expect(res.ok()).toBeTruthy();
            expect(json.data.carBrandId).toBe(1)
            expect(json.data.carModelId).toBe(1)
            expect(json.data.initialMileage).toBe(100)
            expect(json.data.mileage).toBe(100)

        });

    });