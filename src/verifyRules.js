

export default {
    username: {
        test: /^[a-zA-Z0-9_]{4,16}/,
        message: "用户名为4到16位(字母，数字，下划线)"
    },
    password: {
        test: /^[A-Za-z0-9]{6,16}$/,
        message: "密码为字母开头，6-16位之间"
    },
    phone: {
        test: /^1[34578]\d{9}$/,
        message: "电话号码格式不正确"
    },
    email: {
        test: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
        message: "邮箱格式不正确"
    }
}