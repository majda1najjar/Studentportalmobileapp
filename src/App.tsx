import { useState } from 'react';
import { ClassSchedule } from './components/ClassSchedule';
import { FeesSection } from './components/FeesSection';
import { ClassSearch } from './components/ClassSearch';
import { Notifications } from './components/Notifications';
import { DegreeProgress } from './components/DegreeProgress';
import { ProfileMenu, ColorTheme, getThemeClasses } from './components/ProfileMenu';
import { Bell, User, Search } from 'lucide-react';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

type Course = {
  code: string;
  name: string;
  credits: number;
  schedule: string;
  timeSlots: string[];
  instructor: string;
  seats: number;
  description: string;
  prerequisites?: string;
};

type RegisteredCourse = Course & {
  semester: string;
};

export default function App() {
  const [showClassSearch, setShowClassSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('purple-green');
  const [registeredCourses, setRegisteredCourses] = useState<RegisteredCourse[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress'>('overview');

  const theme = getThemeClasses(colorTheme);

  const handleRegister = (courses: Course[], semester: string) => {
    const coursesWithSemester = courses.map(course => ({ ...course, semester }));
    setRegisteredCourses([...registeredCourses, ...coursesWithSemester]);
    // Show success message
    alert(`Successfully registered for ${courses.length} course(s) in ${semester}!`);
  };

  const handleQuickRegister = (course: any, semester: string) => {
    // Create a minimal course object for registration
    const newCourse: RegisteredCourse = {
      code: course.code,
      name: course.name,
      credits: course.credits,
      schedule: 'TBD',
      timeSlots: [],
      instructor: 'TBD',
      seats: 0,
      description: '',
      semester: semester
    };
    setRegisteredCourses([...registeredCourses, newCourse]);
    alert(`Successfully registered for ${course.name} in ${semester}!`);
  };

  const handleQuickAdd = () => {
    // Open class search when quick add is clicked from degree progress
    setShowClassSearch(true);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${colorTheme === 'dark-mode' ? 'text-gray-100' : ''}`} style={{ maxWidth: '430px', margin: '0 auto' }}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.header} text-white p-6 pb-8`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ProfileMenu currentTheme={colorTheme} onThemeChange={setColorTheme}>
              <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <User className="w-6 h-6" />
              </button>
            </ProfileMenu>
            <div>
              <div className="opacity-90">Welcome back,</div>
              <div>Sarah Johnson</div>
            </div>
          </div>
          <button 
            onClick={() => setShowNotifications(true)}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative hover:bg-white/30 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <div className={`absolute top-1 right-1 w-2 h-2 ${theme.notificationDot} rounded-full`}></div>
          </button>
        </div>
        
        <div className="text-sm opacity-90">Student ID: 2024-8756</div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4 pb-6 space-y-4">
        {/* Class Search Button */}
        <Button 
          onClick={() => setShowClassSearch(true)}
          className={`w-full h-14 bg-gradient-to-r ${theme.secondary} text-white hover:${theme.secondaryHover} shadow-md`}
        >
          <Search className="w-5 h-5 mr-2" />
          Search for Classes
        </Button>

        {/* Tabs for Schedule and Degree Progress */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'overview' | 'progress')} className="w-full">
          <TabsList className={`w-full grid grid-cols-2 ${colorTheme === 'dark-mode' ? 'bg-gray-800' : ''}`}>
            <TabsTrigger value="overview">Schedule & Fees</TabsTrigger>
            <TabsTrigger value="progress">Degree Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Fees Section */}
            <FeesSection theme={theme} isDarkMode={colorTheme === 'dark-mode'} />

            {/* Class Schedule */}
            <ClassSchedule theme={theme} registeredCourses={registeredCourses} isDarkMode={colorTheme === 'dark-mode'} />
          </TabsContent>

          <TabsContent value="progress" className="mt-4">
            <DegreeProgress 
              theme={theme} 
              registeredCourses={registeredCourses}
              onRegister={handleQuickRegister}
              isDarkMode={colorTheme === 'dark-mode'} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Class Search Modal */}
      {showClassSearch && (
        <ClassSearch 
          onClose={() => setShowClassSearch(false)} 
          onRegister={handleRegister}
          currentSchedule={registeredCourses}
          theme={theme}
          isDarkMode={colorTheme === 'dark-mode'}
        />
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}