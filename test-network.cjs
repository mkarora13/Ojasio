async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'via-express@test.com' })
    });
    console.log('Status:', res.status);
    console.log('JSON:', await res.json());
  } catch (err) {
    console.error(err);
  }
}
test();
