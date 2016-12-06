/**
 * @name Mock Data
 * @author winson 654874992@qq.com
 */
// use Mock
let Mock = require('mockjs')

// config api
const constantsAPI = 'http://g.cn'
export const CFUser_URL = {
  userList: constantsAPI + '/mcm/api/user', //userlist
  userInfo: constantsAPI + '/mcm/api/user', //userinfo
}

//Mock Data
const userlist_mkdata = {
  code:200,
  body:[
    {
      "createdAt": "2016-09-18T09:10:30.025Z",
      "updatedAt": "2016-09-18T09:10:43.653Z",
      "id": "57de5a06f1afc8560c1547b6",
      "realm": "null",
      "username": "123",
      "mobile": "123",
      "email": "123@123.com123",
      "emailVerified": "false",
    },
    {
      "createdAt": "2016-09-18T09:10:53.264Z",
      "updatedAt": "2016-09-18T09:11:13.137Z",
      "id": "57de5a1d4a83a9be5ce518c7",
      "realm": "null",
      "username": "222",
      "mobile": "223",
      "email": "222@123.com",
      "emailVerified": "true",
    }
  ],
}
Mock.mock(CFUser_URL.userList,userlist_mkdata)

