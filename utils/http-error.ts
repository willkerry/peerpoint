/**
 * Supplementary error class with an HTTP status code local variable, used for succinct error handling in API code.
 */
class HTTPError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export default HTTPError;
