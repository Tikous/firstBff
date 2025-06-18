module.exports = {
  apps: [{
    name: 'firstBff',
    script: './app.ts',
    interpreter: 'ts-node',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      TS_NODE_TRANSPILE_ONLY: 'true'
    },
    env_production: {
      NODE_ENV: 'production',
      TS_NODE_TRANSPILE_ONLY: 'true'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
} 