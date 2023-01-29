/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        extend: {
            colors: {
                background: '#222',
                color: '#aaa',

                notloggedin: '#dd5555',
                loggedin: '#0aa',

                todoborder: '#314b43',
                popupbg: '#0005',

                incompletetodoborder: '#000',
                completedtodoborder: '#093',
                inprogresstodoborder: '#773',

                popuppositive: '#0b5444',
                popupnegative: '#f315',
            },
            keyframes: {
                appear: {
                    '0%': { width: '0%', height: '0%', opacity: '0' },
                    '100%': { width: '100%', height: '100%', opacity: '1' },
                },
            },
            animation: {
                todoanimation: 'appear 0.6 linear',
            },
        },
    },
    plugins: [],
}
