// mobileDevice is only for phones!
let mobileDevice = false;
let mobileOrTablet = false;

const minorWords = new Set([
    'a',
    'an',
    'the',
    'and',
    'or',
    'but',
    'in',
    'of',
    'eFiling',
    'for'
]);

const urlSegmentsBreadCrumbReplacements = {
    'form-1095-b': 'Form 1095-B',
    'healthy-you-provider-information': '<span class="italic">Healthy You!</span> Provider Information',
    'healthy-you-wellness-benefit': '<span class="italic">Healthy You!</span> Wellness Benefit',
    'non-network-provider-document-upload-tool': 'Non-Network Provider Document Upload Tool',
    'non-network-provider-router': 'Non-Network Provider Router',
    'out-of-state-prior-authorizations': 'Out-of-State Authorizations',
    'sms-policy': 'SMS Policy'
}

const urlSegmentPiecesBreadCrumbReplacements = {
    and: '&',
    eclaims: 'eClaims',
    im: "I'm",
    rxsmart: "RxSmart"
};

const mobileMenuSwipe = {
    menuEl: null,
    sharedTouchData: {
        startX: 0,
        startY: 0,
        startTime: 0
    },
    touchConstraints: {
        allowedTime: 400,
        restraint: 100,
        threshold: 100
    },
    touchEndHandler: (event) => {
        if (mobileMenuSwipe.menuEl.contains(event.target) === false) return;

        const touchData = event.changedTouches[0];

        const distanceX = touchData.pageX - mobileMenuSwipe.sharedTouchData.startX;
        const distanceY = touchData.pageY - mobileMenuSwipe.sharedTouchData.startY;

        const elapsedTime = new Date().getTime() - mobileMenuSwipe.sharedTouchData.startTime;

        let swipeDirection = 'unknown';

        if (
            (elapsedTime <= mobileMenuSwipe.touchConstraints.allowedTime) &&
            (Math.abs(distanceX) >= mobileMenuSwipe.touchConstraints.threshold) &&
            (Math.abs(distanceY) <= mobileMenuSwipe.touchConstraints.restraint)
        ) {
            swipeDirection = (distanceX < 0) ? 'left' : 'right';
        }
        else return;

        if (swipeDirection === 'right') return;

        toggleMobileNav();

        event.preventDefault();
    },
    touchMoveHandler: (event) => {
        if (mobileMenuSwipe.menuEl.contains(event.target) === false) return;

        const touchData = event.changedTouches[0];
        const moveAmountX = Math.abs(touchData.pageX - mobileMenuSwipe.sharedTouchData.startX);

        if (moveAmountX < mobileMenuSwipe.touchConstraints.threshold) return;

        event.preventDefault();
    },
    touchStartHandler: (event) => {
        if (mobileMenuSwipe.menuEl.contains(event.target) === false) return;

        const touchData = event.changedTouches[0];

        mobileMenuSwipe.sharedTouchData.startX = touchData.pageX;
        mobileMenuSwipe.sharedTouchData.startY = touchData.pageY;
        mobileMenuSwipe.sharedTouchData.startTime = new Date().getTime();
    }
};

function checkIfMobileDevice(mediaQueryListMobile, mediaQueryListMobileOrTablet) {
    if (mediaQueryListMobile.matches === true) {
        mobileOrTablet = true;
        mobileDevice = true;
    }
    else if (mediaQueryListMobileOrTablet.matches === true) {
        mobileOrTablet = true;
    }
    else {
        mobileOrTablet = false;
        mobileDevice = false;
    }

}

function clickOutsideOfNavMenusHandler(event) {
    const primaryNavEl = document.getElementById('primary-nav');

    if (primaryNavEl.contains(event.target) === false) hideAllNavMenus();
}

function closeNavMenu(menuIndex) {
    const targetEl = document.getElementById(`nav-option-${ menuIndex }`);

    pointChevronDown(targetEl.querySelector('.nav-chevron'));

    unSetNavElActive(document.getElementById(`nav-option-${ menuIndex }`));

    hideNavMenu(menuIndex);
}

