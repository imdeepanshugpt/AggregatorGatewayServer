const Bluebird = require('bluebird');

function fromCallback(fn) {
  return new Bluebird(function(resolve, reject) {
    try {
      return fn(function(err, data, res) {
        if (err) {
          err.res = res;
          return reject(err);
        }
        return resolve([data, res]);
      });
    } catch (err) {
      return reject(err);
    }
  });
}
const consul = require('consul')({
  promisify: fromCallback,
  host: '172.17.0.2'
});


consul.acl.bootstrap(function(err, result) {
  console.log(err, result)
  // if (err) throw err;
});


consul.agent.members(function(err, result) {
  console.log('memebrs', err, result)
  if (err) throw err;
});



let known_search_instances = [];

const watcher = consul.watch({
  method: consul.health.service,
  options: {
    service: 'searchService',
    passing: true
  }
});


watcher.on('change', data => {
  known_search_instances = [];
  data.forEach(entry => {
    known_search_instances.push(`http://${entry.Service.Address}:${entry.Service.Port}/`);
  });

  console.log("Available search services ", known_search_instances);
});


let known_order_instances = [];

const orderWatcher = consul.watch({
  method: consul.health.service,
  options: {
    service: 'orderService',
    passing: true
  }
});

orderWatcher.on('change', data => {
  known_order_instances = [];
  data.forEach(entry => {
    known_order_instances.push(`http://${entry.Service.Address}:${entry.Service.Port}/`);
  });
  console.log("Available known_order_instances services ", known_order_instances);
});

module.exports = function knownServerUrls() {
  const servers = {
    orderServer: known_order_instances,
    restaurantServer: known_search_instances
  };
  return servers;
}
