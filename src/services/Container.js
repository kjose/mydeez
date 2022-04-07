import PlaylistGenerator from './PlaylistGenerator';
import RedisClient from './RedisClient';

class Container {
  constructor() {
    this.services = {};
  }

  async initServices() {
    this.add('redis', await RedisClient.init());
    this.add('playlistGenerator', new PlaylistGenerator());
  }

  add(serviceName, serviceObject) {
    this.services[serviceName] = serviceObject;
  }

  get(serviceName) {
    return this.services[serviceName];
  }
}

export default new Container();
