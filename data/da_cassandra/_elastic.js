import elasticsearch from 'elasticsearch';


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion:'2.2'
});


function ensureNoErrorOrReport( qText, qVar, err, reject )
{
  if( err )
  {





    reject( err ); // Because terrisgit said so
  }
  else
    return true;
}

export function runQuery( objectPrototype, qText, qVar )
{
  //
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( qText, qVar, {prepare: true}, ( err, result ) => { if( ensureNoErrorOrReport( qText, qVar, err, reject ) )
    {
      const resultAsObjects = [ ];
      const rowCount = result.rowLength;
      for( let ixRow = 0 ; ixRow < rowCount ; ixRow++ )
      {
        let row = result.rows[ ixRow ];
        resultAsObjects.push( new objectPrototype( row ) );
      }
      //
      resolve( resultAsObjects );
    } } );
  } );
}

export function runQueryOneResult( objectPrototype, qText, qVar )
{
  //
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( qText, qVar, {prepare: true}, ( err, result ) => { if( ensureNoErrorOrReport( qText, qVar, err, reject ) )
    {
      //
      if( result.rowLength > 0 )
      {
        let row = result.rows[ 0 ];
        const retObj = new objectPrototype( row );
        resolve( retObj );
      }
      else
        resolve( null );
    } } );
  } );
}

export function runQueryNoResult( qText, qVar )
{
  //
  return new Promise( ( resolve, reject ) =>
  {
    client.execute( qText, qVar, {prepare: true}, ( err ) => { if( ensureNoErrorOrReport( qText, qVar, err, reject ) )
    {
      //
      resolve( );
    } } );
  } );
}
