import { useState } from 'react';
import { X, Clock, MapPin, User, Navigation, KeyRound, Info, Building2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CampusMap } from './CampusMap';

interface ClassDetailsProps {
  classInfo: {
    code: string;
    name: string;
    time: string;
    location: string;
    instructor: string;
    building: string;
    room: string;
    floor: string;
    idRequired: boolean;
    navigationNotes: string;
  };
  onClose: () => void;
  theme: any;
}

export function ClassDetails({ classInfo, onClose, theme }: ClassDetailsProps) {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return <CampusMap building={classInfo.building} onClose={() => setShowMap(false)} theme={theme} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" style={{ maxWidth: '430px', margin: '0 auto' }}>
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-auto animate-slide-up">
        {/* Header */}
        <div className={`sticky top-0 bg-gradient-to-r ${theme.header} text-white p-6 rounded-t-3xl`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Badge className="bg-white/20 text-white mb-2">{classInfo.code}</Badge>
              <h2 className="text-xl">{classInfo.name}</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Clock className="w-4 h-4" />
            {classInfo.time}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Instructor */}
          <Card className={`p-4 bg-gradient-to-br ${theme.accent2} ${theme.accent2Border}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-${theme.secondary.split('-')[1]}-400 rounded-full flex items-center justify-center`}>
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-gray-600">Instructor</div>
                <div className="text-sm">{classInfo.instructor}</div>
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className={`p-4 bg-gradient-to-br ${theme.accent1} ${theme.accent1Border}`}>
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 bg-${theme.primary.split('-')[1]}-400 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-600 mb-1">Location</div>
                <div className="text-sm mb-1">{classInfo.building}</div>
                <div className="text-xs text-gray-600">
                  {classInfo.floor} • Room {classInfo.room}
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation Guide */}
          <Card className={`p-4 border-2 ${theme.accent2Border} bg-gradient-to-br ${theme.accent2}`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 bg-${theme.secondary.split('-')[1]}-400 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Navigation Guide</div>
                <div className="text-xs text-gray-600 leading-relaxed">
                  {classInfo.navigationNotes}
                </div>
              </div>
            </div>

            {/* ID Required Badge */}
            <div className={`flex items-center gap-2 p-3 rounded-lg ${classInfo.idRequired ? 'bg-amber-100 border border-amber-300' : 'bg-green-100 border border-green-300'}`}>
              <KeyRound className={`w-4 h-4 ${classInfo.idRequired ? 'text-amber-600' : 'text-green-600'}`} />
              <div className="flex-1">
                <div className="text-xs">
                  {classInfo.idRequired ? (
                    <span className="text-amber-700">
                      <span>Student ID Required</span>
                    </span>
                  ) : (
                    <span className="text-green-700">No ID Required for Entry</span>
                  )}
                </div>
              </div>
              {classInfo.idRequired && (
                <Info className="w-4 h-4 text-amber-600" />
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button 
              variant="outline" 
              className={`${theme.primaryBorder} ${theme.primaryText} hover:bg-${theme.primary.split('-')[1]}-50`}
              onClick={() => setShowMap(true)}
            >
              <MapPin className="w-4 h-4 mr-2" />
              View Map
            </Button>
            <Button 
              className={`bg-gradient-to-r ${theme.secondary} text-white hover:${theme.secondaryHover}`}
              onClick={() => setShowMap(true)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
