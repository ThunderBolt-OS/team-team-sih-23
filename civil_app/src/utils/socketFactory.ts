import {
  SERVER_HOST,
  SERVER_PORT,
  WEB_SOCKET_ACCESS_TOKEN,
} from "../config/constants";

export function createSocket(endpoint: string) {
  document.cookie = `accessToken=${WEB_SOCKET_ACCESS_TOKEN}`;
  const base_url = `ws://${SERVER_HOST}:${SERVER_PORT}`;
  const url = `${base_url}${endpoint}`;
  const socket = new WebSocket(url);

  return socket;
}
