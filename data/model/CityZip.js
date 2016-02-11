// Class used by GraphQL Server
export default class CityZip {
    constructor(fields) {
        this.id = fields.id;
        this.city = fields.city;
        this.zip = fields.zip;
        this.number = fields.number;

    }
}