function closeLoginMenu(menuIndex, removeEnterListenerCallback, targetEl) {
    pointChevronDown(targetEl.querySelector('.nav-chevron'));

    unSetNavElActive(document.getElementById(`nav-option-${ menuIndex }`));

    removeEnterListenerCallback();

    hideNavMenu(menuIndex);
}

function constructBreadCrumb() {

    let breadCrumb = `<a class="inline" href="/">Home</a>`;

    const resourceIdentifier = window.location.pathname;

    const route = window.location.hash;

    const pathSegmentsUnfiltered = resourceIdentifier.split('/');

    const routeSegmentsUnfiltered = route.split('-');

    const pathSegments = pathSegmentsUnfiltered.filter((segment) => {
        return (segment !== '') && (segment !== '#/');
    });

    const routeSegments = routeSegmentsUnfiltered.filter((segment) => {
        return segment !== '';
    });

    segmentRelativePath = '/';

    for (let i = 0; i < pathSegments.length; i++) {
        segmentRelativePath += `${ pathSegments[i] }/`;

        let pathSegmentEnglish = '';

        pathSegmentEnglish += convertUrlSegmentToEnglish(pathSegments[i]);

        if (
            (segmentRelativePath[segmentRelativePath.length - 1] === '/') &&
            (i === pathSegments.length - 1)
        ) {
            segmentRelativePath = segmentRelativePath.slice(0, segmentRelativePath.length - 1);
        }

        if (i === pathSegments.length - 1) {
            breadCrumb += ` Â» <a class="inline" disabled href="${ segmentRelativePath }">${ pathSegmentEnglish.trim() }</a>`;
        }
        else {
            breadCrumb += ` Â» <a class="inline" href="${ segmentRelativePath }">${ pathSegmentEnglish.trim() }</a>`;
        }
    }

    return breadCrumb;
}

function convertUrlSegmentToEnglish(segment) {
    const pathSegmentPieces = segment.split('-');

    let segmentEnglish = '';

    if (segment in urlSegmentsBreadCrumbReplacements) {
        return urlSegmentsBreadCrumbReplacements[segment];
    }

    for (let j = 0; j < pathSegmentPieces.length; j++) {
        if (
            (j === 0) &&
            (segmentEnglish !== '')
        ) break;

        if (pathSegmentPieces[j].toLowerCase() in urlSegmentPiecesBreadCrumbReplacements) {
            segmentEnglish += `${ urlSegmentPiecesBreadCrumbReplacements[pathSegmentPieces[j]] } `;
            continue;
        }

        if (minorWords.has(pathSegmentPieces[j])) {
            segmentEnglish += `${ pathSegmentPieces[j] } `;
            continue;
        }

        const firstLetterCapital = pathSegmentPieces[j][0].toUpperCase();

        segmentEnglish += `${ firstLetterCapital }${ pathSegmentPieces[j].slice(1) } `;
    }

    return segmentEnglish
}

function detectVideoLoadFailure(videoEl) {
    setTimeout(() => {console.log('detecting!', videoEl.contentWindow.document);}, 500);

}

function genericHideOnClickOutside(closeHandler, elToHide) {
console.log('elToHide', elToHide)
    const handleClickOutside = (event) => {
        if (elToHide.contains(event.target)) return;

        closeHandler();

        document.removeEventListener('mousedown', handleClickOutside);
    }

    document.addEventListener('mousedown', handleClickOutside);
}

function getLoginForm() {
    return `
        <input
            id="username"
            class="login"
            placeholder="Username"
            type="text"
            maxlength="20"
        >

        <p
            id="username-errors"
            class="errors no-margin"
        ></p>

        <input
            id="password"
            class="login"
            placeholder="Password"
            type="password"
            maxlength="32"
        >

        <p
            id="password-errors"
            class="errors no-margin"
        ></p>
    `;
}

function hideAllNavMenus() {
    for (let i = 1; i < 5; i++) {
        unSetNavElActive(document.getElementById(`nav-option-${ i }`));
        hideNavMenu(i);
    }
}

function hideNavMenu(menuIndex) {
    const navMenu = document.getElementById(`primary-nav-menu-${ menuIndex }`);

    if (navMenu.classList.contains('visible') === false) return;

    navMenu.classList.add('hidden');
    navMenu.classList.remove('visible');

    const navOptionEl = document.getElementById(`nav-option-${ menuIndex }`);

    pointChevronDown(navOptionEl.querySelector('.nav-chevron'));
}

