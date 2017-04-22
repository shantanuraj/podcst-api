module.exports = {
  apps : [
    {
      name: "Podcst API",
      script: __dirname + "/build/index.js",
      env: {
        NODE_ENV: "development"
      },
      env_production : {
        NODE_ENV: "production"
      },
      watch: [ "build" ],
      instances: 1
    }
  ],
}
