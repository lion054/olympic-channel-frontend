export function apiEndpoint(relPath: string) {
  const { REACT_APP_API_HOST, REACT_APP_API_PORT } = process.env;
  return `http://${REACT_APP_API_HOST}:${REACT_APP_API_PORT}/api/v1/${relPath}`;
}