function hideMobileMenuOnClickOutside(mobileNavEl) {
    const mobileMenu = document.getElementById('primary-nav');

    const outsideClickListener = (event) => {
        if (
            (event.target.id !== 'mobile-nav-header') &&
            (
                mobileMenu.contains(event.target) ||
                (isElementVisible(mobileMenu) === false)
            )
        ) return;

        const theHtmlElement = document.querySelector('html');
        theHtmlElement.style.overflow = 'auto';

        document.body.style.overflowY = 'auto';

        mobileNavEl.classList.remove('visible');

        hideAllNavMenus();

        removeClickListener();
    }

    const removeClickListener = () => {
        document.removeEventListener('mousedown', outsideClickListener);
    }

    document.addEventListener('mousedown', outsideClickListener);
}

// Only used for web click outside
function hideOnClickOutside(
    menuEl,
    menuIndex,
    removeEnterListenerCallback
) {

    const outsideClickListener = (event) => {
        if (
            menuEl.contains(event.target) ||
            (isElementVisible(menuEl) === false) ||
            menuEl.parentNode.contains(event.target)
        ) return;

        closeLoginMenu(
            menuIndex,
            removeEnterListenerCallback,
            menuEl.parentNode
        );

        removeClickListener();
    }

    const removeClickListener = () => {
        document.removeEventListener('mousedown', outsideClickListener);
    }

    document.addEventListener('mousedown', outsideClickListener);
}

function initializeStuff(event) {
    registerHideLoadingSpinnerOnUnload();

    mobileMenuSwipe.menuEl = document.getElementById('nav-and-menus');

    registerMenuListeners(toggleNavMenuUsingListener);
    setupMobileDeviceListener();

    injectBreadCrumb(constructBreadCrumb());
}

function injectBreadCrumb(breadCrumb) {
    const breadCrumbEl = document.getElementById('bread-crumb');

    if (breadCrumbEl === null) return;

    breadCrumbEl.innerHTML = breadCrumb;
}

function injectBreadCrumbIntoSPA(breadCrumb) {

    const breadCrumbEl = document.getElementById('host').shadowRoot.querySelector('#bread-crumb')

    if (breadCrumbEl === null) return;

    breadCrumbEl.innerHTML = breadCrumb;
}

function injectImageForMobileOrTablet(videoWrapperEl) {
    const videoEl = document.getElementById('index-main-video');

    if (videoEl !== null) {
        videoEl.remove();
    }

    const mobileOrTabletImageEl = document.createElement('img');
    mobileOrTabletImageEl.setAttribute(
        'src',
        '/content-assets/_globals/index-main-mobile-image.webp'
    );
    mobileOrTabletImageEl.setAttribute(
        'alt',
        'index-main-mobile-image.webp'
    );

    mobileOrTabletImageEl.id = 'index-main-image';

    videoWrapperEl.appendChild(mobileOrTabletImageEl);
}

function injectLoginForm(navMenuEl) {
    const tryingToOpenLoginMenu = navMenuEl.classList.contains('login');

    if (tryingToOpenLoginMenu === false) return;

    const injectionSiteEl = document.getElementById('login-form-injection-site');

    injectionSiteEl.innerHTML = getLoginForm();
}

function injectVideoForDesktop(videoWrapperEl) {
    const imageEl = document.getElementById('index-main-image');

    if (imageEl !== null) {
        imageEl.remove();
    }

    const videoEl = document.createElement('iframe');
    videoEl.setAttribute('id', 'index-main-video');
    videoEl.setAttribute('src', 'https://player.vimeo.com/video/1094425076?autoplay=1&;badge=0&;autopause=0&;player_id=0&;app_id=58479&controls=0&loop=1');
    videoEl.setAttribute('frameborder', '0');
    videoEl.setAttribute('muted', true);
    videoEl.setAttribute('autoplay', true);
    videoEl.setAttribute('loop', true);

    videoEl.classList.add('main-video');

    videoWrapperEl.appendChild(videoEl);
}

