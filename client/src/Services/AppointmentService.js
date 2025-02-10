const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5056";

class AppointmentService {
  constructor(baseUrl, prefix = "/appointment") {
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

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      if (response.ok) {
        return data;
      }
      throw new Error(data.message || `Http error! Status:${response.status}`);
    } catch (error) {
      console.error("API request failed:", error.message || error);
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

  delete(endpoint, headers = {}) {
    return this.request(endpoint, "DELETE", null, headers);
  }
}

export default new AppointmentService(BASE_URL);
