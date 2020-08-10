import {createAxiosInstance} from "./axios-connection";

export const ProjectsAPI = {
    async getUserBuildingsResults() {
        const instance = await createAxiosInstance(true);

        return instance.get(`users/my_results/`)
            .then(response => {
                return response.data;
            }).catch((e) => {
                return e
            })
    },

    async calculateProject(project) {
        const instance = await createAxiosInstance(true);

        return instance.post(`systems/calculate/`, project)
            .then(response => {
                return response.data;
            }).catch((e) => {
                return e
            })
    },

    async saveProject(project) {
        const instance = await createAxiosInstance(true);

        return instance.put(`systems/${project.id}`, project)
            .then(response => {
                return response.data;
            }).catch((e) => {
                return e
            })
    },

    async openProject(id) {
        const instance = await createAxiosInstance(true);

        return instance.get(`systems/${id}`)
            .then(response => {
                return response.data;
            }).catch((e) => {
                return e
            })
    },
}

