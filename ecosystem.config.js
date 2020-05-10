module.exports = {
  apps : [{
    name: "ecomm--main-server",
    script: '/dist/app/index.js',
  }],

  deploy : {
    development : {
      key : '/Users/ofirg/server-keys/ecomm-dev-new.pem',
      user : 'ubuntu',
      host : '35.208.32.48',
      ref  : 'origin/develop',
      repo : 'git@github.com:OfirTheOne/ecom-server.git',
      path : '~/server',
      'deploy-local': "mkdir -p logs && cp ~/.env . npm i && npm run build && pm2 reload ecosystem.json --env development",
      'pre-post-deploy' : "echo 'Deploying source to servers'",
      'pre-setup': ''
    }
  }
};
