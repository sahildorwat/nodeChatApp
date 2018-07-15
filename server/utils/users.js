class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        console.log('in add user', id , name, room)
        const user = {id, name, room};
        this.users.push(user);
        console.log('user list is ', this.users)
        return user;
    }

    removeUser (id) {
        let usr = null
        const users = this.users.filter((user) =>{  
                    if( user.id === id){
                         usr = user
                    }
                    return  user.id !== id});
        this.users = users;
        return usr;
    }

    getUser (id) {
        return this.users.users.filter( user => user.id === id)[0]
    }

    getUserList (room) {
        console.log('in get user list room is', room)
        let userArray = []
        this.users.forEach( (user) => {
           if (user.room === room){
              userArray.push(user.name)
           }
        })
        // console.log(userArray)
        return userArray;
    }
}

module.exports = {Users};