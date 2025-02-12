const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5056";

class UserService {
  constructor(baseUrl, prefix = "/user") {
    this.baseUrl = baseUrl;
    this.prefix = prefix;
  }

  async request(endpoint, method = "GET", body = null, headers = {}) {
    const fullurl = `${this.baseUrl}${this.prefix}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const options = {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : null,
    };

    try {
      const response = await fetch(fullurl, options);
      console.log("Response status:", response.status);
      if (response.status === 204) return null;
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (response.ok) {
        return data;
      }
      throw new Error(data?.message || `Http error! Status:${response.status}`);
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, "GET", null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, "POST", body, headers);
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, "PUT", body, headers);
  }
}
const userservice = new UserService(BASE_URL);
export default userservice;
