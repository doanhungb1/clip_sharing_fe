export default function authHeader() {
  const jwtToken= localStorage.getItem('jwt-token');

  if (jwtToken) {
    return { 'Authorization': jwtToken };
  } else {
    return {};
  }
}