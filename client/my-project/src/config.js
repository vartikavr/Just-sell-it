const configs = {
    development: {
      SERVER_URI: 'localhost:5000',
    },
    production: {
      SERVER_URI: 'https://afternoon-springs-92534.herokuapp.com',
    },
  };
  
  module.exports.config = configs[process.env.NODE_ENV];