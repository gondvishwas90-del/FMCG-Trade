export function serializeDocument<T = any>(doc: any): T {
    if (!doc) return doc;

    if (Array.isArray(doc)) {
        return doc.map((item) => serializeDocument(item)) as unknown as T;
    }

    if (doc instanceof Date) {
        return doc.toISOString() as unknown as T;
    }

    if (typeof doc === 'object') {
        let plainDoc = doc;
        if (typeof doc.toJSON === 'function') {
            plainDoc = doc.toJSON();
        } else if (typeof doc.toObject === 'function') {
            plainDoc = doc.toObject();
        }

        const serialized: any = {};
        for (const key in plainDoc) {
            if (Object.prototype.hasOwnProperty.call(plainDoc, key)) {
                const val = plainDoc[key];
                if (val && typeof val.toString === 'function' && val.constructor?.name === 'ObjectId') {
                    serialized[key] = val.toString();
                } else if (val instanceof Date) {
                    serialized[key] = val.toISOString();
                } else if (Array.isArray(val)) {
                    serialized[key] = serializeDocument(val);
                } else if (val !== null && typeof val === 'object') {
                    serialized[key] = serializeDocument(val);
                } else {
                    serialized[key] = val;
                }
            }
        }
        return serialized;
    }

    return doc as unknown as T;
}

export function serializeList<T = any>(list: any[]): T[] {
    return list.map((item) => serializeDocument<T>(item));
}
