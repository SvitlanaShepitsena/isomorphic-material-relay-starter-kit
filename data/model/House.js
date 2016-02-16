// Class used by GraphQL Server
export default class House {
    constructor(fields) {
        this.id = fields.id;
        this.city_id = fields.city_d;
        this.zip_id = fields.zip_id;
        this.price = fields.price;

    }
}
