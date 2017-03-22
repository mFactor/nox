const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const server = require('./webpack.server.js');
const client = require('./webpack.config.js');
const config = require('./config/proc.js');

process.env.NODE_ENV = 'development';

/**
 * Main
 * TODO: Set up for production
 */
(() => {
  // Set config keys to node process
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }
  const env = process.env.NODE_ENV;
  Object.keys(config[env]).forEach((param) => {
    process.env[param.toUpperCase()] = (config[env][param]);
  });
  process.env.NAMESPACE = config.namespace;
  switch (env) {
    case 'development':
      watchServer(server);
      watchClient(client);
      break;
    case 'stage':
      break;
    case 'production':
      break;
    default:
      throw new Error('You must select a build environment set as NODE_ENV');
  }
})();

/**
 * Astral server manager
 */
function watchServer(server) {
  let initServer;
  let initialLoad = true;
  const compiler = webpack(server);
  const bundlePath = `${server.output.path}/${server.output.filename}`;

  // Server-side webpack handling
  compiler.watch({
    aggregateTimeout: 300,
    poll: undefined,
  }, (err, stats) => {
    if (err) {
      throw new Error('Server bundling error has occured');
    }
    // clear bundle imports
    clearImportCache(bundlePath);
    if (!initialLoad) {
      initServer.httpServer.close(() => {
        initServer = httpInit(bundlePath);
        if (initServer) {
          initialLoad = false;
          // Replace w/ nodeLog
          console.log(`Server bundled & restarted ${new Date()}`);
        } else {
          // server bundling error has occurred
          initialLoad = true;
        }
      });

      // Destroy all open sockets
      for (const socket of initServer.sockets.values()) {
        socket.destroy();
      }
    } else {
      initServer = httpInit(bundlePath);

      if (initServer) {
        initialLoad = false;
        console.log('Server bundled successfully');
      } else {
        // server bundling error has occurred
        initialLoad = true;
      }
    }
  });
}

/**
 * Astral client manager
 */
function watchClient(client) {
  const compiler = webpack(client);
  const basePath = client.output.publicPath;
  const opts = {
    hot: true,
    inline: true,
    lazy: false,
    // contentBase: basePath,
    publicPath: basePath,
    stats: {
      colors: true,
    },
  };
  // let config = require(bundlePath).config;
  const devServer = new WebpackDevServer(compiler, opts);
  devServer.listen(process.env.DEVPORT, 'localhost',
                   console.log(`Dev server started...`));
}

/**
 * Express HTTP server manager
 */
function httpInit(bundlePath) {
  let httpServer;
  const sockets = new Map();
  const nextSocket = 0;
  try {
    // import http server
    httpServer = require(bundlePath).httpServer;

    // Shutdown httpServer
    httpServer.on('connection', (socket) => {
      const socketId = nextSocket + 1;
      sockets.set(socketId, socket);
      socket.on('close', () => {
        sockets.delete(socketId);
      });
    });
  } catch (e) {
    throw new Error(e);
  }
  return { httpServer, sockets };
}

function clearImportCache(bundlePath) {
  const cacheIds = Object.keys(require.cache);
  cacheIds.forEach((id) => {
    if (id === bundlePath) {
      delete require.cache[id];
      // return; <- might not be necessary, testing
    }
  });
}
