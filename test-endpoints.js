const http = require('http');

async function testSignupAndLogin() {
  try {
    console.log('Sending signup request...');
    const signupRes = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'name=Test+User&email=testuser1%40example.com&password=password123&role=student',
      redirect: 'manual'
    });
    
    console.log('Signup status:', signupRes.status);
    console.log('Signup Headers:', [...signupRes.headers.entries()]);
    
    const cookies = signupRes.headers.get('set-cookie');
    
    console.log('Sending login request...');
    const loginRes = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookies ? cookies.split(';')[0] : ''
      },
      body: 'email=testuser1%40example.com&password=password123',
      redirect: 'manual'
    });
    
    console.log('Login status:', loginRes.status);
    console.log('Login Headers:', [...loginRes.headers.entries()]);
    
  } catch (err) {
    console.error(err);
  }
}

testSignupAndLogin();
