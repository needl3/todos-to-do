const modes = {
    LOGIN: 'login',
    REGISTER: 'register',
    DORMANT: 'dormant',
    LOGOUT: 'logout',
}

const status = {
    REGISTERED: 'registered',
    NOT_REGISTERED: 'not-registered',
    NO_ATTEMPT: '',
    REGISTERING: 'Registering',
    REGISTER_FAILED: 'Username/Email already used',
}

export { modes, status }
