const express = require( 'express' );
const whiskers = require( 'whiskers' );
const path = require( 'path' );
const crypto = require( 'crypto' );
const buildPolyfillLib = require( './buildPolyfillLib' );
const app = express();
const port = 3000;

app.engine( '.html', whiskers.__express );
app.set( 'views', path.join( __dirname, 'views' ) );

app.get( '/', ( req, res ) => {
	const nonce = crypto.randomBytes( 20 ).toString( 'hex' );

	res.set( 'Content-Security-Policy',
		`default-src 'none'; connect-src http://localhost:3000/data.json; script-src 'nonce-${ nonce }' 'strict-dynamic'` );
	res.render( 'index.html', {
		nonce
	} );
} );
app.get( '/polyfills', ( req, res ) => {
	const features = req.query.features.split( ',' );

	res.set( 'Content-Type', 'application/javascript' );
	res.send( buildPolyfillLib( features ) );
} );
app.use( express.static( 'public' ) );

app.listen( port, () => {
	console.log( 'Server up and running!' );
} );