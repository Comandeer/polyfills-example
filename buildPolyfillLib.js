const availablePolyfills = {
	'fetch.JSON': `( function() {
		fetch.JSON = function( URL ) {
			return fetch( URL ).then( ( res ) => {
				return res.json();
			} );
		};
	}() );`,

	'JSON.render': `( function() {
		JSON.render = function( json, selector ) {
			document.querySelector( selector ).innerHTML = JSON.stringify( json );
		};
	}() );`
};
module.exports = function( features ) {
	return features.reduce( ( code, feature ) => {
		return code + availablePolyfills[ feature ];
	}, '' );
};