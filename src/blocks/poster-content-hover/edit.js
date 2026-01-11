/**
 * Internal dependencies
 */
import ContentEdit from '../poster/shared/content-edit.js';
import { HOVER_CONTENT_TEMPLATE } from '../poster/constants.js';

/**
 * Edit component for Poster Hover Content block
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to set attributes.
 * @return {JSX.Element} Block edit component.
 */
export default function Edit( { attributes, setAttributes } ) {
	return (
		<ContentEdit
			attributes={ attributes }
			setAttributes={ setAttributes }
			variant="hover"
			template={ HOVER_CONTENT_TEMPLATE }
		/>
	);
}
