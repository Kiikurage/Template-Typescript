import { UserSettings } from '../model/UserSettings';
import { AbstractStore } from './AbstractStore';
import { Store } from './Store';

const LOCAL_STORAGE_KEY = 'LocalStorageUserSettingsStore';

export const UserSettingsStore: Store<UserSettings> = new (class extends AbstractStore<UserSettings> {
    constructor() {
        let initialState: UserSettings;
        try {
            initialState = {
                ...UserSettings.Default,
                ...(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? '{}') as Record<string, unknown>),
            };
        } catch {
            initialState = UserSettings.Default;
        }
        super(initialState);

        this.onChange.addListener((state) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state)));
    }
})();
