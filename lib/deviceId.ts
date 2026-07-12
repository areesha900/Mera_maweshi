import * as SecureStore from 'expo-secure-store';

// This is the app's entire "account" concept -- see AGENTS/README notes.
// No login, no phone verification. A UUID is generated once on first
// launch and stored on-device; every farmer profile / diagnosis record on
// the backend is keyed off this value. It's a convenience identifier, not
// a security boundary -- treat it accordingly (e.g. don't gate anything
// sensitive behind "the device_id matches").
const DEVICE_ID_KEY = 'mera_maweshi_device_id';

// Cache in memory so repeated calls within one app session don't keep
// hitting SecureStore.
let cachedDeviceId: string | null = null;

function generateUuidV4(): string {
  // Good enough for a non-cryptographic, purely-identifying UUID -- avoids
  // pulling in expo-crypto just for this. Standard RFC 4122 v4 shape.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Returns this device's persistent identifier, creating and storing one
 * the first time it's called on a fresh install.
 */
export async function getDeviceId(): Promise<string> {
  if (cachedDeviceId) return cachedDeviceId;

  const existing = await SecureStore.getItemAsync(DEVICE_ID_KEY);
  if (existing) {
    cachedDeviceId = existing;
    return existing;
  }

  const fresh = generateUuidV4();
  await SecureStore.setItemAsync(DEVICE_ID_KEY, fresh);
  cachedDeviceId = fresh;
  return fresh;
}