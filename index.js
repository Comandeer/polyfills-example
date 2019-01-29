const express = require( 'express' );
const whiskers = require( 'whiskers' );
const path = require( 'path' );
const crypto = require( 'crypto' );
const buildPolyfillLib = require( './buildPolyfillLib' );
const app = express();
const port = 3000;

app.engine( '.html', whiskers.__express );
app.set( 'views', path.join( __dirname, '/views' ) );

app.get( '/', ( req, res ) => {
	res.render( 'index.html', {
		nonce: crypto.randomBytes( 20 ).toString( 'hex' )
	} );
} );
app.get( '/polyfills', ( req, res ) => {
	const features = req.query.features.split( ',' );

	res.send( buildPolyfillLib( features ) );
} );
app.use( express.static( 'public' ) );

app.listen( port, () => {
	console.log( 'Server up and running!' );
} );