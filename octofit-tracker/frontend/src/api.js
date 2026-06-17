/**
 * Base API URL helper.
 * Set VITE_CODESPACE_NAME in .env.local when running inside GitHub Codespaces:
 *   VITE_CODESPACE_NAME=your-codespace-name
 * Falls back to http://localhost:8000 when the variable is not defined.
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

/**
 * Normalise API responses that may be paginated objects or plain arrays.
 * @param {unknown} data
 * @returns {Array}
 */
export function toArray(data) {
  if (Array.isArray(data)) return data;
  // Django-style paginated: { results: [...] }
  if (data && Array.isArray(data.results)) return data.results;
  // Express wrapped: { value: [...] }
  if (data && Array.isArray(data.value)) return data.value;
  return [];
}
