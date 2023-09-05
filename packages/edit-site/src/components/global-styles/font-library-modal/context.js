/**
 * WordPress dependencies
 */
import { createContext, useState, useEffect } from '@wordpress/element';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEntityRecord, useEntityRecords, store as coreStore } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { fetchInstallFonts, fetchUninstallFonts } from './resolvers';
import { DEFAULT_DEMO_CONFIG } from './constants';
import { unlock } from '../../../lock-unlock';
const { useGlobalSetting } = unlock( blockEditorPrivateApis );
import { setUIValuesNeeded, isUrlEncoded } from './utils';

export const FontLibraryContext = createContext( {} );

function FontLibraryProvider( { children } ) {

	const {
		__experimentalSaveSpecifiedEntityEdits: saveSpecifiedEntityEdits,
	} = useDispatch( coreStore );
	const { globalStylesId } = useSelect( ( select ) => {
		const { __experimentalGetCurrentGlobalStylesId } = select( coreStore );
		const globalStylesId = __experimentalGetCurrentGlobalStylesId();
		return { globalStylesId	};
	});

	const globalStyles = useEntityRecord('root', 'globalStyles', globalStylesId);
	const fontFamiliesHasChanges = !!globalStyles?.edits?.settings?.typography?.fontFamilies;

	const { createErrorNotice, createSuccessNotice } =
		useDispatch( noticesStore );

	const [ refreshKey, setRefreshKey ] = useState( 0 );

	const refreshLibrary = () => {
		setRefreshKey( ( prevKey ) => prevKey + 1 );
	};

	const { records: posts = [] } = useEntityRecords(
		'postType',
		'wp_font_family',
		{ refreshKey }
	);

	const libraryFonts =
		( posts || [] ).map( ( post ) => JSON.parse( post.content.raw ) ) || [];

	// Global Styles (settings) font families
	const [ fontFamilies, setFontFamilies ] = useGlobalSetting(
		'typography.fontFamilies'
	);
	// theme.json file font families
	const [ baseFontFamilies ] = useGlobalSetting(
		'typography.fontFamilies',
		undefined,
		'base'
	);

	// Save font families to the global styles post in the database.
	const saveFontFamilies = () => {
		saveSpecifiedEntityEdits( 'root', 'globalStyles', globalStylesId, [ 'settings.typography.fontFamilies' ] );
	}

	// Library Fonts
	const [ modalTabOepn, setModalTabOepn ] = useState( false );
	const [ libraryFontSelected, setLibraryFontSelected ] = useState( null );

	const baseThemeFonts = baseFontFamilies?.theme
		? baseFontFamilies.theme
				.map( ( f ) => setUIValuesNeeded( f, { source: 'theme' } ) )
				.sort( ( a, b ) => a.name.localeCompare( b.name ) )
		: [];

	const themeFonts = fontFamilies.theme
		? fontFamilies.theme
				.map( ( f ) => setUIValuesNeeded( f, { source: 'theme' } ) )
				.sort( ( a, b ) => a.name.localeCompare( b.name ) )
		: [];

	const customFonts = fontFamilies.custom
		? fontFamilies.custom
				.map( ( f ) => setUIValuesNeeded( f, { source: 'custom' } ) )
				.sort( ( a, b ) => a.name.localeCompare( b.name ) )
		: [];

	const baseCustomFonts = libraryFonts
		? libraryFonts
				.map( ( f ) => setUIValuesNeeded( f, { source: 'custom' } ) )
				.sort( ( a, b ) => a.name.localeCompare( b.name ) )
		: [];

	useEffect( () => {
		if ( ! modalTabOepn ) {
			setLibraryFontSelected( null );
		}
	}, [ modalTabOepn ] );

	const handleSetLibraryFontSelected = ( font ) => {
		// If font is null, reset the selected font
		if ( ! font ) {
			setLibraryFontSelected( null );
			return;
		}

		const fonts =
			font.source === 'theme' ? baseThemeFonts : baseCustomFonts;

		// Tries to find the font in the installed fonts
		const fontSelected = fonts.find( ( f ) => f.slug === font.slug );
		// If the font is not found (it is only defined in custom styles), use the font from custom styles
		setLibraryFontSelected( {
			...( fontSelected || font ),
			source: font.source,
		} );
	};

	const toggleModal = ( tabName ) => {
		setModalTabOepn( tabName || null );
	};

	// Demo
	const [ loadedFontUrls ] = useState( new Set() );
	const [ demoConfig ] = useState( DEFAULT_DEMO_CONFIG );

	// Theme data
	const { site, currentTheme } = useSelect( ( select ) => {
		const currentTheme = select( 'core' ).getCurrentTheme();
		return {
			site: select( 'core' ).getSite(),
			currentTheme,
		};
	} );
	const themeUrl =
		site?.url + '/wp-content/themes/' + currentTheme?.stylesheet;

	const getAvailableFontsOutline = ( fontFamilies ) => {
		const outline = fontFamilies.reduce( ( acc, font ) => {
			const availableFontFaces = Array.isArray( font?.fontFace )
				? font?.fontFace.map(
						( face ) => `${ face.fontStyle + face.fontWeight }`
				  )
				: [ 'normal400' ]; // If the font doesn't have fontFace, we assume it is a system font and we add the defaults: normal 400

			acc[ font.slug ] = availableFontFaces;
			return acc;
		}, {} );
		return outline;
	};

	const getActivatedFontsOutline = ( source ) => {
		switch ( source ) {
			case 'theme':
				return getAvailableFontsOutline( themeFonts );
			case 'custom':
			default:
				return getAvailableFontsOutline( customFonts );
		}
	};

	const isFontActivated = ( slug, style, weight, source ) => {
		if ( ! style && ! weight ) {
			return !! getActivatedFontsOutline( source )[ slug ];
		}
		return !! getActivatedFontsOutline( source )[ slug ]?.includes(
			style + weight
		);
	};

	const getFontFacesActivated = ( slug, source ) => {
		return getActivatedFontsOutline( source )[ slug ] || [];
	};

	async function installFonts( fonts ) {
		try {
			await fetchInstallFonts( fonts );
			createSuccessNotice(
				__( `Font families were installed succesfully.` ),
				{ type: 'snackbar' }
			);
			refreshLibrary();
			return true;
		} catch ( e ) {
			createErrorNotice( __( 'Error installing fonts.' ), {
				type: 'snackbar',
			} );
			return false;
		}
	}

	async function uninstallFont( font ) {
		try {
			// Uninstall the font (remove the font files from the server and the post from the database).
			await fetchUninstallFonts( [ font ] );
			// Deactivate the font family (remove the font family from the global styles).
			deactivateFontFamily( font );
			// Save the global styles to the database.
			await saveSpecifiedEntityEdits( 'root', 'globalStyles', globalStylesId, [ 'settings.typography.fontFamilies' ] );
			// Refresh the library (the the library font families from database).
			refreshLibrary();

			createSuccessNotice( __( `Font families were uninstalled.` ), {
				type: 'snackbar',
			} );
			
			return true;
		} catch ( e ) {
			console.error(e);
			createErrorNotice( __( 'Error uninstallind fonts.' ), {
				type: 'snackbar',
			} );
			return false;
		}
	}

	const deactivateFontFamily = ( font ) => {
		// If the user doesn't have custom fonts defined, include as custom fonts all the theme fonts
		// We want to save as active all the theme fonts at the beginning
		const initialCustomFonts = fontFamilies[ font.source ] || [];
		const newCustomFonts = initialCustomFonts.filter(
			( f ) => f.slug !== font.slug
		);
		setFontFamilies( {
			[ font.source ]: newCustomFonts,
		} );
	}

	const toggleActivateFont = ( font, face, ) => {
		// If the user doesn't have custom fonts defined, include as custom fonts all the theme fonts
		// We want to save as active all the theme fonts at the beginning
		const initialCustomFonts = fontFamilies[ font.source ] || [];

		const activatedFont = initialCustomFonts.find(
			( f ) => f.slug === font.slug
		);
		let newCustomFonts;

		// Entire font family
		if ( ! face ) {
			if ( ! activatedFont ) {
				// If the font is not active, activate the entire font family
				newCustomFonts = [ ...initialCustomFonts, font ];
			} else {
				// If the font is already active, deactivate the entire font family
				newCustomFonts = initialCustomFonts.filter(
					( f ) => f.slug !== font.slug
				);
			}
		} else {
			//single font variant
			let newFontFaces;

			// If the font family is active
			if ( activatedFont ) {
				const activatedFontFace = ( activatedFont.fontFace || [] ).find(
					( f ) =>
						f.fontWeight === face.fontWeight &&
						f.fontStyle === face.fontStyle
				);
				// If the font variant is active
				if ( activatedFontFace ) {
					// Deactivate the font variant
					newFontFaces = activatedFont.fontFace.filter(
						( f ) =>
							! (
								f.fontWeight === face.fontWeight &&
								f.fontStyle === face.fontStyle
							)
					);
					// If there are no more font faces, deactivate the font family
					if ( newFontFaces?.length === 0 ) {
						newCustomFonts = initialCustomFonts.filter(
							( f ) => f.slug !== font.slug
						);
					} else {
						// set the newFontFaces in the newCustomFonts
						newCustomFonts = initialCustomFonts.map( ( f ) =>
							f.slug === font.slug
								? { ...f, fontFace: newFontFaces }
								: f
						);
					}
				} else {
					// Activate the font variant
					newFontFaces = [ ...activatedFont.fontFace, face ];
					// set the newFontFaces in the newCustomFonts
					newCustomFonts = initialCustomFonts.map( ( f ) =>
						f.slug === font.slug
							? { ...f, fontFace: newFontFaces }
							: f
					);
				}
			} else {
				// If the font family is not active, activate the font family with the font variant
				newFontFaces = [ face ];
				newCustomFonts = [
					...initialCustomFonts,
					{ ...font, fontFace: newFontFaces },
				];
			}
		}
		setFontFamilies( {
			[ font.source ]: newCustomFonts,
		} );
	};

	const loadFontFaceAsset = async ( fontFace ) => {
		if ( ! fontFace.src ) {
			return;
		}

		let src = fontFace.src;
		if ( Array.isArray( src ) ) {
			src = src[ 0 ];
		}

		// If it is a theme font, we need to make the url absolute
		if ( src.startsWith( 'file:.' ) ) {
			src = src.replace( 'file:.', themeUrl );
		}

		if ( loadedFontUrls.has( src ) ) {
			return;
		}

		if ( ! isUrlEncoded ) {
			src = encodeURI( src );
		}

		const newFont = new FontFace( fontFace.fontFamily, `url( ${ src } )`, {
			style: fontFace.fontStyle,
			weight: fontFace.fontWeight,
		} );

		try {
			const loadedFace = await newFont.load();
			document.fonts.add( loadedFace );
		} catch ( e ) {
			// If the url is not valid we mark the font as loaded
			console.error( e );
		}
		loadedFontUrls.add( src );
	};

	return (
		<FontLibraryContext.Provider
			value={ {
				demoConfig,
				libraryFontSelected,
				handleSetLibraryFontSelected,
				themeFonts,
				baseThemeFonts,
				customFonts,
				baseCustomFonts,
				isFontActivated,
				getFontFacesActivated,
				loadFontFaceAsset,
				installFonts,
				uninstallFont,
				toggleActivateFont,
				getAvailableFontsOutline,
				modalTabOepn,
				toggleModal,
				refreshLibrary,
				saveFontFamilies,
				fontFamiliesHasChanges
			} }
		>
			{ children }
		</FontLibraryContext.Provider>
	);
}

export default FontLibraryProvider;
