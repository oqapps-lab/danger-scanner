const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force Metro to bind on all interfaces (IPv4 + IPv6) so ADB reverse works
config.server = { ...config.server, host: '0.0.0.0' };

module.exports = config;
