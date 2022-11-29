import { ip } from "../ip";

export const updatePaciente = async (url, data) => {

  const init = {
    method: 'PUT',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }

  }
  const resp = await fetch(url, init);
  const datos = await resp.json();
  const stats = await resp.status;

  return [datos, stats];

}

export const crearPaciente = async (url, data) => {

  const init = {
    method: 'POST',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }

  }
  const resp = await fetch(url, init);
  const datos = await resp.json();
  const stats = await resp.status;

  return [datos, stats];

}

export const fetchToken = (username, password) => {

  const url = `http://${ip}:8080/oauth/token`;

  let encode = btoa('PacientesFront' + ':' + '1234$');
  console.log(encode);

  const params = `grant_type=password&username=${username}&password=${password}`
  const init = {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': 'basic ' + encode
    }
  }

  return fetch(url, init);

}

export const validarToken = async () => {
  const token = localStorage.getItem('access_token');

  const url = `http://${ip}:8080/api/check_token`;

  try {
    const respuesta = await fetch(url, { headers: { 'authorization': 'Bearer ' + token } });
    const { ok } = await respuesta;

    return ok;

  } catch (error) {
    return false;
  }


}

export const fetchConTokenMethod = async (url, data, method = 'GET') => {
  const token = localStorage.getItem('access_token');
  

  if (method === 'GET') {
    try {

      const respuesta = await fetch(url, {
        method: method,
        headers: {
          'authorization': 'Bearer ' + token
        }
      });

      return respuesta.json();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  try {

    const respuesta = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    return respuesta.json();
  } catch (error) {
    console.log(error);
    return [];
  }

}

