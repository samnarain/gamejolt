angular.module( 'App' ).config( function( EnvironmentProvider, $compileProvider )
{
	EnvironmentProvider.env = 'development';
	EnvironmentProvider.isDev = true;
	$compileProvider.debugInfoEnabled( true );
} );
