// Lightweight no-op Firebase shim to remove dependency on the Firebase SDK.
// Exports the same function names used across the codebase but implements
// simple localStorage-backed stubs so the app doesn't crash when Firebase
// is intentionally removed.

export const auth: null = null;

export type User = { uid?: string; email?: string; displayName?: string } | null;

export const ADMIN_EMAILS: string[] = [];

export const checkIsAdmin = (_user: User): boolean => false;

export const logoutUser = async () => {
  return true;
};

// Basic interfaces preserved for typing
export interface SavedQuote {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  serviceType: string;
  budget: string;
  timeline: string;
  selectedAddons: string[];
  totalEstimate: number;
  status: string;
  createdAt: string;
}

export interface SavedLocation {
  id?: string;
  userId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  notes?: string;
  createdAt: string;
}

export interface SavedRoute {
  id?: string;
  userId: string;
  title: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  createdAt: string;
}

const storageKey = (k: string) => `visiontechna:${k}`;

const readList = <T,>(key: string): T[] => {
  try {
    const raw = localStorage.getItem(storageKey(key));
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch (e) {
    return [];
  }
};

const writeList = <T,>(key: string, list: T[]) => {
  try {
    localStorage.setItem(storageKey(key), JSON.stringify(list));
  } catch (e) {
    // ignore
  }
};

export const saveQuoteToFirestore = async (quote: Omit<SavedQuote, 'id' | 'createdAt'>) => {
  const list = readList<SavedQuote>('quotes');
  const id = `q_${Date.now()}`;
  const saved: SavedQuote = { id, ...quote, createdAt: new Date().toISOString() } as SavedQuote;
  list.unshift(saved);
  writeList('quotes', list);
  return id;
};

export const getUserQuotesFromFirestore = async (userId: string): Promise<SavedQuote[]> => {
  const list = readList<SavedQuote>('quotes');
  return list.filter(q => q.userId === userId);
};

export const getAllQuotesFromFirestore = async (): Promise<SavedQuote[]> => {
  const list = readList<SavedQuote>('quotes');
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const updateQuoteStatusInFirestore = async (quoteId: string, status: string): Promise<boolean> => {
  const list = readList<SavedQuote>('quotes');
  const idx = list.findIndex(q => q.id === quoteId);
  if (idx === -1) return false;
  list[idx].status = status;
  writeList('quotes', list);
  return true;
};

export const deleteQuoteFromFirestore = async (quoteId: string): Promise<boolean> => {
  let list = readList<SavedQuote>('quotes');
  const before = list.length;
  list = list.filter(q => q.id !== quoteId);
  writeList('quotes', list);
  return list.length !== before;
};

export const saveLocationToFirestore = async (location: Omit<SavedLocation, 'id' | 'createdAt'>) => {
  const list = readList<SavedLocation>('saved_locations');
  const id = `loc_${Date.now()}`;
  const saved: SavedLocation = { id, ...location, createdAt: new Date().toISOString() } as SavedLocation;
  list.unshift(saved);
  writeList('saved_locations', list);
  return id;
};

export const getUserLocationsFromFirestore = async (userId: string): Promise<SavedLocation[]> => {
  const list = readList<SavedLocation>('saved_locations');
  return list.filter(l => l.userId === userId);
};

export const saveRouteToFirestore = async (route: Omit<SavedRoute, 'id' | 'createdAt'>) => {
  const list = readList<SavedRoute>('saved_routes');
  const id = `r_${Date.now()}`;
  const saved: SavedRoute = { id, ...route, createdAt: new Date().toISOString() } as SavedRoute;
  list.unshift(saved);
  writeList('saved_routes', list);
  return id;
};

export const getUserRoutesFromFirestore = async (userId: string): Promise<SavedRoute[]> => {
  const list = readList<SavedRoute>('saved_routes');
  return list.filter(r => r.userId === userId);
};

export const onAuthStateChanged = (_auth: any, cb: (user: User) => void) => {
  // Immediately call back with null (no user) and return noop unsubscribe
  setTimeout(() => cb(null), 0);
  return () => {};
};

export default {};
