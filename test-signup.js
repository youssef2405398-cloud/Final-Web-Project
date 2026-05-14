async function testSignup() {
  try {
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'name=Test+User&email=test%40example.com&password=password123&role=student'
    });
    console.log('Status:', res.status);
    console.log('Redirected:', res.redirected);
    console.log('URL:', res.url);
    const text = await res.text();
    console.log('Body length:', text.length);
  } catch (err) {
    console.error(err);
  }
}

testSignup();
