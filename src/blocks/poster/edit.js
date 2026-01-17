/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	FocalPointPicker,
	ColorPicker,
	ToolbarGroup,
	ToolbarButton,
	Popover,
} from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { link, image } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { buildCustomStyles } from './utils';
import {
	ANIMATION_TYPES,
	EASING_OPTIONS,
	POSITION_OPTIONS,
	ASPECT_RATIO_OPTIONS,
} from './constants';

/**
 * Allowed blocks inside poster content area
 */
const ALLOWED_BLOCKS = [
	'core/heading',
	'core/paragraph',
	'core/image',
	'core/buttons',
	'core/button',
	'core/list',
	'core/separator',
	'core/spacer',
	'core/group',
	'shm/poster-hover-content',
];

/**
 * Template for inner blocks - default content + hover content wrapper
 */
const TEMPLATE = [
	[
		'core/heading',
		{ level: 3, placeholder: __( 'Title\u2026', 'shm-blocks' ) },
	],
	[
		'shm/poster-hover-content',
		{},
		[
			[
				'core/paragraph',
				{
					placeholder: __(
						'Description shown on hover\u2026',
						'shm-blocks'
					),
				},
			],
		],
	],
];

/**
 * Edit component for Poster block
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to set attributes.
 * @return {JSX.Element} Block edit component
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		mediaId,
		mediaUrl,
		focalPoint,
		imageAlt,
		linkUrl,
		linkTarget,
		overlayPosition,
		animationType,
	} = attributes;

	const [ isLinkPopoverOpen, setIsLinkPopoverOpen ] = useState( false );
	const [ isPreviewingHover, setIsPreviewingHover ] = useState( false );

	const linkButtonRef = useRef( null );

	const customStyles = buildCustomStyles( attributes );

	const classNames = [
		'wp-block-shm-poster',
		`wp-block-shm-poster--animation-${ animationType }`,
		`wp-block-shm-poster--position-${ overlayPosition }`,
		isPreviewingHover && 'is-previewing-hover',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps( {
		className: classNames,
		style: customStyles,
	} );

	function onSelectMedia( media ) {
		if ( ! media?.url ) {
			setAttributes( { mediaId: undefined, mediaUrl: undefined } );
			return;
		}
		setAttributes( {
			mediaId: media.id,
			mediaUrl: media.url,
			imageAlt: media.alt || '',
		} );
	}

	function onLinkChange( newLink ) {
		const opensInNewTab = newLink?.opensInNewTab;
		setAttributes( {
			linkUrl: newLink?.url || '',
			linkTarget: opensInNewTab ? '_blank' : '_self',
			linkRel: opensInNewTab ? 'noopener noreferrer' : '',
		} );
	}

	function clearLink() {
		setAttributes( {
			linkUrl: '',
			linkTarget: '_self',
			linkRel: '',
		} );
	}

	function clearMedia() {
		setAttributes( {
			mediaId: undefined,
			mediaUrl: undefined,
		} );
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="controls-play"
						label={ __( 'Preview Hover State', 'shm-blocks' ) }
						onClick={ () =>
							setIsPreviewingHover( ! isPreviewingHover )
						}
						isPressed={ isPreviewingHover }
					>
						{ isPreviewingHover
							? __( 'Previewing', 'shm-blocks' )
							: __( 'Preview', 'shm-blocks' ) }
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectMedia }
							allowedTypes={ [ 'image' ] }
							value={ mediaId }
							render={ ( { open } ) => (
								<ToolbarButton
									icon={ image }
									label={ __( 'Edit Image', 'shm-blocks' ) }
									onClick={ open }
								/>
							) }
						/>
					</MediaUploadCheck>
					<ToolbarButton
						ref={ linkButtonRef }
						icon={ link }
						label={ __( 'Edit Link', 'shm-blocks' ) }
						onClick={ () =>
							setIsLinkPopoverOpen( ! isLinkPopoverOpen )
						}
						isPressed={ isLinkPopoverOpen || !! linkUrl }
					/>
					{ isLinkPopoverOpen && (
						<Popover
							position="bottom center"
							onClose={ () => setIsLinkPopoverOpen( false ) }
							anchor={ linkButtonRef.current }
							focusOnMount="firstElement"
						>
							<div
								style={ { padding: '16px', minWidth: '300px' } }
							>
								<LinkControl
									value={ {
										url: linkUrl,
										opensInNewTab: linkTarget === '_blank',
									} }
									onChange={ onLinkChange }
									onRemove={ clearLink }
								/>
							</div>
						</Popover>
					) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Image Settings', 'shm-blocks' ) }
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectMedia }
							allowedTypes={ [ 'image' ] }
							value={ mediaId }
							render={ ( { open } ) => (
								<div className="shm-poster-image-control">
									{ mediaUrl ? (
										<>
											<img
												src={ mediaUrl }
												alt={ imageAlt || '' }
												style={ {
													maxWidth: '100%',
													marginBottom: '8px',
												} }
											/>
											<Button
												variant="secondary"
												onClick={ open }
												style={ { marginRight: '8px' } }
											>
												{ __(
													'Replace Image',
													'shm-blocks'
												) }
											</Button>
											<Button
												variant="tertiary"
												isDestructive
												onClick={ clearMedia }
											>
												{ __( 'Remove', 'shm-blocks' ) }
											</Button>
										</>
									) : (
										<Button
											variant="primary"
											onClick={ open }
										>
											{ __(
												'Select Image',
												'shm-blocks'
											) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					{ mediaUrl && (
						<>
							<FocalPointPicker
								label={ __( 'Focal Point', 'shm-blocks' ) }
								url={ mediaUrl }
								value={ focalPoint }
								onChange={ ( value ) =>
									setAttributes( { focalPoint: value } )
								}
							/>
							<TextControl
								label={ __( 'Alt Text', 'shm-blocks' ) }
								value={ imageAlt }
								onChange={ ( value ) =>
									setAttributes( { imageAlt: value } )
								}
								help={ __(
									'Describe the image for accessibility.',
									'shm-blocks'
								) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Link Settings', 'shm-blocks' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'URL', 'shm-blocks' ) }
						value={ linkUrl }
						onChange={ ( value ) =>
							setAttributes( { linkUrl: value } )
						}
						placeholder="https://"
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'shm-blocks' ) }
						checked={ linkTarget === '_blank' }
						onChange={ ( value ) =>
							setAttributes( {
								linkTarget: value ? '_blank' : '_self',
								linkRel: value ? 'noopener noreferrer' : '',
							} )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Overlay Settings', 'shm-blocks' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Overlay Color', 'shm-blocks' ) }</p>
					<ColorPicker
						color={ attributes.overlayColor }
						onChange={ ( value ) =>
							setAttributes( { overlayColor: value } )
						}
						enableAlpha={ false }
					/>
					<SelectControl
						label={ __( 'Overlay Position', 'shm-blocks' ) }
						value={ overlayPosition }
						options={ POSITION_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { overlayPosition: value } )
						}
					/>
					<RangeControl
						label={ __( 'Default Opacity (%)', 'shm-blocks' ) }
						value={ attributes.overlayOpacity }
						onChange={ ( value ) =>
							setAttributes( { overlayOpacity: value } )
						}
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Hover Opacity (%)', 'shm-blocks' ) }
						value={ attributes.overlayOpacityHover }
						onChange={ ( value ) =>
							setAttributes( { overlayOpacityHover: value } )
						}
						min={ 0 }
						max={ 100 }
					/>
					<TextControl
						label={ __( 'Default Height', 'shm-blocks' ) }
						value={ attributes.overlayHeight }
						onChange={ ( value ) =>
							setAttributes( { overlayHeight: value } )
						}
						help={ __( 'E.g., 30%, 150px, 10rem', 'shm-blocks' ) }
					/>
					<TextControl
						label={ __( 'Hover Height', 'shm-blocks' ) }
						value={ attributes.overlayHeightHover }
						onChange={ ( value ) =>
							setAttributes( { overlayHeightHover: value } )
						}
						help={ __( 'E.g., 100%, 300px', 'shm-blocks' ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Animation Settings', 'shm-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Overlay Animation', 'shm-blocks' ) }
						value={ animationType }
						options={ ANIMATION_TYPES }
						onChange={ ( value ) =>
							setAttributes( { animationType: value } )
						}
						help={ __(
							'Animation style for the overlay panel.',
							'shm-blocks'
						) }
					/>
					<RangeControl
						label={ __( 'Transition Duration (ms)', 'shm-blocks' ) }
						value={ attributes.transitionDuration }
						onChange={ ( value ) =>
							setAttributes( { transitionDuration: value } )
						}
						min={ 100 }
						max={ 1000 }
						step={ 50 }
					/>
					<SelectControl
						label={ __( 'Easing Function', 'shm-blocks' ) }
						value={ attributes.transitionEasing }
						options={ EASING_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { transitionEasing: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Dimensions', 'shm-blocks' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Minimum Height', 'shm-blocks' ) }
						value={ attributes.minHeight }
						onChange={ ( value ) =>
							setAttributes( { minHeight: value } )
						}
						help={ __( 'E.g., 400px, 50vh', 'shm-blocks' ) }
					/>
					<SelectControl
						label={ __( 'Aspect Ratio', 'shm-blocks' ) }
						value={ attributes.aspectRatio || '' }
						options={ ASPECT_RATIO_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { aspectRatio: value || undefined } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ mediaUrl ? (
					<img
						className="shm-poster__image"
						src={ mediaUrl }
						alt={ imageAlt || '' }
						style={ {
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: `${
								( focalPoint?.x ?? 0.5 ) * 100
							}% ${ ( focalPoint?.y ?? 0.5 ) * 100 }%`,
						} }
					/>
				) : (
					<div className="shm-poster__placeholder">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ onSelectMedia }
								allowedTypes={ [ 'image' ] }
								value={ mediaId }
								render={ ( { open } ) => (
									<Button
										variant="primary"
										onClick={ open }
										icon={ image }
									>
										{ __(
											'Select Background Image',
											'shm-blocks'
										) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</div>
				) }

				<div className="shm-poster__overlay">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}
