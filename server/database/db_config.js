module.exports = (function () {
    return {
      local: { // localhost
        host: '13.209.66.192',
        port: '3030',
        user: 'maincomputer',
        password: 'my!computer@',
        database: 'maindb'
      },
      real: { // real server db info
        host: '',
        port: '',
        user: '',
        password: '!',
        database: ''
      },
      dev: { // dev server db info
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
      }
    }
  })();