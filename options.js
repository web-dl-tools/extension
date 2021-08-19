const UPDATE_WEBSITE_URL_BUTTON_ID = 'update_website_url';
const WEBSITE_URL_INPUT_ID = 'website_url';
const WEBSITE_URL_STORAGE_ID = 'website_url';

/**
 * Get an element from the document.
 *
 * @param id
 * @returns {HTMLElement}
 */
const getElement = (id) => document.getElementById(id);

/**
 * Get a property from the Chrome storage.
 *
 * @param key
 * @param cb
 * @returns {*}
 */
const getStorageValue = (key, cb) => chrome.storage.sync.get(key, cb);

/**
 * Set a property in the Chrome storage.
 *
 * @param key
 * @param value
 */
const setStorageValue = (key, value) => {
    const set = {};
    set[key] = value;
    chrome.storage.sync.set(set);
};

/**
 * Persist the website url.
 */
const onUpdateWebsiteUrlButtonClick = () =>
    setStorageValue(WEBSITE_URL_STORAGE_ID, getElement(WEBSITE_URL_INPUT_ID).value);


/**
 * Initialize the options page.
 */
const constructOptions = () =>
    getStorageValue(WEBSITE_URL_STORAGE_ID, (data) => {
        getElement(WEBSITE_URL_INPUT_ID).value = data[WEBSITE_URL_STORAGE_ID];
        getElement(UPDATE_WEBSITE_URL_BUTTON_ID).addEventListener("click", onUpdateWebsiteUrlButtonClick);
    });

constructOptions();
