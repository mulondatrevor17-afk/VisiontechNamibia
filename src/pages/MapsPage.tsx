import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Route, Bookmark, Compass, Phone, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import { auth, onAuthStateChanged, User, saveLocationToFirestore, saveRouteToFirestore } from '../lib/firebase';
import { api, Place, CalculatedRoute } from '../services/api';

export const MapsPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  // Route calculation state
  const [originInput, setOriginInput] = useState('Hosea Kutako International Airport');
  const [destInput, setDestInput] = useState('VisionTech Namibia HQ');
  const [calculatedRoute, setCalculatedRoute] = useState<CalculatedRoute | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  // Saved notification state
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchPlaces = async (q: string = '') => {
    setLoadingPlaces(true);
    try {
      const data = await api.searchPlaces(q);
      setPlaces(data.places || []);
      if (data.places?.length && !selectedPlace) {
        setSelectedPlace(data.places[0]);
      }
    } catch (err) {
      console.error('Error fetching places:', err);
    } finally {
      setLoadingPlaces(false);
    }
  };

  useEffect(() => {
    fetchPlaces('');
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPlaces(searchQuery);
  };

  const handleCalculateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originInput || !destInput) return;
    setLoadingRoute(true);
    try {
      const data = await api.calculateRoute(originInput, destInput);
      if (data.route) {
        setCalculatedRoute(data.route);
      }
    } catch (err) {
      console.error('Error calculating route:', err);
    } finally {
      setLoadingRoute(false);
    }
  };

  const handleSavePlace = async (place: Place) => {
    if (!currentUser) {
      setSavedNotice('Please sign in with Google in the top bar or account tab to save places!');
      setTimeout(() => setSavedNotice(null), 4000);
      return;
    }
    try {
      await saveLocationToFirestore({
        userId: currentUser.uid,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        category: place.category,
        notes: place.description
      });
      setSavedNotice(`Saved "${place.name}" to your Firestore account!`);
      setTimeout(() => setSavedNotice(null), 4000);
    } catch (err) {
      console.error('Error saving location:', err);
    }
  };

  const handleSaveRoute = async () => {
    if (!calculatedRoute) return;
    if (!currentUser) {
      setSavedNotice('Please sign in with Google to save routes!');
      setTimeout(() => setSavedNotice(null), 4000);
      return;
    }
    try {
      await saveRouteToFirestore({
        userId: currentUser.uid,
        title: calculatedRoute.title,
        origin: calculatedRoute.origin,
        destination: calculatedRoute.destination,
        distance: calculatedRoute.distance,
        duration: calculatedRoute.duration
      });
      setSavedNotice(`Saved route "${calculatedRoute.title}" to Firestore!`);
      setTimeout(() => setSavedNotice(null), 4000);
    } catch (err) {
      console.error('Error saving route:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest">
          <MapPin className="h-3.5 w-3.5 text-[#E94E33]" />
          <span>Google Maps & Location Intelligence Agent</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-artistic text-[#1A1A1A]">
          VisionMap <span className="text-[#E94E33]">Route & Places Agent</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
          Explore real-time locations in Windhoek, Namibia, compute driving/transit route directions, and save bookmarks directly to your Firestore database.
        </p>
      </div>

      {savedNotice && (
        <div className="p-4 bg-[#1A1A1A] text-white text-xs font-bold flex items-center justify-between border-2 border-[#E94E33] shadow-md animate-fade-in">
          <span className="flex items-center gap-2">
            <Check className="h-4 w-4 text-[#E94E33]" />
            {savedNotice}
          </span>
          <button onClick={() => setSavedNotice(null)} className="text-[#E94E33] text-xs underline">Dismiss</button>
        </div>
      )}

      {/* Main Grid: Left Map & Places List | Right Route Agent & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Map & Places List (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Places Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places in Windhoek or tech hubs..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1A1A1A] text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#E94E33]"
              />
            </div>
            <button
              type="submit"
              className="artistic-btn flex items-center gap-2 text-xs uppercase font-bold tracking-wider shrink-0"
            >
              Search
            </button>
          </form>

          {/* Map Display Frame */}
          <div className="artistic-card p-4 relative overflow-hidden bg-[#FAF9F6] border-2 border-[#1A1A1A]">
            <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#E94E33]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Interactive Windhoek Coordinate Stage</span>
              </div>
              <span className="text-[10px] font-bold text-[#E94E33] bg-white px-2 py-0.5 border border-[#1A1A1A]">
                GPS: -22.5609, 17.0836
              </span>
            </div>

            {/* Embedded Stylized Map Visualization */}
            <div className="relative h-72 sm:h-80 w-full bg-[#e8e6df] border border-[#1A1A1A] overflow-hidden flex flex-col justify-between p-4">
              {/* Map grid lines aesthetic */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0001_1px,transparent_1px),linear-gradient(to_bottom,#0001_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

              {/* Map Pins overlay */}
              <div className="relative z-10 flex flex-wrap gap-2">
                {places.map((place) => {
                  const isSelected = selectedPlace?.id === place.id;
                  return (
                    <button
                      key={place.id}
                      onClick={() => setSelectedPlace(place)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm ${
                        isSelected
                          ? 'bg-[#E94E33] text-white border-2 border-[#1A1A1A] scale-105'
                          : 'bg-white text-[#1A1A1A] border border-[#1A1A1A] hover:bg-gray-100'
                      }`}
                    >
                      <MapPin className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-[#E94E33]'}`} />
                      {place.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>

              {/* Selected Place Overlay Card */}
              {selectedPlace && (
                <div className="relative z-10 bg-white border-2 border-[#1A1A1A] p-4 shadow-[4px_4px_0px_#1A1A1A]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-[#E94E33] tracking-widest">{selectedPlace.category}</span>
                      <h3 className="text-base font-serif-artistic text-[#1A1A1A]">{selectedPlace.name}</h3>
                      <p className="text-xs text-gray-700 mt-0.5">{selectedPlace.address}</p>
                    </div>
                    <button
                      onClick={() => handleSavePlace(selectedPlace)}
                      className="p-2 bg-[#1A1A1A] text-white hover:bg-[#E94E33] transition-colors"
                      title="Save to Firestore"
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Places Cards List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-lg font-serif-artistic text-[#1A1A1A]">Key Locations ({places.length})</h2>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Click to view on map</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {places.map((place) => (
                <div
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`cursor-pointer p-4 border transition-all flex flex-col justify-between ${
                    selectedPlace?.id === place.id
                      ? 'bg-white border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]'
                      : 'bg-white border-gray-300 hover:border-[#1A1A1A]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#E94E33] bg-[#FAF9F6] px-2 py-0.5 border border-gray-300">
                        {place.category}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#1A1A1A]">
                        <Star className="h-3 w-3 fill-[#E94E33] text-[#E94E33]" />
                        {place.rating}
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{place.name}</h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{place.description}</p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-gray-500">{place.phone}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDestInput(place.name);
                      }}
                      className="text-[10px] font-bold uppercase text-[#E94E33] hover:underline flex items-center gap-1"
                    >
                      Route Here <Navigation className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Route & Directions Calculator (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="artistic-card p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
              <Route className="h-5 w-5 text-[#E94E33]" />
              <div>
                <h2 className="text-xl font-serif-artistic text-[#1A1A1A]">Route & Directions Calculator</h2>
                <p className="text-xs text-gray-600">Compute live distance, travel time, and navigation steps.</p>
              </div>
            </div>

            <form onSubmit={handleCalculateRoute} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">Origin Point</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#E94E33]" />
                  <input
                    type="text"
                    required
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                    placeholder="e.g. Hosea Kutako Airport"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">Destination Point</label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1A1A1A]" />
                  <input
                    type="text"
                    required
                    value={destInput}
                    onChange={(e) => setDestInput(e.target.value)}
                    placeholder="e.g. VisionTech HQ Windhoek"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loadingRoute}
                className="artistic-btn w-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
              >
                {loadingRoute ? 'Calculating Directions...' : 'Calculate Route Directions'}
              </button>
            </form>

            {calculatedRoute && (
              <div className="p-4 bg-[#FAF9F6] border border-[#1A1A1A] space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#E94E33] tracking-wider">Calculated Route</span>
                    <h4 className="text-sm font-bold text-[#1A1A1A]">{calculatedRoute.title}</h4>
                  </div>
                  <button
                    onClick={handleSaveRoute}
                    className="px-2.5 py-1 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#E94E33] flex items-center gap-1"
                  >
                    <Bookmark className="h-3 w-3" /> Save Route
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 bg-white border border-gray-200">
                    <span className="text-[9px] uppercase text-gray-500 font-bold block">Distance</span>
                    <span className="text-lg font-light text-[#1A1A1A]">{calculatedRoute.distance}</span>
                  </div>
                  <div className="p-2 bg-white border border-gray-200">
                    <span className="text-[9px] uppercase text-gray-500 font-bold block">Est. Duration</span>
                    <span className="text-lg font-light text-[#E94E33]">{calculatedRoute.duration}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block">Turn-by-Turn Navigation</span>
                  <ul className="space-y-1 text-xs text-gray-800 list-decimal list-inside">
                    {calculatedRoute.steps.map((step, idx) => (
                      <li key={idx} className="bg-white p-2 border border-gray-200">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="p-5 bg-white border border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E94E33]">
              <Sparkles className="h-4 w-4" /> VisionTech Airport & Studio Pickup
            </div>
            <p className="text-xs text-gray-700 leading-relaxed font-sans">
              Visiting VisionTech Studio in Windhoek for an architecture workshop? We provide direct shuttle transport from Hosea Kutako Airport (WDH) to central Windhoek.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
