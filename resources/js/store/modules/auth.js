export default {

    state: {
        token: localStorage.getItem('access_token') || null,
        user: null
    },

    getters: {
        auth: state => {
            return state.token !== null;
        },
        guest: (_, getters) => {
            return !getters.auth;
        },
        getAuthToken: state => {
            return state.token
        },
        getLoggedInUser: state => {
            return state.user;
        }
    },

    mutations: {
        retrieveToken: (state, token) => {
            state.token = token;
            window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },

        destroyToken: (state) => {
            state.token = null;
            state.user = null;
            axios.defaults.headers.common['Authentication'] = null;
        },

        setLoggedInUser: (state, user) => {
            state.user = user;
        }
    },

    actions: {
        retrieveToken: (_, credentials) => {
            return new Promise((resolve, reject) => {
                let {
                    username,
                    password
                } = credentials;
                axios.post('/api/login', {
                        username,
                        password
                    })
                    .then(response => {
                        const token = response.data.access_token;
                        localStorage.setItem('access_token', token);
                        resolve();
                    })
                    .catch((error) => {
                        reject(error.response.data);
                    });
            })
        },

        destroyToken: (context) => {
            return new Promise((resolve, reject) => {
                axios.post('/api/logout')
                    .then(_ => {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken');
                        resolve();
                    })
                    .catch(error => {
                        reject();
                    })

            });
        },

        singUp: (_, credentials) => {
            return new Promise((resolve, reject) => {
                axios.post('/api/register', credentials)
                    .then(response => {
                        const token = response.data.access_token;
                        localStorage.setItem('access_token', token);
                        resolve();
                    })
                    .catch((error) => {
                        reject(error.response.data);
                    });
            })
        },

        getLoggedInUser: (context) => {

            return new Promise((resolve, reject) => {
                // if (context.getters.getLoggedInUser) resolve(context.getters.getLoggedInUser);
                axios.get('/api/getLoggedUser')
                    .then(response => {
                        let user = response.data.user;
                        context.commit('setLoggedInUser', user);
                        resolve(user);
                    })
                    .catch((_) => {
                        localStorage.removeItem('access_token');
                        reject();
                    });
            })
        }

    }
};
