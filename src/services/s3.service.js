import axios from 'axios';
import authHeader from './auth-header';

var Minio = require('minio')


class S3Service {
    getFiles(measurementUUID, agentUUID) {
        return axios.get(
            process.env.VUE_APP_BACKEND_URL + '/users/me/s3',
            { headers: authHeader() }
        ).then(response => {
            var credentials = response.data;
            var s3_endpoint = new URL(credentials.s3_host).hostname;
            var s3Client = new Minio.Client({
                endPoint: s3_endpoint,
                port: 443,
                useSSL: true,
                accessKey: "admin",
                secretKey: "XXXX"
            });

            // TODO: get files per format type (csv, ripe, ...)
            var objectsStream = s3Client.listObjectsV2(
                'public-exports', `results__${measurementUUID}__${agentUUID}`, false, ''
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
            process.env.VUE_APP_BACKEND_URL + '/users/me/s3',
            { headers: authHeader() }
        ).then(response => {
            var credentials = response.data;
            var s3_endpoint = new URL(credentials.s3_host).hostname;
            var s3Client = new Minio.Client({
                endPoint: s3_endpoint,
                port: 443,
                useSSL: true,
                accessKey: "admin",
                secretKey: "XXXX"
            });

            return s3Client.presignedGetObject(bucket, object, 60 * 60, {});
        });
    }
}

export default new S3Service();
