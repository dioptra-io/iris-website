import axios from 'axios';

var Minio = require('minio')


class S3Service {
    getClient(credentials) {
        const s3_endpoint = new URL(credentials.s3.endpoint_url).hostname;
        return new Minio.Client({
            endPoint: s3_endpoint,
            port: 443,
            useSSL: true,
            accessKey: credentials.s3.aws_access_key_id,
            secretKey: credentials.s3.aws_secret_access_key,
            sessionToken: credentials.s3.aws_session_token,
        });
    }

    getFiles(measurementUUID, agentUUID) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
        ).then(response => {
            const s3Client = this.getClient(response.data);
            var objectsStream = s3Client.listObjectsV2(
                'public-exports', `${measurementUUID}__${agentUUID}`, false, ''
            );
            let ret = []
            return new Promise(function (resolve, reject) {
                objectsStream.on('data', function (obj) {
                    ret.push(obj)
                })
                objectsStream.on('end', function () {
                    resolve(ret)
                })
                objectsStream.on('error', function (e) {
                    reject(e)
                })
            });
        });
    }

    getFileURL(bucket, object) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
        ).then(response => {
            const s3Client = this.getClient(response.data);
            return s3Client.presignedGetObject(bucket, object, 60 * 60, {});
        });
    }

    getFileStat(bucket, object) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
        ).then(response => {
            const s3Client = this.getClient(response.data);
            return s3Client.statObject(bucket, object);
        });
    }
}

export default new S3Service();
