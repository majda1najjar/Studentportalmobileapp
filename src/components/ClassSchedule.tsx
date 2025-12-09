import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, MapPin, Calendar, ChevronRight } from 'lucide-react';
import { ClassDetails } from './ClassDetails';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Course = {
  code: string;
  name: string;
  credits?: number;
  schedule: string;
  timeSlots?: string[];
  instructor: string;
  seats?: number;
  description?: string;
  prerequisites?: string;
  semester?: string;
};

const defaultSchedule = [
  {
    day: 'Monday',
    classes: [
      {
        code: 'BIO 301',
        name: 'Molecular Biology',
        time: '9:00 AM - 10:30 AM',
        location: 'Science Building 204',
        instructor: 'Dr. Martinez',
        building: 'Science Building',
        room: '204',
        floor: '2nd Floor',
        idRequired: true,
        navigationNotes: 'Enter through the main entrance on the east side. Take the elevator or stairs to the 2nd floor. Room 204 is on your left past the biology lab.'
      },
      {
        code: 'CS 250',
        name: 'Data Structures',
        time: '2:00 PM - 3:30 PM',
        location: 'Tech Center 115',
        instructor: 'Prof. Chen',
        building: 'Technology Center',
        room: '115',
        floor: '1st Floor',
        idRequired: false,
        navigationNotes: 'Located in the Technology Center main building. Enter through the west entrance. Room 115 is down the main hallway on the right, next to the computer lab.'
      }
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      {
        code: 'BIO 315',
        name: 'Genetics',
        time: '11:00 AM - 12:30 PM',
        location: 'Science Building 301',
        instructor: 'Dr. Williams',
        building: 'Science Building',
        room: '301',
        floor: '3rd Floor',
        idRequired: true,
        navigationNotes: 'Enter through the main entrance on the east side. Take the elevator to the 3rd floor. Turn right and room 301 is the second door on the left.'
      }
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      {
        code: 'BIO 301',
        name: 'Molecular Biology',
        time: '9:00 AM - 10:30 AM',
        location: 'Science Building 204',
        instructor: 'Dr. Martinez',
        building: 'Science Building',
        room: '204',
        floor: '2nd Floor',
        idRequired: true,
        navigationNotes: 'Enter through the main entrance on the east side. Take the elevator or stairs to the 2nd floor. Room 204 is on your left past the biology lab.'
      },
      {
        code: 'CS 250',
        name: 'Data Structures',
        time: '2:00 PM - 3:30 PM',
        location: 'Tech Center 115',
        instructor: 'Prof. Chen',
        building: 'Technology Center',
        room: '115',
        floor: '1st Floor',
        idRequired: false,
        navigationNotes: 'Located in the Technology Center main building. Enter through the west entrance. Room 115 is down the main hallway on the right, next to the computer lab.'
      }
    ]
  },
  {
    day: 'Thursday',
    classes: [
      {
        code: 'CS 310',
        name: 'Algorithms',
        time: '10:00 AM - 11:30 AM',
        location: 'Tech Center 220',
        instructor: 'Dr. Thompson',
        building: 'Technology Center',
        room: '220',
        floor: '2nd Floor',
        idRequired: false,
        navigationNotes: 'Technology Center, 2nd floor. Take the main staircase or elevator up. Room 220 is at the end of the hallway, large lecture hall with double doors.'
      }
    ]
  },
  {
    day: 'Friday',
    classes: [
      {
        code: 'BIO 315',
        name: 'Genetics Lab',
        time: '1:00 PM - 4:00 PM',
        location: 'Research Lab 102',
        instructor: 'Dr. Williams',
        building: 'Research Laboratory',
        room: '102',
        floor: '1st Floor',
        idRequired: true,
        navigationNotes: 'Research Lab building is behind the Science Building. Enter through the secure entrance (ID scan required). Lab 102 is immediately to your right after entering. Lab coats and safety goggles required.'
      }
    ]
  }
];

