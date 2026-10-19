import { test, expect } from '@playwright/test';

test.describe('REST API Automation Suite - Users & Posts Endpoints', () => {

  // GET Request Assertions
  test('GET /posts - Fetch all posts & validate status code and payload @smoke @critical', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('title');
  });

  test('GET /posts/1 - Fetch single resource and validate contract @smoke', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.userId).toBe(1);
    expect(typeof body.title).toBe('string');
  });

  // POST Request Assertion
  test('POST /posts - Create new post resource @critical', async ({ request }) => {
    const newPost = {
      title: 'Automated Test Post',
      body: 'Verified via Playwright API automation suite',
      userId: 1,
    };

    const response = await request.post('/posts', { data: newPost });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    expect(body.userId).toBe(newPost.userId);
    expect(body).toHaveProperty('id');
  });

  // PUT Request Assertion
  test('PUT /posts/1 - Update existing resource @critical', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1,
    };

    const response = await request.put('/posts/1', { data: updatedPost });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Title');
  });

  // DELETE Request Assertion
  test('DELETE /posts/1 - Remove resource @smoke', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });

  // Negative Scenario Assertions
  test('GET /posts/999999 - Handle non-existent resource @negative', async ({ request }) => {
    const response = await request.get('/posts/999999');
    expect(response.status()).toBe(404);
  });

  test('POST /posts - Malformed request body handling @negative', async ({ request }) => {
    const response = await request.post('/posts', {
      data: "invalid_json_string_payload"
    });
    // Validates that the server handles malformed client input correctly (4xx or 5xx response)
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});
