/**
 * External dependencies
 */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
/**
 * Internal dependencies
 */
import { Flex } from '../../flex';
import BaseUnitControl from '../../unit-control';
import { rtl } from '../../utils';
import type { BoxUnitControlProps } from '../types';

const rootWidth = ( {
	__next40pxDefaultSize,
}: Pick< BoxUnitControlProps, '__next40pxDefaultSize' > ) => {
	const maxWidth = __next40pxDefaultSize ? '320px' : '235px';
	return css( { maxWidth } );
};

export const Root = styled.div`
	box-sizing: border-box;
	padding-bottom: 12px;
	width: 100%;
	${ rootWidth }
`;

export const Header = styled( Flex )`
	margin-bottom: 8px;
`;

export const HeaderControlWrapper = styled( Flex )`
	min-height: 30px;
	gap: 0;
`;

export const UnitControlWrapper = styled.div`
	box-sizing: border-box;
	max-width: 80px;
`;

export const LayoutContainer = styled( Flex )`
	justify-content: center;
	padding-top: 8px;
`;

export const Layout = styled( Flex )`
	position: relative;
	height: 100%;
	width: 100%;
	justify-content: flex-start;
`;

const unitControlBorderRadiusStyles = ( {
	isFirst,
	isLast,
	isOnly,
}: Pick< BoxUnitControlProps, 'isFirst' | 'isLast' | 'isOnly' > ) => {
	if ( isFirst ) {
		return rtl( { borderTopRightRadius: 0, borderBottomRightRadius: 0 } )();
	}
	if ( isLast ) {
		return rtl( { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } )();
	}
	if ( isOnly ) {
		return css( { borderRadius: 2 } );
	}

	return css( {
		borderRadius: 0,
	} );
};

const unitControlMarginStyles = ( {
	isFirst,
	isOnly,
}: Pick< BoxUnitControlProps, 'isFirst' | 'isOnly' > ) => {
	const marginLeft = isFirst || isOnly ? 0 : -1;

	return rtl( { marginLeft } )();
};

const unitControlWidth = ( {
	__next40pxDefaultSize,
}: Pick< BoxUnitControlProps, '__next40pxDefaultSize' > ) => {
	const maxWidth = __next40pxDefaultSize ? '80px' : '60px';

	return css( { maxWidth } );
};

export const UnitControl = styled( BaseUnitControl )`
	${ unitControlBorderRadiusStyles };
	${ unitControlMarginStyles };
	${ unitControlWidth };
`;
