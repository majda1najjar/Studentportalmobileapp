import { X, Navigation, MapPin } from 'lucide-react';
import { Button } from './ui/button';

interface CampusMapProps {
  onClose: () => void;
  building?: string;
  theme: any;
}

export function CampusMap({ onClose, building, theme }: CampusMapProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col" style={{ maxWidth: '430px', margin: '0 auto' }}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.secondary} text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5" />
          <div>
            <h2>Campus Map</h2>
            {building && <div className="text-xs opacity-90">Navigate to {building}</div>}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Map Content */}
      <div className={`flex-1 p-4 bg-gradient-to-br ${theme.accent2} overflow-auto`}>
        <div className="bg-white rounded-lg p-4 shadow-md">
          {/* Campus Map SVG */}
          <svg viewBox="0 0 400 500" className="w-full h-auto">
            {/* Background */}
            <rect width="400" height="500" fill="#e8f5e9" />
            
            {/* Paths/Roads */}
            <path d="M 0 200 L 400 200" stroke="#9e9e9e" strokeWidth="8" fill="none" />
            <path d="M 200 0 L 200 500" stroke="#9e9e9e" strokeWidth="8" fill="none" />
            <path d="M 0 350 L 400 350" stroke="#9e9e9e" strokeWidth="6" fill="none" />
            
            {/* Green spaces */}
            <rect x="20" y="20" width="150" height="150" fill="#81c784" rx="5" />
            <text x="95" y="100" textAnchor="middle" fontSize="12" fill="#2e7d32">Campus Green</text>
            
            {/* Buildings */}
            
            {/* Science Building */}
            <rect 
              x="220" 
              y="30" 
              width="150" 
              height="140" 
              fill={building === 'Science Building' ? '#9c27b0' : '#5c6bc0'} 
              stroke={building === 'Science Building' ? '#7b1fa2' : '#3f51b5'} 
              strokeWidth="3"
              rx="5"
            />
            <text x="295" y="90" textAnchor="middle" fontSize="14" fill="white">Science</text>
            <text x="295" y="110" textAnchor="middle" fontSize="14" fill="white">Building</text>
            {building === 'Science Building' && (
              <>
                <circle cx="295" cy="50" r="15" fill="#ff6f00" />
                <text x="295" y="55" textAnchor="middle" fontSize="16" fill="white">📍</text>
              </>
            )}
            
            {/* Technology Center */}
            <rect 
              x="30" 
              y="230" 
              width="140" 
              height="100" 
              fill={building === 'Technology Center' ? '#9c27b0' : '#26a69a'} 
              stroke={building === 'Technology Center' ? '#7b1fa2' : '#00897b'} 
              strokeWidth="3"
              rx="5"
            />
            <text x="100" y="270" textAnchor="middle" fontSize="13" fill="white">Technology</text>
            <text x="100" y="290" textAnchor="middle" fontSize="13" fill="white">Center</text>
            {building === 'Technology Center' && (
              <>
                <circle cx="100" cy="245" r="15" fill="#ff6f00" />
                <text x="100" y="250" textAnchor="middle" fontSize="16" fill="white">📍</text>
              </>
            )}
            
            {/* Research Laboratory */}
            <rect 
              x="320" 
              y="220" 
              width="60" 
              height="100" 
              fill={building === 'Research Laboratory' ? '#9c27b0' : '#ef5350'} 
              stroke={building === 'Research Laboratory' ? '#7b1fa2' : '#d32f2f'} 
              strokeWidth="3"
              rx="5"
            />
            <text x="350" y="260" textAnchor="middle" fontSize="11" fill="white">Research</text>
            <text x="350" y="280" textAnchor="middle" fontSize="11" fill="white">Lab</text>
            {building === 'Research Laboratory' && (
              <>
                <circle cx="350" cy="235" r="12" fill="#ff6f00" />
                <text x="350" y="240" textAnchor="middle" fontSize="14" fill="white">📍</text>
              </>
            )}
            
            {/* Student Center */}
            <rect x="220" y="230" width="80" height="90" fill="#ffb74d" stroke="#f57c00" strokeWidth="3" rx="5" />
            <text x="260" y="270" textAnchor="middle" fontSize="12" fill="white">Student</text>
            <text x="260" y="290" textAnchor="middle" fontSize="12" fill="white">Center</text>
            
            {/* Library */}
            <rect x="30" y="380" width="130" height="100" fill="#7e57c2" stroke="#5e35b1" strokeWidth="3" rx="5" />
            <text x="95" y="425" textAnchor="middle" fontSize="14" fill="white">Library</text>
            
            {/* Cafeteria */}
            <rect x="180" y="380" width="100" height="100" fill="#66bb6a" stroke="#388e3c" strokeWidth="3" rx="5" />
            <text x="230" y="425" textAnchor="middle" fontSize="13" fill="white">Cafeteria</text>
            
            {/* Parking */}
            <rect x="300" y="380" width="80" height="100" fill="#78909c" stroke="#546e7a" strokeWidth="3" rx="5" />
            <text x="340" y="420" textAnchor="middle" fontSize="12" fill="white">Parking</text>
            <text x="340" y="440" textAnchor="middle" fontSize="12" fill="white">Lot A</text>
            
            {/* You are here marker */}
            <circle cx="230" cy="290" r="8" fill="#1976d2" />
            <circle cx="230" cy="290" r="12" fill="none" stroke="#1976d2" strokeWidth="2" opacity="0.5" />
          </svg>

          {/* Legend */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-xs mb-2">Legend:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span>Your Location</span>
              </div>
              {building && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span>Destination</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Info */}
        {building && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 bg-${theme.secondary.split('-')[1]}-100 rounded-full flex items-center justify-center`}>
                <MapPin className={`w-5 h-5 text-${theme.secondary.split('-')[1]}-600`} />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Walking Distance</div>
                <div className="text-xs text-gray-600">
                  {building === 'Science Building' && '~5 minutes from Student Center'}
                  {building === 'Technology Center' && '~3 minutes from Student Center'}
                  {building === 'Research Laboratory' && '~2 minutes from Science Building'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="p-4 bg-white border-t">
        <Button 
          onClick={onClose}
          className={`w-full bg-gradient-to-r ${theme.secondary} hover:${theme.secondaryHover}`}
        >
          Close Map
        </Button>
      </div>
    </div>
  );
}
