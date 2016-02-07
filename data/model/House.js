// Class used by GraphQL Server
export default class House
{
  constructor( fields )
  {
    this.id = fields.id;
    this.street = fields.street
    this.price = fields.price

  }
}
