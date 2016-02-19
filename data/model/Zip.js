// Class used by GraphQL Server
export default class Zip {
    constructor(fields) {
        this.id = fields.id;
        this.city_id=fields.city_id;
        this.code = fields.code;

    }
}
