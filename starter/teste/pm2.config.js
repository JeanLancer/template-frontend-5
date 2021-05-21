var STORE = 'teste';
var PORT = '3001';
var KEY = 'TESTE';

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
