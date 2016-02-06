// Class used by GraphQL Server
export default class Artigo
{
  constructor( fields )
  {
    this.id = fields.id;
    this.Artigo_User_id = fields.Artigo_User_id;
    this.Artigo_Title = fields.Artigo_Title;
    this.Artigo_Keywords = fields.Artigo_Keywords;
    this.Artigo_Body = fields.Artigo_Body;
  }
}
