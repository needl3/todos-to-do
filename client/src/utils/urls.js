const base = 'http://localhost:5000'
const urls = {
    base,
    login: base + '/api/user/login',
    logout: base + '/api/user/logout',
    register: base + '/api/user/requestverification',
    todo: base + '/api/todo',
    del: base + '/api/delete',
    image: base + '/api/user/image',
    createdStats: base + '/api/todo/getCreatedStat',
    completedStats: base + '/api/todo/getCompletedStat',
}

export default urls
