export const syncStatus = Object.freeze({
    SYNCED: 1,
    SYNC_FAILED: 0,
    SYNCING: 2,
})
export const checkStatus = Object.freeze({
    DONE: 1,
    IN_PROGRESS: 2,
    NOT_DONE: 0,
})
export default Object.freeze({
    LANDING: 0,
    AUTH: 1,
    PROFILE: 2,
    ADD_TODO: 3,
    EDIT_TODO: 4,
})
