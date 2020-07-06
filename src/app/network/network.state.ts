import Network from './network.model';

export default class NetworkState {
  networks: Network[];
  cursor: string;
  error: Error;
}

export const initializeState = (): NetworkState => {
  return {
    networks: null,
    cursor: null,
    error: null
  };
};
