import CacheAdapter from './CacheAdapter';
import { ResultCallback } from './CacheAdapter';

export default class RedisAdapter extends CacheAdapter {
    constructor(public redisClient: any, public expire: number) {
        super(expire);
    }

    /**
     * Implements the CacheAdapter's abstract get method
     * @param {string} key - the value of the key to look up
     * @param {function} callback - the result callback
     */
    get(key: string, callback: ResultCallback) {
        this.redisClient.get(key, callback);
    }
    /**
     * Implements the CacheAdapter's abstract set method
     * @param {string} key - the value of the key to be used for this particular value
     * @param {string} value - the value to be stored in the cache
     * @param {function} callback - the result callback
     */
    set(key: string, value: string, callback: ResultCallback) {
        this.redisClient.set(key, value, 'EX', this.expire, callback);
    }

    /**
     * Implements the CacheAdapter's abstract touch method
     * @param {string} key - the value of the key of which the TTL will be reset
     * @param {function} callback - the result callback
     */
    touch(key: string, callback: ResultCallback) {
        this.redisClient.expire(key, this.expire, callback);
    };
}