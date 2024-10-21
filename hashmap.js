function HashMap (initialCapacity = 8) {

    let buckets = new Array(initialCapacity).fill(null).map(() => []);
    let size = 0;
    const loadFactor = 0.75;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
        }
        return hashCode;
    }

    function set(key, value) {
        const index = hash(key);
        const bucket = buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey] = bucket[i];
            if (storedKey === key) {
                bucket[i][1] = value;
                return 'successful';
            }
        }
        bucket.push([key, value]);
        size++;

        if (size / buckets.length > loadFactor) {
            grow();
        }
        return 'error';
    }

    function get (key) {
        const index = hash(key);
        const bucket = buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            const [storedKey] = bucket[i];
            if (storedKey === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    function has(key) {
        const index = hash(key);
        const bucket = buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            const [storedKey] = bucket[i];
            if (storedKey === key) {
                return true;
            }
        }
        return false;
    }

    function remove(key) {
        const index = hash(key);
        const bucket = buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            const [storedKey] = bucket[i];
            if (storedKey === key) {
                bucket.splice(i, 1);
                size--;
                return true;
            }
        }
        return false;
    }

    function length() {
        return size;
    }

    function clear() {
        buckets = new Array(initialCapacity).fill(null).map(() => []);
        size = 0;
        return 'successful';
    }

    function keys() {
        return buckets.flatMap(bucket => bucket.map(([key]) => key));
    }

    function values() {
        return buckets.flatMap(bucket => bucket.map(([_, value]) => value));
    }

    function entries() {
        return buckets.flatMap(bucket => bucket.map(([key, value]) => [key, value]))
    }

    function grow() {
        const newCapacity = buckets.length * 2;
        const newBuckets = new Array(newCapacity).fill(null).map(() => []);
            for (const bucket of buckets) {
            for (const [key, value] of bucket) {
                const index = hashWithNewCapacity(key, newCapacity);
                newBuckets[index].push([key, value]);
            }
        }
    
        buckets = newBuckets; 
    }
    
    function hashWithNewCapacity(key, capacity) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }
        return hashCode;
    }

    return {set, get, has, remove, length, clear, keys, values, entries};
}


export { HashMap};