// Schedule data organized by semester
const scheduleData: Record<string, typeof defaultSchedule> = {
  'fall-2025': [
    {
      day: 'Monday',
      classes: [
        {
          code: 'BIO 201',
          name: 'Cell Biology',
          time: '9:00 AM - 10:30 AM',
          location: 'Science Building 105',
          instructor: 'Dr. Anderson',
          building: 'Science Building',
          room: '105',
          floor: '1st Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance on the east side. Room 105 is immediately on your right after entering.'
        },
        {
          code: 'CS 150',
          name: 'Intro to Programming',
          time: '1:00 PM - 2:30 PM',
          location: 'Tech Center 101',
          instructor: 'Prof. Davis',
          building: 'Technology Center',
          room: '101',
          floor: '1st Floor',
          idRequired: false,
          navigationNotes: 'Located in the Technology Center main building. Enter through the west entrance. Room 101 is the first room on the left.'
        }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        {
          code: 'BIO 220',
          name: 'Microbiology',
          time: '10:00 AM - 11:30 AM',
          location: 'Science Building 210',
          instructor: 'Dr. Lee',
          building: 'Science Building',
          room: '210',
          floor: '2nd Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance on the east side. Take the elevator to the 2nd floor. Room 210 is directly ahead.'
        }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        {
          code: 'BIO 201',
          name: 'Cell Biology',
          time: '9:00 AM - 10:30 AM',
          location: 'Science Building 105',
          instructor: 'Dr. Anderson',
          building: 'Science Building',
          room: '105',
          floor: '1st Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance on the east side. Room 105 is immediately on your right after entering.'
        },
        {
          code: 'CS 150',
          name: 'Intro to Programming',
          time: '1:00 PM - 2:30 PM',
          location: 'Tech Center 101',
          instructor: 'Prof. Davis',
          building: 'Technology Center',
          room: '101',
          floor: '1st Floor',
          idRequired: false,
          navigationNotes: 'Located in the Technology Center main building. Enter through the west entrance. Room 101 is the first room on the left.'
        }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        {
          code: 'CS 210',
          name: 'Object-Oriented Design',
          time: '2:00 PM - 3:30 PM',
          location: 'Tech Center 205',
          instructor: 'Dr. Kumar',
          building: 'Technology Center',
          room: '205',
          floor: '2nd Floor',
          idRequired: false,
          navigationNotes: 'Technology Center, 2nd floor. Take the main staircase or elevator up. Room 205 is in the middle of the hallway.'
        }
      ]
    },
    {
      day: 'Friday',
      classes: [
        {
          code: 'BIO 220',
          name: 'Microbiology Lab',
          time: '2:00 PM - 5:00 PM',
          location: 'Research Lab 108',
          instructor: 'Dr. Lee',
          building: 'Research Laboratory',
          room: '108',
          floor: '1st Floor',
          idRequired: true,
          navigationNotes: 'Research Lab building is behind the Science Building. Enter through the secure entrance (ID scan required). Lab 108 is down the hall on the left. Lab coats required.'
        }
      ]
    }
  ],
  'spring-2026': [
    {
      day: 'Monday',
      classes: [
        {
          code: 'BIO 301',
          name: 'Molecular Biology',
          time: '9:00 AM - 10:30 AM',
          location: 'Science Building 204',
          instructor: 'Dr. Martinez',
          building: 'Science Building',
          room: '204',
          floor: '2nd Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance on the east side. Take the elevator or stairs to the 2nd floor. Room 204 is on your left past the biology lab.'
        },
        {
          code: 'CS 250',
          name: 'Data Structures',
          time: '2:00 PM - 3:30 PM',
          location: 'Tech Center 115',
          instructor: 'Prof. Chen',
          building: 'Technology Center',
          room: '115',
          floor: '1st Floor',
          idRequired: false,
          navigationNotes: 'Located in the Technology Center main building. Enter through the west entrance. Room 115 is down the main hallway on the right, next to the computer lab.'
        }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        {
          code: 'BIO 315',
          name: 'Genetics',
          time: '11:00 AM - 12:30 PM',
          location: 'Science Building 301',
          instructor: 'Dr. Williams',
          building: 'Science Building',
          room: '301',
          floor: '3rd Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance on the east side. Take the elevator to the 3rd floor. Turn right and room 301 is the second door on the left.'
        }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        {
          code: 'BIO 301',
          name: 'Molecular Biology',
          time: '9:00 AM - 10:30 AM',
          location: 'Science Building 204',
          instructor: 'Dr. Martinez',
          building: 'Science Building',
          room: '204',
          floor: '2nd Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance on the east side. Take the elevator or stairs to the 2nd floor. Room 204 is on your left past the biology lab.'
        },
        {
          code: 'CS 250',
          name: 'Data Structures',
          time: '2:00 PM - 3:30 PM',
          location: 'Tech Center 115',
          instructor: 'Prof. Chen',
          building: 'Technology Center',
          room: '115',
          floor: '1st Floor',
          idRequired: false,
          navigationNotes: 'Located in the Technology Center main building. Enter through the west entrance. Room 115 is down the main hallway on the right, next to the computer lab.'
        }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        {
          code: 'CS 310',
          name: 'Algorithms',
          time: '10:00 AM - 11:30 AM',
          location: 'Tech Center 220',
          instructor: 'Dr. Thompson',
          building: 'Technology Center',
          room: '220',
          floor: '2nd Floor',
          idRequired: false,
          navigationNotes: 'Technology Center, 2nd floor. Take the main staircase or elevator up. Room 220 is at the end of the hallway, large lecture hall with double doors.'
        }
      ]
    },
    {
      day: 'Friday',
      classes: [
        {
          code: 'BIO 315',
          name: 'Genetics Lab',
          time: '1:00 PM - 4:00 PM',
          location: 'Research Lab 102',
          instructor: 'Dr. Williams',
          building: 'Research Laboratory',
          room: '102',
          floor: '1st Floor',
          idRequired: true,
          navigationNotes: 'Research Lab building is behind the Science Building. Enter through the secure entrance (ID scan required). Lab 102 is immediately to your right after entering. Lab coats and safety goggles required.'
        }
      ]
    }
  ],
  'summer-2026': [
    {
      day: 'Monday',
      classes: [
        {
          code: 'BIO 280',
          name: 'Field Biology',
          time: '8:00 AM - 11:00 AM',
          location: 'Outdoor Lab',
          instructor: 'Dr. Fields',
          building: 'Outdoor Research Facility',
          room: 'Field Station',
          floor: 'Ground Level',
          idRequired: true,
          navigationNotes: 'Meet at the Outdoor Research Facility behind the main campus. Bring field equipment and wear appropriate outdoor clothing.'
        }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        {
          code: 'CS 380',
          name: 'Summer Coding Intensive',
          time: '9:00 AM - 12:00 PM',
          location: 'Tech Center 120',
          instructor: 'Prof. Summer',
          building: 'Technology Center',
          room: '120',
          floor: '1st Floor',
          idRequired: false,
          navigationNotes: 'Technology Center, main floor. Room 120 is the large computer lab near the entrance.'
        }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        {
          code: 'BIO 280',
          name: 'Field Biology',
          time: '8:00 AM - 11:00 AM',
          location: 'Outdoor Lab',
          instructor: 'Dr. Fields',
          building: 'Outdoor Research Facility',
          room: 'Field Station',
          floor: 'Ground Level',
          idRequired: true,
          navigationNotes: 'Meet at the Outdoor Research Facility behind the main campus. Bring field equipment and wear appropriate outdoor clothing.'
        }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        {
          code: 'CS 380',
          name: 'Summer Coding Intensive',
          time: '9:00 AM - 12:00 PM',
          location: 'Tech Center 120',
          instructor: 'Prof. Summer',
          building: 'Technology Center',
          room: '120',
          floor: '1st Floor',
          idRequired: false,
          navigationNotes: 'Technology Center, main floor. Room 120 is the large computer lab near the entrance.'
        }
      ]
    },
    {
      day: 'Friday',
      classes: []
    }
  ],
  'fall-2026': [
    {
      day: 'Monday',
      classes: [
        {
          code: 'BIO 405',
          name: 'Neurobiology',
          time: '10:00 AM - 11:30 AM',
          location: 'Science Building 308',
          instructor: 'Dr. Brain',
          building: 'Science Building',
          room: '308',
          floor: '3rd Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance. Take the elevator to the 3rd floor. Room 308 is at the end of the hall.'
        }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        {
          code: 'CS 450',
          name: 'Artificial Intelligence',
          time: '2:00 PM - 3:30 PM',
          location: 'Tech Center 225',
          instructor: 'Dr. Park',
          building: 'Technology Center',
          room: '225',
          floor: '2nd Floor',
          idRequired: false,
          navigationNotes: 'Technology Center, 2nd floor. Room 225 is the AI/ML lab with glass walls.'
        }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        {
          code: 'BIO 405',
          name: 'Neurobiology',
          time: '10:00 AM - 11:30 AM',
          location: 'Science Building 308',
          instructor: 'Dr. Brain',
          building: 'Science Building',
          room: '308',
          floor: '3rd Floor',
          idRequired: true,
          navigationNotes: 'Enter through the main entrance. Take the elevator to the 3rd floor. Room 308 is at the end of the hall.'
        }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        {
          code: 'CS 450',
          name: 'Artificial Intelligence',
          time: '2:00 PM - 3:30 PM',
          location: 'Tech Center 225',
          instructor: 'Dr. Park',
          building: 'Technology Center',
          room: '225',
          floor: '2nd Floor',
          idRequired: false,
          navigationNotes: 'Technology Center, 2nd floor. Room 225 is the AI/ML lab with glass walls.'
        },
        {
          code: 'BIO 420',
          name: 'Ecology',
          time: '1:00 PM - 2:30 PM',
          location: 'Science Building 201',
          instructor: 'Dr. Brown',
          building: 'Science Building',
          room: '201',
          floor: '2nd Floor',
          idRequired: true,
          navigationNotes: 'Science Building, 2nd floor. Room 201 is near the main staircase.'
        }
      ]
    },
    {
      day: 'Friday',
      classes: [
        {
          code: 'BIO 420',
          name: 'Ecology Field Work',
          time: '1:00 PM - 4:00 PM',
          location: 'Nature Reserve',
          instructor: 'Dr. Brown',
          building: 'Campus Nature Reserve',
          room: 'Outdoor',
          floor: 'N/A',
          idRequired: true,
          navigationNotes: 'Meet at the Nature Reserve entrance near the south parking lot. Wear appropriate outdoor gear.'
        }
      ]
    }
  ],
  'spring-2027': [
    {
      day: 'Monday',
      classes: [
        {
          code: 'BIO 490',
          name: 'Research Methods in Biology',
          time: '1:00 PM - 5:00 PM',
          location: 'Research Lab 201',
          instructor: 'Dr. Research',
          building: 'Research Laboratory',
          room: '201',
          floor: '2nd Floor',
          idRequired: true,
          navigationNotes: 'Research Lab building, 2nd floor. Lab 201 is the advanced research facility. Lab coat and safety equipment required.'
        }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        {
          code: 'CS 490',
          name: 'Senior Capstone Project',
          time: '2:00 PM - 6:00 PM',
          location: 'Tech Center 301',
          instructor: 'Prof. Project',
          building: 'Technology Center',
          room: '301',
          floor: '3rd Floor',
          idRequired: false,
          navigationNotes: 'Technology Center, 3rd floor. Room 301 is the project workspace with team pods.'
        }
      ]
    },
    {
      day: 'Wednesday',
      classes: []
    },
    {
      day: 'Thursday',
      classes: [
        {
          code: 'BIO 450',
          name: 'Bioinformatics',
          time: '3:00 PM - 4:30 PM',
          location: 'Science Building 215',
          instructor: 'Dr. Data',
          building: 'Science Building',
          room: '215',
          floor: '2nd Floor',
          idRequired: true,
          navigationNotes: 'Science Building, 2nd floor. Room 215 is the computational biology lab.'
        }
      ]
    },
    {
      day: 'Friday',
      classes: [
        {
          code: 'BIO 490',
          name: 'Research Methods Lab',
          time: '1:00 PM - 5:00 PM',
          location: 'Research Lab 201',
          instructor: 'Dr. Research',
          building: 'Research Laboratory',
          room: '201',
          floor: '2nd Floor',
          idRequired: true,
          navigationNotes: 'Research Lab building, 2nd floor. Lab 201 is the advanced research facility. Lab coat and safety equipment required.'
        }
      ]
    }
  ]
};

