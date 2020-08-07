import {createAxiosInstance} from "./axios-connection";

export const ProjectsAPI = {
    async getUserResults() {
        const instance = await createAxiosInstance(true);

        return instance.get(`users/my_results/`)
            .then(response => {
                return response.data;
            }).catch((e) => {
                return e
            })
    },
}

