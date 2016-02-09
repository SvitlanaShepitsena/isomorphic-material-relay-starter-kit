// Class used by GraphQL Server
export default class House
{
  constructor( fields )
  {
    this.id = fields.id;
    this.mls = fields.mls;
    this.beds = fields.beds
    this.city = fields.city
    this.description = fields.description
    this.image = fields.image
    this.price = fields.price
    this.state = fields.state
    this.street = fields.street
    this.type = fields.type
    this.zip = fields.zip

  }
}
