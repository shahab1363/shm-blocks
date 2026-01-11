/**
 * Poster Block Frontend Script
 *
 * Handles touch device interactions for the Poster block.
 * On touch devices, first tap shows the hover state, second tap navigates.
 */

/* global navigator, MutationObserver */

( function () {
	'use strict';

	const BLOCK_SELECTOR = '.wp-block-shm-poster';
	const LINK_SELECTOR = '.shm-poster__link';
	const TOUCHED_CLASS = 'is-touched';
	const FOCUSED_CLASS = 'is-focused';

	let activePoster = null;
	let isFirstTapComplete = false;
	let isNavigating = false;

	// Touch tracking for swipe detection
	let touchStartX = 0;
	let touchStartY = 0;
	const SWIPE_THRESHOLD = 10; // pixels of movement to consider it a swipe

	function isTouchDevice() {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	}

	function hasValidLink( link ) {
		if ( ! link ) {
			return false;
		}
		const href = link.getAttribute( 'href' );
		return href && href !== '#' && ! link.hasAttribute( 'data-no-link' );
	}

	function navigate( link ) {
		if ( isNavigating ) {
			return;
		}

		const href = link.getAttribute( 'href' );
		if ( ! href || href === '#' ) {
			return;
		}

		isNavigating = true;

		try {
			const target = link.getAttribute( 'target' );

			if ( target === '_blank' ) {
				const newWindow = window.open(
					href,
					'_blank',
					'noopener,noreferrer'
				);
				if ( ! newWindow ) {
					// Popup was blocked, fall back to same-window navigation
					window.location.href = href;
				}
			} else {
				window.location.href = href;
			}
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( '[SHM Blocks] Navigation failed:', error );
			// Reset flag on error so user can retry
			isNavigating = false;
		}
	}

	// Reset navigation flag when page becomes visible again (e.g., back navigation)
	document.addEventListener( 'visibilitychange', function () {
		if ( document.visibilityState === 'visible' ) {
			isNavigating = false;
		}
	} );

	function setExpandedState( poster, expanded ) {
		if ( ! poster ) {
			return;
		}
		poster.setAttribute( 'aria-expanded', expanded ? 'true' : 'false' );
	}

	function deactivatePoster() {
		if ( activePoster ) {
			activePoster.classList.remove( TOUCHED_CLASS );
			setExpandedState( activePoster, false );
			activePoster = null;
			isFirstTapComplete = false;
		}
	}

	function initPoster( poster ) {
		if ( poster.hasAttribute( 'data-touch-initialized' ) ) {
			return;
		}
		poster.setAttribute( 'data-touch-initialized', 'true' );

		setExpandedState( poster, false );

		const link = poster.querySelector( LINK_SELECTOR );
		const hasLink = hasValidLink( link );

		// Track touch start position for swipe detection
		poster.addEventListener(
			'touchstart',
			function ( e ) {
				const touch = e.touches[ 0 ];
				touchStartX = touch.clientX;
				touchStartY = touch.clientY;
			},
			{ passive: true }
		);

		poster.addEventListener(
			'touchend',
			function ( e ) {
				const touch = e.changedTouches[ 0 ];
				const deltaX = Math.abs( touch.clientX - touchStartX );
				const deltaY = Math.abs( touch.clientY - touchStartY );

				// If movement exceeded threshold, this was a swipe - don't handle
				if ( deltaX > SWIPE_THRESHOLD || deltaY > SWIPE_THRESHOLD ) {
					return;
				}

				// This was a tap, not a swipe
				if ( activePoster !== poster ) {
					// First tap on inactive poster - activate it
					e.preventDefault();
					deactivatePoster();
					poster.classList.add( TOUCHED_CLASS );
					setExpandedState( poster, true );
					activePoster = poster;
					isFirstTapComplete = false;
				} else if ( hasLink && ! isNavigating ) {
					// Tap on active poster - navigate on second tap
					if ( isFirstTapComplete ) {
						e.preventDefault();
						setTimeout( function () {
							navigate( link );
						}, 100 );
					} else {
						isFirstTapComplete = true;
					}
				}
			},
			{ passive: false }
		);

		if ( link ) {
			link.addEventListener( 'focus', function () {
				poster.classList.add( FOCUSED_CLASS );
				setExpandedState( poster, true );
			} );

			link.addEventListener( 'blur', function () {
				poster.classList.remove( FOCUSED_CLASS );
				if ( activePoster !== poster ) {
					setExpandedState( poster, false );
				}
			} );

			link.addEventListener( 'keydown', function ( e ) {
				if ( e.key === ' ' ) {
					e.preventDefault();
					link.click();
				}
			} );
		}
	}

	function initAllPosters() {
		if ( ! isTouchDevice() ) {
			return;
		}

		document.querySelectorAll( BLOCK_SELECTOR ).forEach( initPoster );
	}

	function setupGlobalTouchHandler() {
		document.addEventListener(
			'touchstart',
			function ( e ) {
				if ( activePoster && ! activePoster.contains( e.target ) ) {
					deactivatePoster();
				}
			},
			{ passive: true }
		);
	}

	function setupMutationObserver() {
		if ( typeof MutationObserver === 'undefined' || ! document.body ) {
			return;
		}

		const observer = new MutationObserver( function ( mutations ) {
			for ( const mutation of mutations ) {
				for ( const node of mutation.addedNodes ) {
					if ( node.nodeType !== 1 ) {
						continue;
					}
					if (
						node.classList?.contains( 'wp-block-shm-poster' ) ||
						node.querySelector?.( BLOCK_SELECTOR )
					) {
						initAllPosters();
						return;
					}
				}
			}
		} );

		observer.observe( document.body, { childList: true, subtree: true } );
	}

	function init() {
		initAllPosters();
		setupGlobalTouchHandler();
		setupMutationObserver();
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