// Helper function to normalize semester names
function normalizeSemester(semester: string): string {
  return semester.toLowerCase().replace(' ', '-');
}

// Helper function to parse course schedule into days and times
function parseSchedule(schedule: string): Array<{ day: string, time: string }> {
  // This is a simplified parser - in reality this would be more complex
  const result: Array<{ day: string, time: string }> = [];
  
  if (!schedule || schedule === 'TBD') {
    return result;
  }
  
  // Example: "MW 9:00 AM - 10:30 AM" or "TR 11:00 AM - 12:30 PM"
  const dayMap: Record<string, string> = {
    'M': 'Monday',
    'T': 'Tuesday',
    'W': 'Wednesday',
    'R': 'Thursday',
    'F': 'Friday'
  };
  
  const parts = schedule.split(' ');
  const dayPart = parts[0];
  const timePart = parts.slice(1).join(' ');
  
  for (const char of dayPart) {
    if (dayMap[char]) {
      result.push({
        day: dayMap[char],
        time: timePart || 'TBD'
      });
    }
  }
  
  return result;
}

interface ClassScheduleProps {
  theme: any;
  registeredCourses?: Course[];
  isDarkMode?: boolean;
}

export function ClassSchedule({ theme, registeredCourses = [], isDarkMode = false }: ClassScheduleProps) {
  const [selectedClass, setSelectedClass] = useState<typeof defaultSchedule[0]['classes'][0] | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string>('spring-2026');
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Get base schedule for selected semester
  const baseSchedule = scheduleData[selectedSemester] || defaultSchedule;
  
  // Filter registered courses for the selected semester
  const semesterRegisteredCourses = registeredCourses.filter(
    course => course.semester && normalizeSemester(course.semester) === selectedSemester
  );
  
  // Merge registered courses into the schedule
  const schedule = baseSchedule.map(daySchedule => {
    const dayClasses = [...daySchedule.classes];
    
    // Add registered courses to appropriate days
    semesterRegisteredCourses.forEach(course => {
      const scheduleDays = parseSchedule(course.schedule);
      scheduleDays.forEach(({ day, time }) => {
        if (day === daySchedule.day) {
          // Check if this course is already in the schedule
          const alreadyExists = dayClasses.some(c => c.code === course.code);
          if (!alreadyExists) {
            dayClasses.push({
              code: course.code,
              name: course.name,
              time: time,
              location: 'TBA', // Location to be announced
              instructor: course.instructor,
              building: 'TBA',
              room: 'TBA',
              floor: 'TBA',
              idRequired: false,
              navigationNotes: 'Location will be assigned before the semester starts.'
            });
          }
        }
      });
    });
    
    return {
      ...daySchedule,
      classes: dayClasses
    };
  });
  
  return (
    <>
      <Card className={`p-4 shadow-md border-l-4 ${theme.accent2Border} ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white'}`}>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : `text-${theme.secondary.split('-')[1]}-600`}`} />
          <h2>My Class Schedule</h2>
        </div>

        {/* Semester Filter */}
        <div className="mb-4">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : ''}`}>
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fall-2025">Fall 2025</SelectItem>
              <SelectItem value="spring-2026">Spring 2026</SelectItem>
              <SelectItem value="summer-2026">Summer 2026</SelectItem>
              <SelectItem value="fall-2026">Fall 2026</SelectItem>
              <SelectItem value="spring-2027">Spring 2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {semesterRegisteredCourses.length > 0 && (
          <div className={`mb-4 p-3 ${isDarkMode ? 'bg-gray-700 border-green-500' : 'bg-green-50 border-green-200'} border rounded-lg`}>
            <div className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>
              ✓ {semesterRegisteredCourses.length} newly registered course{semesterRegisteredCourses.length > 1 ? 's' : ''} this semester
            </div>
          </div>
        )}

        <div className="space-y-4">
          {schedule.map((daySchedule) => (
            <div key={daySchedule.day} className={`border-l-4 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} pl-3`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={daySchedule.day === today ? (isDarkMode ? 'text-cyan-400' : `text-${theme.secondary.split('-')[1]}-600`) : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}>
                  {daySchedule.day}
                </div>
                {daySchedule.day === today && (
                  <Badge className={`${isDarkMode ? 'bg-cyan-500' : theme.secondary.includes('green') ? 'bg-green-500' : theme.secondary.includes('orange') ? 'bg-orange-500' : theme.secondary.includes('teal') ? 'bg-teal-500' : 'bg-rose-500'} text-xs`}>Today</Badge>
                )}
              </div>
              
              {daySchedule.classes.length === 0 ? (
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mb-2`}>No classes</div>
              ) : (
                <div className="space-y-3">
                  {daySchedule.classes.map((classInfo, idx) => {
                    // Check if this is a newly registered course
                    const isNewlyRegistered = semesterRegisteredCourses.some(c => c.code === classInfo.code);
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedClass(classInfo)}
                        className={`w-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' : `bg-gradient-to-br ${theme.accent1} hover:opacity-80 border ${theme.accent1Border}`} rounded-lg p-3 space-y-2 transition-all text-left relative`}
                      >
                        {isNewlyRegistered && (
                          <div className={`absolute -top-1 -right-1 ${isDarkMode ? 'bg-green-400' : 'bg-green-500'} text-white text-[10px] px-2 py-0.5 rounded-full`}>
                            NEW
                          </div>
                        )}
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge variant="outline" className={`text-xs mb-1 ${isDarkMode ? 'border-cyan-400 text-cyan-400' : `${theme.accent1Border} ${theme.primaryText}`}`}>
                              {classInfo.code}
                            </Badge>
                            <div className="text-sm">{classInfo.name}</div>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : theme.primaryText} opacity-60 flex-shrink-0 mt-1`} />
                        </div>
                        
                        <div className={`space-y-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {classInfo.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {classInfo.location}
                          </div>
                          <div className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{classInfo.instructor}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {selectedClass && (
        <ClassDetails 
          classInfo={selectedClass} 
          onClose={() => setSelectedClass(null)}
          theme={theme}
        />
      )}
    </>
  );
}