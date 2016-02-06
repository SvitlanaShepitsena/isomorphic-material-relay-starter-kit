import { Uuid } from '../da_cassandra/_client.js';

import Artigo from '../model/Artigo'


// Mock data

var Artigo_listById = { };
var Artigo_id_by_User_id = { };


// Data access functions

export function DA_Artigo_add( fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Artigo = new Artigo( fields );

    a_Artigo.id = Uuid.random( );

    Artigo_listById[ a_Artigo.id ] = a_Artigo;

    let a_Artigo_id_by_User_id = Artigo_id_by_User_id[ a_Artigo.Artigo_User_id ];
    if( a_Artigo_id_by_User_id == null )
      a_Artigo_id_by_User_id = Artigo_id_by_User_id[ a_Artigo.Artigo_User_id ] = [ ];

    a_Artigo_id_by_User_id.push( a_Artigo.id );

    resolve( a_Artigo.id );
  }, 100 ) );
}

export function DA_Artigo_update( id, fields )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var a_Artigo = Artigo_listById[ id.toString( ) ];

    if( 'Artigo_Title' in fields ) a_Artigo.Artigo_Title = fields.Artigo_Title;
    if( 'Artigo_Keywords' in fields ) a_Artigo.Artigo_Keywords = fields.Artigo_Keywords;
    if( 'Artigo_Body' in fields ) a_Artigo.Artigo_Body = fields.Artigo_Body;

    resolve( );
  }, 100 ) );
}

export function DA_Artigo_get( id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    resolve( Artigo_listById[ id.toString( ) ] );
  }, 100 ) );
}

export function DA_Artigo_delete( User_id, id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    var ix_Artigo = Artigo_id_by_User_id[ User_id ].indexOf( id.toString( ) );

    if( ix_Artigo !== -1 )
      Artigo_id_by_User_id[ User_id ].splice( ix_Artigo, 1 );

    delete Artigo_listById[ id.toString( ) ];

    resolve( );
  }, 100 ) );
}

export function DA_Artigo_list_get( User_id )
{
  return new Promise( ( resolve, reject ) => setTimeout( ( ) =>
  {
    let arr_Artigo;
    let a_Artigo_id_by_User_id = Artigo_id_by_User_id[ User_id ];
    if( a_Artigo_id_by_User_id == null )
      arr_Artigo = [ ];
    else
      arr_Artigo = a_Artigo_id_by_User_id.map( id => Artigo_listById[ id ] );

    resolve( arr_Artigo );
  }, 100 ) );
}
