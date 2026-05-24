const http = require('http');

async function testLoginFail() {
  try {
    const loginRes = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'email=testuser1%40example.com&password=password123',
      redirect: 'manual'
    });
    
    console.log('Login status:', loginRes.status);
    console.log('Login Location:', loginRes.headers.get('location'));
    
  } catch (err) {
    console.error(err);
  }
}

testLoginFail();
