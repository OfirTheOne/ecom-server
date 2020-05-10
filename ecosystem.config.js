module.exports = {
  apps : [{
    name: "ecomm--main-server",
    script: '/dist/app/index.js',
  }],

  deploy : {
    development : {
      key : '~/server-keys/ecomm-dev-new.pem',
      user : 'sa_103659762652968566694',
      host : '35.208.32.48',
      ref  : 'origin/develop',
      repo : 'git@github.com:OfirTheOne/ecom-server.git',
      path : '/home/sa_103659762652968566694/server',
      'post-deploy': "cp ~/.env . && npm i && npm run build && pm2 reload ecosystem.json --env development",
      // 'post-deploy': "mkdir -p logs && cp ~/.env . npm i && npm run build && pm2 reload ecosystem.json --env development",
      'pre-deploy-local' : "echo 'Deploying source to servers'",
    }
  }
};
