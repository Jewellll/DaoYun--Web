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

for (let i = 0; i < 20; i++) {
    Users.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
    }));
}

for (let i = 0; i < 20; i++) {
    Teacher.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        'course|1':['工程训练','计算机基础','英语','数据库'],
        card:/^0[0-9]{6}$/  //用正则匹配1开头的11位数字的手机号
    }));
}

export { LoginUsers, Users,Teacher };
