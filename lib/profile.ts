import * as SecureStore from 'expo-secure-store';

// This is the on-device cache of "who is this farmer" -- separate from
// deviceId.ts (which is just the anonymous UUID). Once a farmer registers,
// we keep a copy of their profile here so:
//   1) the app knows NOT to ask them to register again on next launch
//   2) their name/location show up instantly, even offline, regardless of
//      which language they're currently viewing the app in
//
// The backend (via /api/farmers) is still the source of truth -- this is
// just a fast, offline-friendly local mirror of it.

const PROFILE_KEY = 'mera_maweshi_profile_cache';

export type CachedProfile = {
  name: string;
  phone?: string | null;
  province: string;
  district: string;
  tehsil: string;
};

let cached: CachedProfile | null = null;

export async function getLocalProfile(): Promise<CachedProfile | null> {
  if (cached) return cached;
  const raw = await SecureStore.getItemAsync(PROFILE_KEY);
  if (!raw) return null;
  try {
    cached = JSON.parse(raw) as CachedProfile;
    return cached;
  } catch {
    return null;
  }
}

export async function saveLocalProfile(profile: CachedProfile): Promise<void> {
  cached = profile;
  await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(profile));
}

/** Only used if you ever need to force re-registration (e.g. a "log out" / "switch farmer" option). */
export async function clearLocalProfile(): Promise<void> {
  cached = null;
  await SecureStore.deleteItemAsync(PROFILE_KEY);
}
