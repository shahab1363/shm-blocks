/**
 * Internal dependencies
 */
import ContentSave from '../poster/shared/content-save.js';

/**
 * Save component for Poster Hover Content block
 *
 * @param {Object} props            Block props.
 * @param {Object} props.attributes Block attributes.
 * @return {JSX.Element} Block save component.
 */
export default function save( { attributes } ) {
	return <ContentSave attributes={ attributes } variant="hover" />;
}
