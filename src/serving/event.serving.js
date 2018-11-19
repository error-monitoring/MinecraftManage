/**
 * auth 文全
 * 监测语言包发生变更
 */
import { Subject } from 'rxjs'

class LangServing{




    subscribeLang(){
        return this.subject = new Subject()
    }

    changeLang(lang){
        // console.log(this.subject)
        this.subject.next(lang);
    }
}

export default new LangServing()