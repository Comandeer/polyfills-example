fetch.JSON( 'data.json' ).then( ( data ) => {
	JSON.render( data, '#app' );
} );