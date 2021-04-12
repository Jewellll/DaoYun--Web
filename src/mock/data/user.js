import Mock from 'mockjs';
const LoginUsers = [
    {
        id: 1,
        username: 'admin',
        password: '123456',
        avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
        name: '张某某'
    }
];

const Users = [];
const Teacher =[];
const Dictionary =[];

//用户
for (let i = 0; i < 20; i++) {
    Users.push(Mock.mock({
        id: Mock.Random.guid(),
        userName: Mock.Random.cname(),
        userPhone:/^1[0-9]{11}$/,  //用正则匹配1开头的11位数字的手机号
        // addr: Mock.mock('@county(true)'),
        // 'age|18-60': 1,
        // birth: Mock.Random.date(),
        userSex: Mock.Random.integer(0, 1),
        'role|1':['管理员','教师']
    }));
}

//教师
for (let i = 0; i < 20; i++) {
    Teacher.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        'course|1':['工程训练','计算机基础','英语','数据库'],
        card:/^0[0-9]{6}$/  //用正则匹配1开头的11位数字的手机号
    }));
}

//字典
for (let i = 0; i < 20; i++) {
    Dictionary.push(Mock.mock({
        id: Mock.Random.guid(),
        dicId:/^0[0-9]{6}$/, //用正则匹配1开头的11位数字的手机号
        'dicName|1':['用户名','手机号','学号'],
        'dicCode|1':['CARD_TYPE','CARD_TYPE','STUDENT_TYPE'],
        'dicText|1':['用户类型','用户类型','学生类型']
    }));
}
export { LoginUsers, Users,Teacher,Dictionary };
