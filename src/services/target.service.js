import axios from 'axios';
import authHeader from './auth-header';


class TargetService {
    getTargets() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/targets/',
            { headers: authHeader() }
        ).then(response => {
            return response;
        }).catch(function () {
            localStorage.removeItem('user')
            document.location.href = '/';
        });
    }

    postTarget(targetContent) {
        var content = "";
        targetContent.forEach(target => {
            content += Object.values(target).join(",") + "\n";
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
            ).then(function () {
                return true;

            }).catch(function (error) {
                if (error.response.status == 401) {
                    localStorage.removeItem('user')
                    document.location.href = '/';
                }
                return false;
            });
    }

}

export default new TargetService();
