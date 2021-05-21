var STORE = 'development';
var PORT = '3002';
var KEY = 'TESTE2';

module.exports = {
  apps : [
      {
        name: `app-${STORE}`,
        script: "yarn",
        args: `deploy`,
        env: {
          BUILD_DIR: `./builds/${STORE}/.next`,
          PORT,
          KEY,
        }
      }
  ]
}
