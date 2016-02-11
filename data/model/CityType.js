// Class used by GraphQL Server
export default class CityType {
    constructor(fields) {
        this.id = fields.id;
        this.city = fields.city;
        this.type = fields.type;
        this.number = fields.number;

    }
}
