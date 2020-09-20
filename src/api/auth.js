import {createAxiosInstance} from "./axios-connection";

export const AuthAPI = {
    async signIn(login, password) {
        const instance = await createAxiosInstance();

        return instance.post(`auth/signin/`, JSON.stringify({ login, password }))
            .then(async response => {
                await localStorage.setItem('user', JSON.stringify(response.data));
                return response.data.data.user;
            })
    },
    async logout() {
        await localStorage.removeItem('user');
    },
    async signUp(login, password) {
        const instance = await createAxiosInstance();

        return instance.post(`auth/signup/`, JSON.stringify({login, password}))
            .then(async response => {
                await localStorage.setItem('user', JSON.stringify(response.data));

                return response.data.data.user;
            })

    },
    async signInGoogle(login) {
        const instance = await createAxiosInstance();

        return instance.post(`auth/signingoogle/`, JSON.stringify({login}))
            .then(async response => {
                await localStorage.setItem('user', JSON.stringify(response.data));

                return response.data.user;
            })

    },
    async signInApple(login) {
        const instance = await createAxiosInstance();

        return instance.post(`auth/signingoogle/`, JSON.stringify({login}))
            .then(async response => {
                await localStorage.setItem('user', JSON.stringify(response.data));

                return response.data.user;
            })

    },

    async getUserProjects() {
        const instance = await createAxiosInstance(true);

        return instance.get(`users/my_systems/`)
            .then(response => {
                return response.data;
            }).catch((e) => {
                return e
            })

    },
}

