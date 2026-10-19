import { test, expect } from '@playwright/test';

test.describe('API Testing Suite', () => {

  test('GET /posts - Fetch post list @smoke', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('POST /posts - Create new item @critical', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'QA Automation Test',
        body: 'Testing Playwright API Framework',
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.title).toBe('QA Automation Test');
  });

  test('GET /posts/999999 - Handle non-existent resource @negative', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');
    expect(response.status()).toBe(404);
  });

});
