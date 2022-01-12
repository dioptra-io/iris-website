import axios from 'axios';

var Minio = require('minio')


class S3Service {
    getFiles(measurementUUID, agentUUID) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/services',
        ).then(response => {
            var credentials = response.data;
            var s3_endpoint = new URL(credentials.s3_host).hostname;
            var s3Client = new Minio.Client({
                endPoint: s3_endpoint,
                port: 443,
                useSSL: true,
                accessKey: credentials.s3_access_key_id,
                secretKey: credentials.s3_secret_access_key,
                sessionToken: credentials.s3_session_token,
            });

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
            { withCredentials: true }
        ).then(response => {
            var credentials = response.data;
            var s3_endpoint = new URL(credentials.s3_host).hostname;
            var s3Client = new Minio.Client({
                endPoint: s3_endpoint,
                port: 443,
                useSSL: true,
                accessKey: credentials.s3_access_key_id,
                secretKey: credentials.s3_secret_access_key,
                sessionToken: credentials.s3_session_token,
            });

            return s3Client.presignedGetObject(bucket, object, 60 * 60, {});
        });
    }
}

export default new S3Service();
