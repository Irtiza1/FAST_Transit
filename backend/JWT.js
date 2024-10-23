import crypto from 'crypto';
// const crypto = require('crypto');

const generateJWTSecret = () => {
    return crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex string
};

console.log(generateJWTSecret());
