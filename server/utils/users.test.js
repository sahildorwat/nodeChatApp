const expect = require('expect')
const Users = require('./users')

describe('users class', ()=> {

    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{ id: '1', name: 'sahil', room: 'A' },
                       { id: '2', name: 'akshay', room: 'B' },
                       { id: '3', name: 'aniket', room: 'A' }    ]
    })


    it('should add user to list of users', ()=> {
        const user = users.addUser('123', 'sahil','A')
        expect(users.users).toInclude({id:'123', name: 'sahil', room: 'A'})
    })

    it('should  get user list', () => {
        const userList = users.getUserList('A')
        expect(userList.length).toBe(2)
    })

    it('should remove user', () => {
        const user = users.removeUser('1')
        expect(user).toInclude({ id: '1', name: 'sahil', room: 'A' })
        expect(users.users[0]).toInclude({ id: '2', name: 'akshay', room: 'B' })
    })
})