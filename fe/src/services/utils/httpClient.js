import delay from "../../utils/delay";
import APIError from "../../errors/APIError";

class httpClient {
  constructor(baseURl) {
    this.baseURL = baseURl;
  }

  get(path, options) {
    return this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers
    });
  }


  async post(path, body) {
    await delay(500);
    const headers = new Headers({
      'Content-Type' : 'application/json'
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type')

    if(contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if(response.ok ) {
      return responseBody;
    }
    throw new APIError(response, responseBody)
  }

  put(path, options) {
    return this.makeRequest(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers
    });
  }

  delete(path, options) {
    return this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers
    });
  }




  async makeRequest(path, options) {
    await delay(500);
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json')
    }

    if(options.headers) {
        Object.entries(options.headers).forEach(([name, value]) => {
          headers.append(name, value)
        })
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get('Content-Type')
    let responseBody = null;

    if(contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if(response.ok ) {
      return responseBody;
    }

    throw new APIError(response, responseBody)
  }

}

export default httpClient;
