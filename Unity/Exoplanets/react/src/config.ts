const DATABASE_URL = Interop.System.Environment.GetEnvironmentVariable('DATABASE_URL') || '';
const DATABASE_KEY = Interop.System.Environment.GetEnvironmentVariable('DATABASE_KEY') || '';
const API_DOMAIN = Interop.System.Environment.GetEnvironmentVariable('API_DOMAIN') || '';
const API_URL = `http://${API_DOMAIN}`;
const API_SOCKET = `ws://${API_DOMAIN}`;

export {
  DATABASE_KEY, DATABASE_URL, API_URL, API_SOCKET,
};
