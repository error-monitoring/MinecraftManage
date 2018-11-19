import storageServing from './storage.serving'
import eventServing from './event.serving'

class LangServing {

    setLang(lang){
        storageServing.set(lang, 'lang', window.localStorage)
        eventServing.changeLang(lang)
    }

    getLang(){
        const lang = storageServing.get('lang', window.localStorage)
        return lang || process.env.NODE_LANG
    }
  
  }
  
  export default new LangServing()