const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const server = require('./webpack.server.js');
const client = require('./webpack.config.js');

const DEV_SERVER_PORT = 3002;

/**
 * Main
 */
(() => {
  // Set config keys to node process
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
  }

  // Set environment variables, propogate
  const env = process.env.NODE_ENV;
  switch (env) {
    case 'development':
      watchServer(server.dev);
      watchClient(client.dev);
      break;
    case 'stage':
      buildServer(server.prod);
      buildClient(client.prod);
      break;
    case 'production':
      buildServer(server.prod);
      buildClient(client.prod);
      break;
    default:
      throw new Error('You must select a build environment set as NODE_ENV');
  }
})();

/**
 * Watch server-side application via webpack
 * @param {object} server - Server webpack configuration
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
  }, (err) => {
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
          // eslint-disable-next-line
          console.log(`Server bundled & restarted ${new Date()}`);
        } else {
          // server bundling error has occurred
          initialLoad = true;
        }
      });

      // Destroy all open socket
      initServer.sockets.forEach((socket) => {
        socket.destroy();
      });
    } else {
      initServer = httpInit(bundlePath);

      if (initServer) {
        initialLoad = false;
        // eslint-disable-next-line
        console.log('Server bundled successfully');
      } else {
        // server bundling error has occurred
        initialLoad = true;
      }
    }
  });
}

/**
 * Watch client-side application via webpack
 * @param {object} server - Client webpack configuration
 */
function watchClient(client) {
  const compiler = webpack(client);
  const basePath = client.output.publicPath;
  const opts = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    inline: true,
    lazy: false,
    /*
    proxy: {
      '*': 'http://localhost:3001',
    },
    */
    // contentBase: 'http://localhost:3001',
    publicPath: 'http://localhost:3001',
    stats: {
      colors: true,
    },
  };
  // let config = require(bundlePath).config;
  const devServer = new WebpackDevServer(compiler, opts);
  devServer.listen(DEV_SERVER_PORT, 'localhost',
                   console.log(`Dev server started...`));
}

/**
 * Build server-side application via webpack
 * @param {object} server - Server webpack configuration
 */
function buildServer(server) {
  const compiler = webpack(server);

  // Server-side webpack handling
  compiler.run((err) => {
    if (err) {
      throw new Error('Server bundling error has occured');
    }
  });
}

/**
 * Build client-side application via webpack
 * @param {object} server - Client webpack configuration
 */
function buildClient(client) {
  const compiler = webpack(client);
  compiler.run((err) => {
    if (err) {
      throw new Error('Client bundling error has occured');
    }
    // console.log(stats);
  });
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
    // eslint-disable-next-line
    httpServer = require(bundlePath).httpServer;

    // Shutdown httpServer
    httpServer.on('connection', (socket) => {
      const socketId = nextSocket + 1;
      sockets.set(socketId, socket);
      socket.on('close', () => {
        sockets.delete(socketId);
      });
    });
  } catch (err) {
    throw new Error(err);
  }
  return { httpServer, sockets };
}

function clearImportCache(bundlePath) {
  const cacheIds = Object.keys(require.cache);
  cacheIds.some((id) => {
    if (id === bundlePath) {
      delete require.cache[id];
      return true;
    }
    return false;
  });
}
