/* eslint-disable */

// 表情正则
const emojiReg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/i;
// 手机正则
const phoneReg = /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[6]|17[0-9]|18[0-9]|19[8-9])\d{8}$/;
// 邮箱正则
const emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
// 身份证正则
const cardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 长度正则
const lengthReg = length => new RegExp(`^(\\d{${length}})$`);
// 网址正则
const urlReg  = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/

const passwordReg = /^[A-Za-z0-9]+$/



// 检查长度 字符串类型
const checkLengthString = (value, min = 1, max = 30) => value.length > max || value.length < min

const checkEmoji = value => emojiReg.test(value)

const checkPhone = value => !phoneReg.test(value)

const checkEmail = value => !emailReg.test(value)

const checkCard = value => !cardReg.test(value)

const checkLengthNumber = (value, length) => !lengthReg(length).test(value)

const checkUrl = value => !urlReg.test(value)

const checkPassword = value => !passwordReg.test(value)

/**
 * 
 * @param {*} min 最小长度
 * @param {*} max 最大长度
 * @param {*} 
 */
const checkNameFun = (rule, value, callback, ) => {
    const min = rule.min || 1;
    const max = rule.max || 30;
    console.log(value, 'value')
    if (value.trim() == "") {
        callback(new Error(`请输入有效的${rule.name}`));
    } else if (checkEmoji(value.trim())) {
        callback(new Error(`${rule.name}不能输入表情符号`));
    } else if (checkLengthString(value.trim(), min, max)) {
        callback(new Error(`${rule.name}不能超过${max}个字符`));
    } else {
        callback()
    }
}
// 检查邮箱
const checkEmailFun = (rule, value, callback, ) => {
    if (value.trim() === "") {
        callback(new Error(`请输入有效的${rule.name || '电子邮箱'}`));
    } else if (checkEmail(value.trim())) {
        callback(new Error(`请输入有效的${rule.name || '电子邮箱'}`));
    } else {
        callback()
    }
}

// 检查数字和长度默认18位
const checkLengthNumberFun = (rule, value, callback, ) => {
    const length = 18;
    if (value.trim() === "") {
        callback(new Error(`请输入有效的${rule.name}`));
    } else if (checkLengthNumber(value.trim(), length)) {
        callback(new Error(`请输入有效的${rule.name}`));
    } else {
        callback()
    }
}

// 必填
const checkRequiredFun = (rule, value, callback, ) => {
    if (value.trim() === "") {
        callback(new Error(`${rule.name}`));
    } else {
        callback()
    }
}

// 检查手机号
const checkPhoneFun = (rule, value, callback, ) => {
    if (value.trim() === "") {
        callback(new Error(`请输入有效的${rule.name}`));
    } else if (checkPhone(value.trim())) {
        callback(new Error(`请输入有效的${rule.name}`));
    } else {
        callback()
    }
}

// 检查身份证
const checkCardFun = (rule, value, callback, ) => {
    if (value.trim() === "") {
        callback(new Error(`请输入有效的${rule.name}`));
    } else if (checkCard(value.trim())) {
        callback(new Error(`请输入有效的${rule.name}`));
    } else {
        callback()
    }
}

// 检查密码

const checkPasswordFun = (rule, value, callback) => {
    const min = rule.min || 6;
    const max = rule.min || 20;
    if (value.trim() == "") {
        callback(new Error("请输入密码"));
    } else if (checkLengthString(value, min, max)) {
        callback(new Error(`密码${min}—${max}位数字和英文，英文区分大小写`));
    } else if(checkPassword(value)) {
        callback(new Error(`密码${min}—${max}位数字和英文，英文区分大小写`));
    }else{
        callback();
    }
}

// 检查重复密码
const checkPwdFun = (rule, value, callback) => {
    const password = rule.self.$data[rule.dataName][rule.oldPasswordName]
    if (value.trim() === "") {
        callback(new Error("请重复新密码"));
    } else if (value !== password) {
        callback(new Error("两次密码输入不一样"));
    } else {
        callback();
    }
}

// 检查url是否合法
const checkUrlFun = (rule, value = '', callback, ) => {
    const length = rule.required == true ? 0 : 1
    if(value.trim().length >= length) {

        if(checkUrl(value.trim())){
            callback(new Error(`请输入有效的${rule.name}`));
        }else{
            // 允许为空
            callback()
        }
    } else {
        callback()
    }
}


export {
    checkEmailFun,
    checkNameFun,
    checkLengthNumberFun,
    checkRequiredFun,
    checkPhoneFun,
    checkCardFun,
    checkPasswordFun,
    checkPwdFun,
    checkUrlFun
}