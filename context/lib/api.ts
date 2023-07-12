function get(url: string, auth: boolean = false, headers: any = {}): Promise<any> {
    if (auth) {
      // Add JWT token to headers for authentication
      headers.Authorization = 'Bearer your_jwt_token_here';
    }
  
    const requestOptions: RequestInit = {
      method: 'GET',
      headers
    };
  
    return fetch(url, requestOptions)
      .then((response) => response.json());
  }
  
  function post(url: string, auth: boolean = false, headers: any = {}, body: any = {}): Promise<any> {
    if (auth) {
      // Add JWT token to headers for authentication
      headers.Authorization = 'Bearer your_jwt_token_here';
    }
  
    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    };
  
    return fetch(url, requestOptions)
      .then((response) => response.json());
  }
  
  function patch(url: string, auth: boolean = false, headers: any = {}, body: any = {}): Promise<any> {
    if (auth) {
      // Add JWT token to headers for authentication
      headers.Authorization = 'Bearer your_jwt_token_here';
    }
  
    const requestOptions: RequestInit = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    };
  
    return fetch(url, requestOptions)
      .then((response) => response.json());
  }
  
  function put(url: string, auth: boolean = false, headers: any = {}, body: any = {}): Promise<any> {
    if (auth) {
      // Add JWT token to headers for authentication
      headers.Authorization = 'Bearer your_jwt_token_here';
    }
  
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    };
  
    return fetch(url, requestOptions)
      .then((response) => response.json());
  }
  
  function del(url: string, auth: boolean = false, headers: any = {}): Promise<any> {
    if (auth) {
      // Add JWT token to headers for authentication
      headers.Authorization = 'Bearer your_jwt_token_here';
    }
  
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers
    };
  
    return fetch(url, requestOptions)
      .then((response) => response.json());
  }
  