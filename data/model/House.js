// Class used by GraphQL Server
export default class House {
    constructor(fields) {
        this.id = fields.id;
        this.city_id = fields.city_id;
        this.zip_id = fields.zip_id;
        this.street = fields.street;
        this.price = fields.price;

    }
}
