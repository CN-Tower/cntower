define( [
	"../core-99808268acf6",
	"../selector-e05dd9a1bb1e",
	"../effects-0e0019cd1ed3"
], function( jQuery ) {

"use strict";

jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};

} );
