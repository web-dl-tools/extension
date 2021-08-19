const DOWNLOAD_CONTEXT_MENU_ID = 'download';
const WEBSITE_URL_STORAGE_ID = 'website_url';

/**
 * Get a property from the Chrome storage.
 *
 * @param key
 * @param cb
 * @returns {*}
 */
const getStorageValue = (key, cb) => chrome.storage.sync.get(key, cb);

/**
 * Handle the context menu click events.
 *
 * @param info
 */
const onDownloadContextMenuClick = (info) => {
    switch (info.menuItemId) {
        case DOWNLOAD_CONTEXT_MENU_ID:
            getStorageValue(WEBSITE_URL_STORAGE_ID, (data) => {
                chrome.tabs.create({
                    url: `${data[WEBSITE_URL_STORAGE_ID]}/requests/create?url=${info.linkUrl || info.pageUrl}`
                });
            })
            break;
    }
};

/**
 * Register the context menu and listener.
 */
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: DOWNLOAD_CONTEXT_MENU_ID,
        title: 'Download in Web DL',
        contexts: ['page', 'link'],
    });
    chrome.contextMenus.onClicked.addListener(onDownloadContextMenuClick);
});
