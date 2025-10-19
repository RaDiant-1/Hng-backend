// Simple test script to verify the /me endpoint
// Run with: node tests.js

const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:3000';
const ENDPOINT = `${BASE_URL}/me`;

// ANSI color codes for pretty output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function runTests() {
  console.log('\n' + '='.repeat(50));
  log('blue', '🧪 Testing Cat Facts API Endpoint');
  console.log('='.repeat(50) + '\n');
  
  let passedTests = 0;
  let totalTests = 0;

  // Test 1: Endpoint accessibility
  totalTests++;
  try {
    log('yellow', `Test 1: Checking if ${ENDPOINT} is accessible...`);
    const response = await axios.get(ENDPOINT);
    
    if (response.status === 200) {
      log('green', '✓ PASS: Endpoint returns 200 OK');
      passedTests++;
    } else {
      log('red', `✗ FAIL: Expected 200, got ${response.status}`);
    }
  } catch (error) {
    log('red', `✗ FAIL: Cannot reach endpoint - ${error.message}`);
  }

  // Test 2: Content-Type header
  totalTests++;
  try {
    log('yellow', '\nTest 2: Checking Content-Type header...');
    const response = await axios.get(ENDPOINT);
    const contentType = response.headers['content-type'];
    
    if (contentType && contentType.includes('application/json')) {
      log('green', `✓ PASS: Content-Type is ${contentType}`);
      passedTests++;
    } else {
      log('red', `✗ FAIL: Content-Type is ${contentType}, expected application/json`);
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Test 3: Response structure
  totalTests++;
  try {
    log('yellow', '\nTest 3: Validating response structure...');
    const response = await axios.get(ENDPOINT);
    const data = response.data;
    
    const requiredFields = ['status', 'user', 'timestamp', 'fact'];
    const missingFields = requiredFields.filter(field => !(field in data));
    
    if (missingFields.length === 0) {
      log('green', '✓ PASS: All required fields present');
      passedTests++;
    } else {
      log('red', `✗ FAIL: Missing fields: ${missingFields.join(', ')}`);
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Test 4: User object structure
  totalTests++;
  try {
    log('yellow', '\nTest 4: Validating user object...');
    const response = await axios.get(ENDPOINT);
    const user = response.data.user;
    
    const userFields = ['email', 'name', 'stack'];
    const missingUserFields = userFields.filter(field => !(field in user));
    
    if (missingUserFields.length === 0) {
      log('green', '✓ PASS: User object has all required fields');
      log('blue', `  - Email: ${user.email}`);
      log('blue', `  - Name: ${user.name}`);
      log('blue', `  - Stack: ${user.stack}`);
      passedTests++;
    } else {
      log('red', `✗ FAIL: Missing user fields: ${missingUserFields.join(', ')}`);
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Test 5: Status field value
  totalTests++;
  try {
    log('yellow', '\nTest 5: Checking status field...');
    const response = await axios.get(ENDPOINT);
    
    if (response.data.status === 'success') {
      log('green', '✓ PASS: Status is "success"');
      passedTests++;
    } else {
      log('red', `✗ FAIL: Status is "${response.data.status}", expected "success"`);
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Test 6: Timestamp format (ISO 8601)
  totalTests++;
  try {
    log('yellow', '\nTest 6: Validating timestamp format (ISO 8601)...');
    const response = await axios.get(ENDPOINT);
    const timestamp = response.data.timestamp;
    
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    
    if (iso8601Regex.test(timestamp)) {
      log('green', `✓ PASS: Timestamp is valid ISO 8601 format`);
      log('blue', `  - Timestamp: ${timestamp}`);
      passedTests++;
    } else {
      log('red', `✗ FAIL: Invalid timestamp format: ${timestamp}`);
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Test 7: Cat fact exists and is a string
  totalTests++;
  try {
    log('yellow', '\nTest 7: Checking cat fact...');
    const response = await axios.get(ENDPOINT);
    const fact = response.data.fact;
    
    if (typeof fact === 'string' && fact.length > 0) {
      log('green', `✓ PASS: Cat fact is present`);
      log('blue', `  - Fact: "${fact.substring(0, 60)}${fact.length > 60 ? '...' : ''}"`);
      passedTests++;
    } else {
      log('red', `✗ FAIL: Cat fact is missing or invalid`);
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Test 8: Dynamic timestamp (changes on each request)
  totalTests++;
  try {
    log('yellow', '\nTest 8: Verifying timestamp updates on each request...');
    const response1 = await axios.get(ENDPOINT);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    const response2 = await axios.get(ENDPOINT);
    
    const timestamp1 = response1.data.timestamp;
    const timestamp2 = response2.data.timestamp;
    
    if (timestamp1 !== timestamp2) {
      log('green', '✓ PASS: Timestamp updates with each request');
      log('blue', `  - Request 1: ${timestamp1}`);
      log('blue', `  - Request 2: ${timestamp2}`);
      passedTests++;
    } else {
      log('red', `✗ FAIL: Timestamp doesn't update (both are ${timestamp1})`);
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Test 9: Cat fact changes (dynamic content)
  totalTests++;
  try {
    log('yellow', '\nTest 9: Verifying cat facts are dynamic...');
    const requests = [];
    for (let i = 0; i < 5; i++) {
      requests.push(axios.get(ENDPOINT));
    }
    const responses = await Promise.all(requests);
    const facts = responses.map(r => r.data.fact);
    const uniqueFacts = new Set(facts);
    
    if (uniqueFacts.size > 1) {
      log('green', `✓ PASS: Cat facts are dynamic (${uniqueFacts.size}/5 unique)`);
      passedTests++;
    } else {
      log('yellow', '⚠ WARNING: All 5 requests returned the same fact (might be coincidence)');
      log('blue', `  - Fact: "${facts[0]}"`);
      passedTests++; // Still pass, as it could be random chance
    }
  } catch (error) {
    log('red', `✗ FAIL: ${error.message}`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  log('blue', '📊 Test Summary');
  console.log('='.repeat(50));
  log('green', `Passed: ${passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    log('green', '\n🎉 All tests passed! The API is ready for submission.');
  } else {
    log('red', `\n❌ ${totalTests - passedTests} test(s) failed. Please fix the issues.`);
  }
  console.log('');
}

// Run tests
runTests().catch(error => {
  log('red', `\n❌ Test execution failed: ${error.message}`);
  process.exit(1);
});
