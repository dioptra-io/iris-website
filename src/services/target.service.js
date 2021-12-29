import axios from 'axios';
import authHeader from './auth-header';


class TargetService {
    getTargets() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/targets/',
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch((error) => {
            if (error.response.status == 401) {
                localStorage.removeItem('user')
                document.location.href = '/#/login';
            }
            throw new Error("Invalid backend request")
        });
    }

    postTarget(targetContent) {
        var content = "";
        targetContent.forEach(target => {
            content += Object.values(target).join(",") + ",6" + "\n";
        });

        const blob = new Blob([content], { type: "text/plain" });
        const file = new File([blob], "website.csv")

        var formData = new FormData();
        formData.append("target_file", file)

        return axios
            .post(process.env.VUE_APP_BACKEND_URL + '/targets/',
                formData,
                {
                    headers: Object.assign(
                        authHeader(), { 'Content-Type': 'multipart/form-data' }
                    )
                }
            ).catch((error) => {
                if (error.response.status == 401) {
                    localStorage.removeItem('user')
                    document.location.href = '/#/login';
                }
                throw new Error("Invalid file content")
            });
    }

}

export default new TargetService();