function injectVideoOrImage() {
    const videoWrapperEl = document.getElementById('main-video-wrapper');

    if (videoWrapperEl === null) return;

    if (mobileOrTablet === true) {
        injectImageForMobileOrTablet(videoWrapperEl);
    }
    else {
        injectVideoForDesktop(videoWrapperEl);
    }
}

function isElementVisible(el) {
    const displayType = el.style.display;

    if (displayType.toLowerCase() === 'none') return false;
    else return true;
}

function listenForEnterPress() {
    const submitButtonEl = document.getElementById('login-submit');

    const enterPressListener = (event) => {
        if (event.key.toLowerCase() !== 'enter') return;

        event.preventDefault();

        submitButtonEl.click();
    }

    const removeEnterPressListener = () => {
        document.removeEventListener('keypress', enterPressListener);
    }

    document.addEventListener('keypress', enterPressListener);

    return removeEnterPressListener;
}

function pointChevronDown(chevronEl) {
    chevronEl.classList.add('nav-chevron-closed');
    chevronEl.classList.remove('nav-chevron-open');
}

function pointChevronUp(chevronEl) {
    chevronEl.classList.add('nav-chevron-open');
    chevronEl.classList.remove('nav-chevron-closed');
}

function redirectToUrl(url, newTab) {
    if (newTab === true) {
        window.open(url, '_blank').focus();
    } else {
        window.location.href = url;
    }

}

function redirectToExternalUrl(externalLink, newTab) {
    const thirdPartyModalEl = document.getElementById('third-party-modal');

    thirdPartyModalEl.classList.remove('hidden');

    document.body.style.overflow = 'hidden';

    const agreeButtonEl = thirdPartyModalEl.querySelector('.third-party-buttons .agree');
    const cancelButtonEl = thirdPartyModalEl.querySelector('.third-party-buttons .cancel');

    const agreeHandler = () => {
        thirdPartyModalEl.classList.add('hidden');
        document.body.style.overflow = 'auto';
        if (newTab === false) window.location.href = externalLink;
        else window.open(externalLink, '_blank').focus();

    };

    const cancelHandler = () => {
        thirdPartyModalEl.classList.add('hidden');

        agreeButtonEl.removeEventListener('click', agreeHandler);
        cancelButtonEl.removeEventListener('click', cancelHandler);

        document.body.style.overflow = 'auto';
    };

    const agreeListener = agreeButtonEl.addEventListener('click', agreeHandler);

    const cancelListener = cancelButtonEl.addEventListener('click', cancelHandler);

    genericHideOnClickOutside(cancelHandler, thirdPartyModalEl);
}

function registerHideLoadingSpinnerOnUnload() {
    const loadingSpinnerEl = document.getElementById('loading-spinner');

    window.addEventListener('beforeunload', () => {
        setTimeout(() => {
            loadingSpinnerEl.classList.add('hidden');
        }, 1000);
    });
}

function registerMenuListeners(touchToggleCallback) {
    for (let i = 1; i < 5; i++) {
        const specificNavMenuEl = document.getElementById(`nav-option-${ i }`);

        specificNavMenuEl.addEventListener('mousedown', touchToggleCallback);
        document.addEventListener('mousedown', clickOutsideOfNavMenusHandler);
    }
}

function registerMenuSwipe() {
    window.addEventListener(
        'touchstart',
        mobileMenuSwipe.touchStartHandler
    );

    window.addEventListener(
        'touchmove',
        mobileMenuSwipe.touchMoveHandler,
        { passive: false }
    );

    window.addEventListener(
        'touchend',
        mobileMenuSwipe.touchEndHandler,
        { passive: false }
    );
}

function setNavElActive(el) {
    el.classList.add('background-dark-blue');
    el.classList.add('color-white');
    el.classList.remove('background-white');
    el.classList.remove('color-black');
    el.classList.add('visible');
}

function setupLoginMenu(menuIndex, menuEl) {
    const removeEnterListenerCallback = listenForEnterPress();

    hideOnClickOutside(
        menuEl,
        menuIndex,
        removeEnterListenerCallback
    );
}

function showNavMenu(menuIndex) {
    const navMenuEl = document.getElementById(`primary-nav-menu-${ menuIndex }`);

    if (navMenuEl.classList.contains('hidden') === false) return;

    navMenuEl.classList.remove('hidden');
    // .visible toggles the slide in transition for mobile
    navMenuEl.classList.add('visible');

    // Special case for login menu
    if (navMenuEl.parentNode.id !== 'nav-wrapper-login') return;

    setupLoginMenu(menuIndex, navMenuEl);
}

