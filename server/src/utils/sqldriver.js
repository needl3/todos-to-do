const connection = require('../config/database')
const { jwtSign } = require('../utils/jwt')
const bcrypt = require('bcrypt')

function registerQuery(username, password, email) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO user(username, password, email) values(?,?,?)',
            [username, password, email],
            e => {
                if (e) return reject(e)
                resolve(true)
            }
        )
        connection.commit()
    })
}

function checkAccountQuery(username, email) {
    // Resolves if account exists
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT username from user where username=? or email=?',
            [username, email],
            (e, r, f) => {
                if (e) return reject(e)
                if (r.length) {
                    const duplicateError = Error(
                        'Account with that creds exists'
                    )
                    duplicateError.name = 'Duplicate Entry'
                    reject(duplicateError)
                }
                resolve('Slot available')
            }
        )
    })
}

function loginQuery(email, password) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT username,password from user where email=?',
            [email],
            (e, r, f) => {
                if (e) return reject('invalid-credentials')

                if (!r.length) return reject('no-user')

                if (!bcrypt.compareSync(password, r[0].password))
                    return reject('invalid-credentials')

                const accessToken = jwtSign({ username: r[0].username })
                connection.query(
                    'UPDATE user set accessToken=? where username=?',
                    [accessToken, r[0].username],
                    e => {
                        if (e) return reject('error')
                        resolve({
                            username: r[0].username,
                            accessToken: accessToken,
                        })
                    }
                )
            }
        )
        connection.commit()
    })
}

function newTokenQuery(username) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT accessToken from user where username=?',
            [username],
            (err, result, f) => {
                if (result[0]?.accessToken) {
                    console.log('User was logged in. Generating new token.')
                    try {
                        const newAccessToken = jwtSign({
                            username: username,
                        })
                        connection.query(
                            'UPDATE user set accessToken=? where username=?',
                            [newAccessToken, username]
                        )
                        resolve(newAccessToken)
                    } catch (e) {
                        console.error('Error while saving new token', e)
                        resolve(null)
                    }
                } else {
                    console.log('User was logged out. Not generating new token')
                    resolve(null)
                }
            }
        )
    })
}
function logoutQuery(username) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE user set accessToken=NULL where username=?',
            [username],
            e => {
                if (e) return reject(e)
                resolve(true)
            }
        )
        connection.commit()
    })
}

function getTodoQuery(page, limit, username) {
    return new Promise((resolve, reject) => {
        // Could be vulnerable, didnt check
        connection.query(
            'SELECT * from todos where username=? LIMIT ? OFFSET ?',
            [username, limit, page * limit],
            (e, r, f) => {
                if (e) return reject(e)
                else resolve(r)
            }
        )
    })
}

function addTodoQuery(id, username, title, description, checked) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO todos(id, title, description, username, checked) values(?,?,?,?,?)',
            [id, title, description, username, checked],
            (e, r, f) => {
                if (e) return reject(e)
                resolve(true)
            }
        )
    })
}

function updateTodoQuery(id, username, title, description, checked) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE todos set title=?,description=?,checked=? where username=? and id=?',
            [title, description, checked || 0, username, String(id)],
            (e, r, f) => {
                if (e) return reject(e)
                resolve(true)
            }
        )
    })
}

function deleteTodoQuery(username, id) {
    console.log(id)
    return new Promise((resolve, reject) => {
        connection.query(
            'DELETE from todos where username=? and id=?',
            [username, id],
            (e, r, f) => {
                if (e) return reject(e)
                resolve(true)
            }
        )
    })
}

function userQuery(username) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT username, email from user where username=?',
            [username],
            (e, r, f) => {
                if (e) resolve({ username: 'void', email: 'void@void.void' })

                resolve(r[0])
            }
        )
    })
}

function getImageQuery(username) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT image, imageSHA from user where username=?',
            [username],
            (e, r, f) => {
                if (e) return reject(e)

                resolve(r[0])
            }
        )
    })
}

function uploadImageQuery(username, data, imageSHA) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE user set image=?, imageSHA=? where username=?',
            [data, imageSHA, username],
            (e, r, f) => {
                if (e) return reject(e)

                resolve(r[0])
            }
        )
    })
}
function getCreatedTodoQuery(user, date) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT title, createdAt, id, checked from todos where username=? and createdAt>=?',
            [user, date],
            (e, r, f) => {
                if (e) return reject(e)

                resolve(r)
            }
        )
    })
}
function getCompletedTodoQuery(user, date) {
    console.log(date)
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT title, modifiedAt as createdAt, id, checked from todos where username=? and checked=1 and modifiedAt>=?',
            [user, date],
            (e, r, f) => {
                if (e) return reject(e)

                console.log(r)
                resolve(r)
            }
        )
    })
}
function getTopUsersQuery(limit, page) {
    return new Promise((resolve, reject) => {
        //
        // There must be another way to compute completion ration in below query
        // This seems ineffecient
        //
        connection.query(
            'SELECT * from (select username, sum(checked=1) as completed, count(checked) as created, (sum(checked=1)/count(checked)) as completion_ratio from todos group by username limit ?, ?) as top join (select username, image from user) as user using (username) order by completion_ratio desc',
            [limit * page, limit],
            (e, r, f) => {
                if (e) return reject(e)

                resolve(r)
            }
        )
    })
}
module.exports = {
    loginQuery,
    logoutQuery,
    registerQuery,
    checkAccountQuery,
    getTodoQuery,
    addTodoQuery,
    updateTodoQuery,
    deleteTodoQuery,
    newTokenQuery,
    userQuery,
    getImageQuery,
    uploadImageQuery,
    getCreatedTodoQuery,
    getCompletedTodoQuery,
    getTopUsersQuery,
}
