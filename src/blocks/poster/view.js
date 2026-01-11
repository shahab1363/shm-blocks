/**
 * Poster Block Frontend Script
 *
 * Handles touch device interactions for the Poster block.
 * On touch devices, first tap shows the hover state, second tap navigates.
 */

( function () {
	'use strict';

	/**
	 * Check if the device supports touch
	 *
	 * @return {boolean} True if touch is supported
	 */
	function isTouchDevice() {
		return (
			'ontouchstart' in window ||
			navigator.maxTouchPoints > 0 ||
			navigator.msMaxTouchPoints > 0
		);
	}

	/**
	 * Initialize poster block touch handling
	 */
	function initPosterBlocks() {
		// Only apply touch handling on touch devices
		if ( ! isTouchDevice() ) {
			return;
		}

		const posters = document.querySelectorAll( '.wp-block-shm-poster' );

		if ( ! posters.length ) {
			return;
		}

		// Track which poster is currently "touched" (showing hover state)
		let activePoster = null;

		posters.forEach( ( poster ) => {
			const link = poster.querySelector( '.shm-poster__link' );
			const hasLink =
				link &&
				link.getAttribute( 'href' ) &&
				link.getAttribute( 'href' ) !== '#' &&
				! link.hasAttribute( 'data-no-link' );

			// Handle touch start
			poster.addEventListener(
				'touchstart',
				( e ) => {
					// If this poster is not active (not showing hover state)
					if ( activePoster !== poster ) {
						// Prevent default to stop immediate navigation
						e.preventDefault();

						// Deactivate any other active poster
						if ( activePoster ) {
							activePoster.classList.remove( 'is-touched' );
						}

						// Activate this poster
						poster.classList.add( 'is-touched' );
						activePoster = poster;
					}
					// If this poster is already active, let the touch proceed normally
					// This allows the second tap to navigate
				},
				{ passive: false }
			);

			// Handle touch end for navigation
			poster.addEventListener( 'touchend', ( e ) => {
				// If this poster is active and has a valid link
				if ( activePoster === poster && hasLink ) {
					// Check if we're tapping on the same poster that's already active
					// This is the "second tap" - navigate to the link
					const touchedOnActive = poster.classList.contains( 'is-touched' );

					if ( touchedOnActive ) {
						// Small delay to ensure the visual state is seen before navigation
						// This is optional but provides better UX
						setTimeout( () => {
							const href = link.getAttribute( 'href' );
							const target = link.getAttribute( 'target' );

							if ( target === '_blank' ) {
								window.open( href, '_blank', 'noopener,noreferrer' );
							} else {
								window.location.href = href;
							}
						}, 100 );
					}
				}
			} );
		} );

		// Close active poster when tapping outside
		document.addEventListener(
			'touchstart',
			( e ) => {
				if ( activePoster && ! activePoster.contains( e.target ) ) {
					activePoster.classList.remove( 'is-touched' );
					activePoster = null;
				}
			},
			{ passive: true }
		);

		// Handle keyboard navigation for accessibility
		posters.forEach( ( poster ) => {
			const link = poster.querySelector( '.shm-poster__link' );

			if ( link ) {
				// Show hover state on focus
				link.addEventListener( 'focus', () => {
					poster.classList.add( 'is-focused' );
				} );

				// Hide hover state on blur
				link.addEventListener( 'blur', () => {
					poster.classList.remove( 'is-focused' );
				} );

				// Handle Enter/Space key
				link.addEventListener( 'keydown', ( e ) => {
					if ( e.key === 'Enter' || e.key === ' ' ) {
						// Let the default link behavior handle navigation
						// The CSS :focus-visible state will show the hover content
					}
				} );
			}
		} );
	}

	// Initialize when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initPosterBlocks );
	} else {
		initPosterBlocks();
	}

	// Re-initialize if new blocks are added dynamically (e.g., via AJAX)
	// This is useful for infinite scroll or dynamic page loading
	if ( typeof MutationObserver !== 'undefined' ) {
		const observer = new MutationObserver( ( mutations ) => {
			mutations.forEach( ( mutation ) => {
				if ( mutation.addedNodes.length ) {
					mutation.addedNodes.forEach( ( node ) => {
						if (
							node.nodeType === 1 &&
							( node.classList?.contains( 'wp-block-shm-poster' ) ||
								node.querySelector?.( '.wp-block-shm-poster' ) )
						) {
							initPosterBlocks();
						}
					} );
				}
			} );
		} );

		observer.observe( document.body, {
			childList: true,
			subtree: true,
		} );
	}
} )();
