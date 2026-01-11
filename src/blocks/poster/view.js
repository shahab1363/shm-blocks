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
		const href = link.getAttribute( 'href' );
		const target = link.getAttribute( 'target' );

		if ( target === '_blank' ) {
			const newWindow = window.open(
				href,
				'_blank',
				'noopener,noreferrer'
			);
			if ( ! newWindow ) {
				window.location.href = href;
			}
		} else {
			window.location.href = href;
		}
	}

	function deactivatePoster() {
		if ( activePoster ) {
			activePoster.classList.remove( TOUCHED_CLASS );
			activePoster = null;
			isFirstTapComplete = false;
		}
	}

	function initPoster( poster ) {
		if ( poster.hasAttribute( 'data-touch-initialized' ) ) {
			return;
		}
		poster.setAttribute( 'data-touch-initialized', 'true' );

		const link = poster.querySelector( LINK_SELECTOR );
		const hasLink = hasValidLink( link );

		poster.addEventListener(
			'touchstart',
			function ( e ) {
				if ( activePoster !== poster ) {
					e.preventDefault();
					deactivatePoster();
					poster.classList.add( TOUCHED_CLASS );
					activePoster = poster;
					isFirstTapComplete = false;
				}
			},
			{ passive: false }
		);

		poster.addEventListener( 'touchend', function ( e ) {
			if ( activePoster === poster && hasLink ) {
				if ( isFirstTapComplete ) {
					e.preventDefault();
					setTimeout( function () {
						navigate( link );
					}, 100 );
				} else {
					isFirstTapComplete = true;
				}
			}
		} );

		if ( link ) {
			link.addEventListener( 'focus', function () {
				poster.classList.add( FOCUSED_CLASS );
			} );

			link.addEventListener( 'blur', function () {
				poster.classList.remove( FOCUSED_CLASS );
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
