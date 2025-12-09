import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { GraduationCap, Plus, BookOpen, CheckCircle2, Circle, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type CompletedCourse = {
  code: string;
  name: string;
  credits: number;
  semester: string;
  grade: string;
  gradePoints: number;
};

type RequiredCourse = {
  code: string;
  name: string;
  credits: number;
  category: string;
  priority: number;
};

type RegisteredCourse = {
  code: string;
  name: string;
  credits: number;
  schedule: string;
  timeSlots: string[];
  instructor: string;
  semester: string;
};

const completedCourses: CompletedCourse[] = [
  { code: 'BIO 101', name: 'Introduction to Biology', credits: 3, semester: 'Fall 2024', grade: 'A', gradePoints: 4.0 },
  { code: 'CHEM 101', name: 'General Chemistry I', credits: 4, semester: 'Fall 2024', grade: 'A-', gradePoints: 3.7 },
  { code: 'MATH 120', name: 'Precalculus', credits: 4, semester: 'Fall 2024', grade: 'B+', gradePoints: 3.3 },
  { code: 'ENG 101', name: 'English Composition', credits: 3, semester: 'Fall 2024', grade: 'A', gradePoints: 4.0 },
  { code: 'BIO 150', name: 'Environmental Biology', credits: 3, semester: 'Spring 2025', grade: 'A', gradePoints: 4.0 },
  { code: 'CHEM 102', name: 'General Chemistry II', credits: 4, semester: 'Spring 2025', grade: 'B+', gradePoints: 3.3 },
  { code: 'MATH 201', name: 'Calculus I', credits: 4, semester: 'Spring 2025', grade: 'B', gradePoints: 3.0 },
  { code: 'CS 101', name: 'Introduction to Programming', credits: 3, semester: 'Spring 2025', grade: 'A-', gradePoints: 3.7 },
];

const requiredCourses: RequiredCourse[] = [
  { code: 'BIO 201', name: 'Cell Biology', credits: 4, category: 'Core Biology', priority: 1 },
  { code: 'BIO 315', name: 'Genetics', credits: 4, category: 'Core Biology', priority: 1 },
  { code: 'BIO 301', name: 'Molecular Biology', credits: 4, category: 'Core Biology', priority: 2 },
  { code: 'BIO 330', name: 'Evolution', credits: 3, category: 'Core Biology', priority: 2 },
  { code: 'BIO 420', name: 'Ecology', credits: 3, category: 'Core Biology', priority: 3 },
  { code: 'CHEM 201', name: 'Organic Chemistry I', credits: 4, category: 'Required Science', priority: 1 },
  { code: 'CHEM 202', name: 'Organic Chemistry II', credits: 4, category: 'Required Science', priority: 2 },
  { code: 'MATH 202', name: 'Calculus II', credits: 4, category: 'Required Math', priority: 2 },
  { code: 'MATH 150', name: 'Statistics I', credits: 3, category: 'Required Math', priority: 1 },
  { code: 'BIO 220', name: 'Human Anatomy', credits: 4, category: 'Electives', priority: 3 },
  { code: 'BIO 340', name: 'Marine Biology', credits: 4, category: 'Electives', priority: 3 },
  { code: 'BIO 350', name: 'Microbiology', credits: 4, category: 'Electives', priority: 3 },
];

interface DegreeProgressProps {
  theme: any;
  onQuickAdd?: (course: RequiredCourse) => void;
  isDarkMode?: boolean;
  registeredCourses?: RegisteredCourse[];
  onRegister?: (course: RequiredCourse, semester: string) => void;
}

export function DegreeProgress({ theme, onQuickAdd, isDarkMode = false, registeredCourses = [], onRegister }: DegreeProgressProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState<RequiredCourse | null>(null);
  const [semester, setSemester] = useState('Spring 2026');

  // Calculate GPA
  const totalCredits = completedCourses.reduce((sum, course) => sum + course.credits, 0);
  const totalPoints = completedCourses.reduce((sum, course) => sum + (course.credits * course.gradePoints), 0);
  const gpa = totalPoints / totalCredits;

  // Calculate progress
  const totalRequiredCredits = 120; // typical bachelor's degree
  const completedCredits = totalCredits;
  const progressPercentage = (completedCredits / totalRequiredCredits) * 100;

  // Group courses by category
  const coursesByCategory = requiredCourses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, RequiredCourse[]>);

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'bg-red-100 text-red-700 border-red-300';
      case 2: return 'bg-amber-100 text-amber-700 border-amber-300';
      case 3: return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'High Priority';
      case 2: return 'Medium Priority';
      case 3: return 'Low Priority';
      default: return 'Optional';
    }
  };

  const handleQuickRegister = (course: RequiredCourse) => {
    setSelectedCourse(course);
  };

  const confirmRegistration = () => {
    if (selectedCourse && onRegister) {
      onRegister(selectedCourse, semester);
      setSelectedCourse(null);
    }
  };

  const isCourseEnrolled = (courseCode: string) => {
    return registeredCourses.some(c => c.code === courseCode);
  };

  const getEnrollmentBadge = (courseCode: string) => {
    const course = registeredCourses.find(c => c.code === courseCode);
    if (!course) return null;
    
    // Current semester is Fall 2025
    const currentSemester = 'Fall 2025';
    const isCurrentSemester = course.semester === currentSemester;
    
    return (
      <Badge className={`text-xs ${isCurrentSemester ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-green-100 text-green-700 border-green-300'}`}>
        {isCurrentSemester ? 'Currently Taking' : 'Enrolled'}
      </Badge>
    );
  };

  return (
    <Card className={`shadow-md border-l-4 ${theme.primaryBorder} ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white'}`}>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : `bg-${theme.primary.split('-')[1]}-100`} rounded-full flex items-center justify-center flex-shrink-0`}>
            <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : theme.primaryText}`} />
          </div>
          <div className="flex-1">
            <h2 className="mb-1">Degree Progress</h2>
            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Bachelor of Science - Biology</div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className={`mb-4 p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'} rounded-lg`}>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cumulative GPA</div>
              <div className={`text-2xl ${isDarkMode ? 'text-cyan-400' : theme.primaryText}`}>{gpa.toFixed(2)}</div>
            </div>
            <div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Credits Completed</div>
              <div className={`text-2xl ${isDarkMode ? 'text-cyan-400' : theme.primaryText}`}>{completedCredits} / {totalRequiredCredits}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Degree Completion</span>
              <span className={isDarkMode ? 'text-cyan-400' : theme.primaryText}>{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className={`w-full grid grid-cols-2 ${isDarkMode ? 'bg-gray-700' : ''}`}>
            <TabsTrigger value="overview">Completed</TabsTrigger>
            <TabsTrigger value="remaining">Remaining</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-3 mt-4">
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Course History</div>
            {completedCourses.map((course, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'} border rounded-lg`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <Badge variant="outline" className={`text-xs ${isDarkMode ? 'border-gray-500 text-gray-300' : 'border-green-300 text-green-700'}`}>
                      {course.code}
                    </Badge>
                  </div>
                  <div className="text-sm">{course.name}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    {course.semester} • {course.credits} credits
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg ${course.gradePoints >= 3.7 ? (isDarkMode ? 'text-green-400' : 'text-green-600') : course.gradePoints >= 3.0 ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') : (isDarkMode ? 'text-amber-400' : 'text-amber-600')}`}>
                    {course.grade}
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{course.gradePoints.toFixed(1)}</div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="remaining" className="space-y-4 mt-4">
            {Object.entries(coursesByCategory).map(([category, courses]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : theme.primaryText}`} />
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{category}</div>
                  <Badge variant="secondary" className={`text-xs ml-auto ${isDarkMode ? 'bg-gray-700 text-gray-300' : ''}`}>
                    {courses.length} courses
                  </Badge>
                </div>
                <div className="space-y-2">
                  {courses.map((course) => {
                    const isEnrolled = isCourseEnrolled(course.code);
                    return (
                      <div key={course.code} className={`p-3 ${isEnrolled ? (isDarkMode ? 'bg-gray-700 border-blue-400' : 'bg-blue-50 border-blue-300') : (isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200')} border rounded-lg`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {isEnrolled ? (
                                <Clock className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                              ) : (
                                <Circle className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                              )}
                              <Badge variant="outline" className={`text-xs ${isDarkMode ? 'border-gray-500 text-gray-300' : ''}`}>
                                {course.code}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(course.priority)}`}>
                                P{course.priority}
                              </Badge>
                              {isEnrolled && getEnrollmentBadge(course.code)}
                            </div>
                            <div className="text-sm">{course.name}</div>
                            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                              {course.credits} credits • {getPriorityLabel(course.priority)}
                            </div>
                          </div>
                          {!isEnrolled && onRegister && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuickRegister(course)}
                              className={`ml-2 ${isDarkMode ? 'border-cyan-400 text-cyan-400 hover:bg-gray-600' : `${theme.primaryBorder} ${theme.primaryText}`}`}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Register
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Registration Dialog */}
        {selectedCourse && (
          <Dialog open={selectedCourse !== null} onOpenChange={() => setSelectedCourse(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Register Course</DialogTitle>
                <DialogDescription>
                  Register <strong>{selectedCourse.name}</strong> for {semester}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fall 2025">Fall 2025</SelectItem>
                    <SelectItem value="Spring 2026">Spring 2026</SelectItem>
                    <SelectItem value="Fall 2026">Fall 2026</SelectItem>
                    <SelectItem value="Spring 2027">Spring 2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedCourse(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={confirmRegistration}
                >
                  Register
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Card>
  );
}