const Koa = require('koa')
const Router = require('koa-router')

let buildPath = `sh ${process.cwd()}/build-dev.sh`

const child_process = require('child_process');
class Serving {

    constructor() {
        this.app = new Koa()
        this.router = new Router();
        this.routers()
    }

    routers() {


        this.router.get('/api/build', async (ctx, next) => {
            console.log(buildPath)
            child_process.execFile(buildPath, [], { shell: '/bin/bash' }, (error, stdout, stderr) => {
            });
            ctx.body = {
                code:200,
                data:"",
                message:''
            }
        })
    }

    start() {
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
        if(process.env.EVENT == 'dev'){
            this.app.listen(7404, '0.0.0.0');
        }else{
            this.app.listen(7404, '172.16.100.38');
        }
        console.log(`服务启动成功 http://${ip.address()}:7404`)
    }

}

const serving = new Serving()
serving.start()