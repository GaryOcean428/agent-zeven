"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConfig = exports.dbConfig = void 0;
exports.dbConfig = {
    client: 'pg',
    connection: {
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        ssl: process.env.POSTGRES_SSL === 'true'
    }
};
exports.redisConfig = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0')
};
