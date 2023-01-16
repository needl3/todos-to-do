const connection = require('../config/database')
const { jwtSign } = require('../utils/jwt')

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
            'SELECT username from user where email=? and password=?',
            [email, password],
            (e, r, f) => {
                if (e) return reject('invalid-credentials')

                if (!r.length) return reject('no-user')

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
}
