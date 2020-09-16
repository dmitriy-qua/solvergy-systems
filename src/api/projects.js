import {createAxiosInstance, getBaseUrl, getToken} from "./axios-connection";

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

    async getMapImageUrl({id, mapImageUri, mapDistance, mapImageShouldBeAnalyzed, mapImageForAnalysisUri}) {
        const baseUrl = getBaseUrl()
        let apiUrl = baseUrl + 'systems/map_image_url/'

        let uriParts = mapImageUri.path.split('.');
        let fileType = uriParts[uriParts.length - 1]

        let formData = new FormData();

        formData.append('id', id)
        formData.append('distance', mapDistance)
        formData.append('mapImageShouldBeAnalyzed', mapImageShouldBeAnalyzed)
        formData.append('photoOfMap', mapImageUri, 'photoOfMap.' + fileType)
        if (mapImageShouldBeAnalyzed) {
            formData.append('photoOfMapForAnalysis', mapImageForAnalysisUri, 'photoOfMapForAnalysis.' + fileType)
        }

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': await getToken(),
            },
        }

        return await fetch(apiUrl, options).then(res => {
            return res.json()
        }).catch(e => {
            console.log(e)
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

