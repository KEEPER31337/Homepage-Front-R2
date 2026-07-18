import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const RECOIL_PERSIST_STORAGE_KEY = 'recoil-persist';

const readPersistedState = (): Record<string, unknown> => {
  if (typeof window === 'undefined') return {};

  try {
    return JSON.parse(window.localStorage.getItem(RECOIL_PERSIST_STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
};

const recoilCompatibleStringStorage = {
  getItem: (key: string) => {
    const value = readPersistedState()[key];
    return value === undefined ? null : JSON.stringify(value);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;

    const persistedState = readPersistedState();
    if (value === undefined) {
      delete persistedState[key];
    } else {
      persistedState[key] = JSON.parse(value);
    }
    window.localStorage.setItem(RECOIL_PERSIST_STORAGE_KEY, JSON.stringify(persistedState));
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;

    const persistedState = readPersistedState();
    delete persistedState[key];
    window.localStorage.setItem(RECOIL_PERSIST_STORAGE_KEY, JSON.stringify(persistedState));
  },
};

const atomWithRecoilPersist = <Value>(key: string, initialValue: Value) =>
  atomWithStorage(
    key,
    initialValue,
    createJSONStorage<Value>(() => recoilCompatibleStringStorage),
    {
      getOnInit: true,
    },
  );

export default atomWithRecoilPersist;
