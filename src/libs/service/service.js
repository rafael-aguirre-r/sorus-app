import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "src/libs/service/utils/baseUrl";

class service {
  static instance = new service()

  makeRequest = ({ url, body, timeout = 2000 }) => {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject('Request timed out')
      }, timeout);

      fetch(`${baseUrl}${url}`, body).then(
        response => {
          if (response.ok) {
            resolve(response.json())
          }
          reject(`The server returned status code ${response.status}`)
        },
        err => reject(err)
      )
        .finally(() => clearTimeout(timer));
    })
  }

  addHeaders = async ({ body, ...args }) => {
    try {
      const token = await AsyncStorage.getItem('authToken')
      if (token !== null) {
        body.headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      } else {
        body.headers = {
          'Content-Type': 'application/json',
        }
      }
      return await this.makeRequest({ body, ...args })
    } catch (error) {
      return new Promise((_, reject) => reject(error))
    }
  }

  get = async (url, ...args) => {
    const body = {
      method: 'GET',
    }
    return await this.addHeaders({ url, body, ...args })
  }

  post = async (url, data, ...args) => {
    const body = {
      method: 'POST',
      body: JSON.stringify(data)
    }
    return await this.addHeaders({ url, body, ...args })
  }

  patch = async (url, data, ...args) => {
    const body = {
      method: 'PATCH',
      body: JSON.stringify(data)
    }
    return await this.addHeaders({ url, body, ...args })
  }
}

export default service.instance