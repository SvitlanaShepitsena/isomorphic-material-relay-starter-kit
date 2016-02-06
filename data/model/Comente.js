// Class used by GraphQL Server
export default class Comente
{
  constructor( fields )
  {
    this.id = fields.id;
    this.Comente_Artigo_id = fields.Comente_Artigo_id;
    this.Comente_User_id = fields.Comente_User_id;
    this.Comente_Text = fields.Comente_Text;
  }
}
