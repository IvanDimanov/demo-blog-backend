module.exports = {
  apps: [{
    name: 'demo-blog-backend',
    script: './build/index.js',
    watch: false,
    instances: 0,
    exec_mode: 'cluster',
    interpreter: 'node',
    interpreter_args: '--require ./tsconfig-paths-bootstrap.js',
  }],
}
