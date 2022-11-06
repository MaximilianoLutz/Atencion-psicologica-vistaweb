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

  const url = `http://${ ip }:8080/oauth/token`;

  let encode = btoa('PacientesFront' + ':' + '1234$');
  console.log(encode);
  
  const params = `grant_type=password&username=${username}&password=${password}`
  const init = {
    method: 'POST',
    body: params, // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': 'basic ' + encode
    }
  }

  return fetch(url, init);

}

