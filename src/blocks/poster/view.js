/**
 * Poster Block Frontend Script
 *
 * Handles touch device interactions for the Poster block.
 * On touch devices, first tap shows the hover state, second tap navigates.
 */

/* global navigator, MutationObserver */

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
	 * Check if a link element has a valid navigation URL
	 *
	 * @param {Element} link The link element to check
	 * @return {boolean} True if the link has a valid URL
	 */
	function hasValidLink( link ) {
		return (
			link &&
			link.getAttribute( 'href' ) &&
			link.getAttribute( 'href' ) !== '#' &&
			! link.hasAttribute( 'data-no-link' )
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
		// Track if this is the first tap on the current active poster
		let isFirstTapComplete = false;

		posters.forEach( ( poster ) => {
			// Skip if already initialized
			if ( poster.hasAttribute( 'data-touch-initialized' ) ) {
				return;
			}
			poster.setAttribute( 'data-touch-initialized', 'true' );

			const link = poster.querySelector( '.shm-poster__link' );
			const hasLink = hasValidLink( link );

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
						isFirstTapComplete = false;
					}
					// If this poster is already active, the touchend will handle navigation
				},
				{ passive: false }
			);

			// Handle touch end for navigation
			poster.addEventListener( 'touchend', ( e ) => {
				// If this poster is active and has a valid link
				if ( activePoster === poster && hasLink ) {
					// Check if this is the second tap (first tap is complete)
					if ( isFirstTapComplete ) {
						// This is the second tap - navigate to the link
						e.preventDefault();

						// Small delay to ensure the visual state is seen before navigation
						setTimeout( () => {
							const href = link.getAttribute( 'href' );
							const target = link.getAttribute( 'target' );

							if ( target === '_blank' ) {
								const newWindow = window.open(
									href,
									'_blank',
									'noopener,noreferrer'
								);
								// If popup was blocked, fall back to same-window navigation
								if ( ! newWindow ) {
									window.location.href = href;
								}
							} else {
								window.location.href = href;
							}
						}, 100 );
					} else {
						// This is the end of the first tap - mark it complete
						isFirstTapComplete = true;
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
					isFirstTapComplete = false;
				}
			},
			{ passive: true }
		);

		// Handle keyboard navigation for accessibility
		posters.forEach( ( poster ) => {
			// Skip if already initialized for keyboard
			if ( poster.hasAttribute( 'data-keyboard-initialized' ) ) {
				return;
			}
			poster.setAttribute( 'data-keyboard-initialized', 'true' );

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

				// Prevent spacebar from scrolling the page when link is focused
				link.addEventListener( 'keydown', ( e ) => {
					if ( e.key === ' ' ) {
						e.preventDefault();
						link.click();
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
							( node.classList?.contains(
								'wp-block-shm-poster'
							) ||
								node.querySelector?.( '.wp-block-shm-poster' ) )
						) {
							initPosterBlocks();
						}
					} );
				}
			} );
		} );

		// Ensure body exists before observing
		if ( document.body ) {
			observer.observe( document.body, {
				childList: true,
				subtree: true,
			} );
		} else {
			// Body doesn't exist yet - wait for DOMContentLoaded
			document.addEventListener( 'DOMContentLoaded', () => {
				if ( document.body ) {
					observer.observe( document.body, {
						childList: true,
						subtree: true,
					} );
				}
			} );
		}
	}
} )();
