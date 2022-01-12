import axios from 'axios';


class TargetService {
    getTargets() {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/targets/',
        );
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

        return axios.post(process.env.VUE_APP_BACKEND_URL + '/targets/',
            formData,
            {
                headers: Object.assign(
                    { 'Content-Type': 'multipart/form-data' },
                ),
                withCredentials: true,
            },
        );
    }

}

export default new TargetService();
