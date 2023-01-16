const base = 'http://localhost:5000'
const urls = {
    base,
    login: base + '/api/user/login',
    logout: base + '/api/user/logout',
    register: base + '/api/user/requestverification',
    todo: base + '/api/todo',
}

export default urls