// tests/api.test.js
// Simple integration tests — run with: node tests/api.test.js
// Requires the server to be running on localhost:5000

const BASE = 'http://localhost:5000/api';

let createdId = null;

// ── Colour helpers ──────────────────────────────────────────────
const g = (s) => `\x1b[32m${s}\x1b[0m`;  // green
const r = (s) => `\x1b[31m${s}\x1b[0m`;  // red
const b = (s) => `\x1b[34m${s}\x1b[0m`;  // blue

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    console.log(g(`  ✓ ${name}`));
    passed++;
  } catch (err) {
    console.log(r(`  ✗ ${name}`));
    console.log(r(`      → ${err.message}`));
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  return { status: res.status, body: await res.json() };
}

async function patch(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  return { status: res.status, body: await res.json() };
}

async function del(path) {
  const res = await fetch(`${BASE}${path}`, { method: 'DELETE' });
  return { status: res.status, body: await res.json() };
}

// ── Test suites ─────────────────────────────────────────────────
async function run() {
  console.log('\n' + b('BlueKod API Tests'));
  console.log(b('─────────────────'));

  // Health check
  console.log('\n» Health');
  await test('GET /health returns 200', async () => {
    const res = await fetch('http://localhost:5000/health');
    const body = await res.json();
    assert(res.status === 200, `Expected 200, got ${res.status}`);
    assert(body.status === 'ok', 'Expected status: ok');
  });

  // Create contact
  console.log('\n» POST /api/contact');

  await test('Valid submission returns 201', async () => {
    const { status, body } = await post('/contact', {
      firstName: 'Test',
      lastName:  'User',
      email:     'test@example.com',
      service:   'Website Development',
      message:   'This is a test message from the automated test suite.',
    });
    assert(status === 201, `Expected 201, got ${status}`);
    assert(body.success === true, 'Expected success: true');
    assert(body.data.id, 'Expected an ID in response');
    createdId = body.data.id;
  });

  await test('Missing firstName returns 422', async () => {
    const { status, body } = await post('/contact', {
      email:   'x@example.com',
      message: 'Hello there, this is a message.',
    });
    assert(status === 422, `Expected 422, got ${status}`);
    assert(body.success === false, 'Expected success: false');
  });

  await test('Invalid email returns 422', async () => {
    const { status } = await post('/contact', {
      firstName: 'Bad',
      email:     'not-an-email',
      message:   'Test message content here.',
    });
    assert(status === 422, `Expected 422, got ${status}`);
  });

  await test('Short message returns 422', async () => {
    const { status } = await post('/contact', {
      firstName: 'Bad',
      email:     'ok@example.com',
      message:   'Short',
    });
    assert(status === 422, `Expected 422, got ${status}`);
  });

  // Read
  console.log('\n» GET /api/contact');

  await test('GET /api/contact returns paginated list', async () => {
    const { status, body } = await get('/contact');
    assert(status === 200, `Expected 200, got ${status}`);
    assert(Array.isArray(body.data), 'Expected data to be an array');
    assert(body.meta.total >= 1, 'Expected at least 1 entry');
  });

  await test('GET /api/contact/:id returns the created contact', async () => {
    if (!createdId) throw new Error('No createdId from earlier test');
    const { status, body } = await get(`/contact/${createdId}`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data.email === 'test@example.com', 'Email mismatch');
  });

  await test('GET /api/contact/stats returns stats object', async () => {
    const { status, body } = await get('/contact/stats');
    assert(status === 200, `Expected 200, got ${status}`);
    assert(typeof body.data.total === 'number', 'Expected total to be a number');
  });

  await test('GET /api/contact/invalid-id returns 400', async () => {
    const { status } = await get('/contact/not-a-valid-id');
    assert(status === 400, `Expected 400, got ${status}`);
  });

  // Update
  console.log('\n» PATCH /api/contact/:id/status');

  await test('PATCH status to "read" returns 200', async () => {
    if (!createdId) throw new Error('No createdId');
    const { status, body } = await patch(`/contact/${createdId}/status`, { status: 'read' });
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.data.status === 'read', 'Expected status: read');
  });

  await test('PATCH invalid status returns 400', async () => {
    if (!createdId) throw new Error('No createdId');
    const { status } = await patch(`/contact/${createdId}/status`, { status: 'unknown' });
    assert(status === 400, `Expected 400, got ${status}`);
  });

  // Delete
  console.log('\n» DELETE /api/contact/:id');

  await test('DELETE created contact returns 200', async () => {
    if (!createdId) throw new Error('No createdId');
    const { status, body } = await del(`/contact/${createdId}`);
    assert(status === 200, `Expected 200, got ${status}`);
    assert(body.success === true, 'Expected success: true');
  });

  await test('DELETE already-deleted returns 404', async () => {
    if (!createdId) throw new Error('No createdId');
    const { status } = await del(`/contact/${createdId}`);
    assert(status === 404, `Expected 404, got ${status}`);
  });

  // Summary
  console.log('\n' + b('─────────────────'));
  console.log(`  ${g(`${passed} passed`)}  ${failed ? r(`${failed} failed`) : ''}`);
  console.log('');

  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error(r('\nFatal error running tests:'), err.message);
  process.exit(1);
});