function setupMobileDeviceListener() {
    document.removeEventListener('DOMContentLoaded', initializeStuff);

    const mediaQueryListMobile = window.matchMedia('(max-width: 600px)');
    const mediaQueryListMobileOrTablet = window.matchMedia('(max-width: 900px)');

    // Runs initial check on page load
    checkIfMobileDevice(mediaQueryListMobile, mediaQueryListMobileOrTablet);

    injectVideoOrImage();

    showProviderBanner();

    // Only triggers when the width of the viewport passes 600px
    // in either direction
    mediaQueryListMobile.addEventListener('change', () => {
        hideAllNavMenus();
        checkIfMobileDevice(mediaQueryListMobile, mediaQueryListMobileOrTablet);
        document.getElementById('nav-and-menus').classList.remove('visible');
        document.body.style.overflowY = 'auto';
    });

    mediaQueryListMobileOrTablet.addEventListener('change', () => {
        checkIfMobileDevice(mediaQueryListMobile, mediaQueryListMobileOrTablet);
        injectVideoOrImage();
    });
}

function showProviderBanner() {
    const providerBanner = document.getElementById('provider-info-banner');

    if (providerBanner === null) return;

    if (mobileOrTablet === true && window.location.pathname.includes("/im-a-provider/")) {
        providerBanner.classList.remove('hidden');
        return;
    }
}

function toggleBenefitDropdown(el) {
    const benefitBodyEl = el.parentNode.querySelector('.benefit-body');

    if (benefitBodyEl.classList.contains('hidden')) {
        benefitBodyEl.classList.remove('hidden');
        el.classList.add('open');
        el.classList.remove('closed');
    }
    else {
        benefitBodyEl.classList.add('hidden');
        el.classList.add('closed');
        el.classList.remove('open');
    }
}

function toggleMobileNav() {
    const mobileNavEl = document.getElementById('nav-and-menus');

    const theHtmlElement = document.querySelector('html');

    if (mobileNavEl.classList.contains('visible')) {
        theHtmlElement.style.overflow = 'auto';
        document.body.style.overflowY = 'auto';
        mobileNavEl.classList.remove('visible');
        unRegisterMenuSwipe();
    } else {
        hideMobileMenuOnClickOutside(mobileNavEl);
        theHtmlElement.style.overflow = 'hidden';
        document.body.style.overflowY = 'hidden';
        mobileNavEl.classList.add('visible');
        registerMenuSwipe();
    }
}

function toggleNavMenuUsingListener(event) {
    event.preventDefault();

    const targetId = event.target.id;

    const menuIndex = targetId[targetId.length - 1];

    const navMenuEl = document.getElementById(`primary-nav-menu-${ menuIndex }`);

    injectLoginForm(navMenuEl);

    toggleNavMenu(menuIndex, navMenuEl);
}

function toggleNavMenu(menuIndex, navMenuEl) {
    const buttonEl = document.getElementById(`nav-option-${ menuIndex }`);

    if (navMenuEl.classList.contains('visible')) {
        closeNavMenu(menuIndex);
        return;
    }

    hideAllNavMenus();
    pointChevronUp(buttonEl.querySelector('.nav-chevron'));
    setNavElActive(document.getElementById(`nav-option-${ menuIndex }`));
    showNavMenu(menuIndex);
}

function unRegisterMenuSwipe() {
    window.removeEventListener('touchstart', mobileMenuSwipe.touchStartHandler);
    window.removeEventListener('touchmove', mobileMenuSwipe.touchMoveHandler);
    window.removeEventListener('touchend', mobileMenuSwipe.touchEndHandler);
}

function unSetNavElActive(el) {
    if (el === null) return;

    el.classList.add('background-white');
    el.classList.add('color-black');
    el.classList.remove('background-dark-blue');
    el.classList.remove('color-white');
}

function verifyObjectLoaded(objectEl) {
    return objectEl.offsetHeight !== 5;
}

document.addEventListener("DOMContentLoaded", initializeStuff);
