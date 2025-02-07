const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5056";
  
class AppointmentService {
    constructor(baseUrl,prefix='/appointment') {
      this.baseUrl = baseUrl;
      this.prefix=prefix;
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
  
      try 
      {
        const response = await fetch(fullurl, options);

        if (!response.ok) 
        {
            const  errorText=await response.json();
            throw new Error(errorText.message||'An error occurred');
        }
        const data= await response.json();
        return data;

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
  