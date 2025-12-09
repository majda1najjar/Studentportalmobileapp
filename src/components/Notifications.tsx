import { useState } from 'react';
import { X, Clock, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const assignments = [
  {
    id: 1,
    course: 'CS 250',
    courseName: 'Data Structures',
    assignmentName: 'Binary Tree Implementation',
    dueDate: 'Today',
    dueTime: '11:59 PM',
    status: 'urgent',
    description: 'Implement a complete binary search tree with insert, delete, and search operations. Include proper error handling and unit tests.',
    points: 100,
    submissionType: 'Code submission via GitHub'
  },
  {
    id: 2,
    course: 'BIO 315',
    courseName: 'Genetics',
    assignmentName: 'Punnett Square Analysis',
    dueDate: 'Tomorrow',
    dueTime: '11:59 PM',
    status: 'upcoming',
    description: 'Complete the worksheet analyzing genetic crosses using Punnett squares. Include calculations for phenotype and genotype ratios.',
    points: 50,
    submissionType: 'PDF upload'
  },
  {
    id: 3,
    course: 'BIO 301',
    courseName: 'Molecular Biology',
    assignmentName: 'DNA Replication Essay',
    dueDate: 'Tomorrow',
    dueTime: '11:59 PM',
    status: 'upcoming',
    description: 'Write a 5-page essay explaining the molecular mechanisms of DNA replication, including the roles of enzymes and proteins involved.',
    points: 150,
    submissionType: 'Document upload'
  },
  {
    id: 4,
    course: 'CS 310',
    courseName: 'Algorithms',
    assignmentName: 'Sorting Algorithm Analysis',
    dueDate: 'Nov 6, 2025',
    dueTime: '11:59 PM',
    status: 'normal',
    description: 'Compare and analyze the time complexity of QuickSort, MergeSort, and HeapSort. Include Big-O analysis and empirical testing results.',
    points: 75,
    submissionType: 'Report and code'
  },
  {
    id: 5,
    course: 'CS 250',
    courseName: 'Data Structures',
    assignmentName: 'Graph Algorithms Lab',
    dueDate: 'Nov 8, 2025',
    dueTime: '11:59 PM',
    status: 'normal',
    description: 'Implement Dijkstra\'s shortest path algorithm and breadth-first search for graph traversal.',
    points: 100,
    submissionType: 'Code submission'
  },
  {
    id: 6,
    course: 'BIO 315',
    courseName: 'Genetics',
    assignmentName: 'Lab Report: Fruit Fly Genetics',
    dueDate: 'Nov 10, 2025',
    dueTime: '11:59 PM',
    status: 'normal',
    description: 'Compile data from the Drosophila genetics experiment and write a comprehensive lab report including methodology, results, and analysis.',
    points: 120,
    submissionType: 'Lab report PDF'
  }
];

interface NotificationsProps {
  onClose: () => void;
}

export function Notifications({ onClose }: NotificationsProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignments[0] | null>(null);

  return (
    <>
      <div className="fixed inset-0 bg-white z-50 flex flex-col" style={{ maxWidth: '430px', margin: '0 auto' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h2>Notifications</h2>
            <div className="text-xs opacity-90 mt-1">{assignments.length} assignments pending</div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Assignments List */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-3">
            {assignments.map((assignment) => (
              <button
                key={assignment.id}
                onClick={() => setSelectedAssignment(assignment)}
                className={`w-full text-left rounded-lg p-4 border-2 transition-all ${
                  assignment.status === 'urgent' 
                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300 hover:border-red-400' 
                    : assignment.status === 'upcoming'
                    ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 hover:border-amber-400'
                    : 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        variant="outline" 
                        className={
                          assignment.status === 'urgent'
                            ? 'border-red-400 text-red-700 bg-red-100'
                            : assignment.status === 'upcoming'
                            ? 'border-amber-400 text-amber-700 bg-amber-100'
                            : 'border-purple-300 text-purple-700'
                        }
                      >
                        {assignment.course}
                      </Badge>
                      {assignment.status === 'urgent' && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="text-sm mb-1">{assignment.assignmentName}</div>
                    <div className="text-xs text-gray-600">{assignment.courseName}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3 h-3" />
                  <span className={assignment.status === 'urgent' ? 'text-red-600' : 'text-gray-600'}>
                    Due {assignment.dueDate} at {assignment.dueTime}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Details Dialog */}
      <Dialog open={selectedAssignment !== null} onOpenChange={() => setSelectedAssignment(null)}>
        <DialogContent className="max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Assignment Details
            </DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-2">
                <div>
                  <Badge className="bg-purple-600 mb-2">
                    {selectedAssignment?.course}
                  </Badge>
                  <div className="text-sm">{selectedAssignment?.assignmentName}</div>
                  <div className="text-xs text-gray-500">{selectedAssignment?.courseName}</div>
                </div>

                <div className="bg-purple-50 p-3 rounded-lg space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="text-gray-900">{selectedAssignment?.dueDate} at {selectedAssignment?.dueTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Points:</span>
                    <span className="text-gray-900">{selectedAssignment?.points}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Submission Type:</span>
                    <span className="text-gray-900">{selectedAssignment?.submissionType}</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-600 mb-1">Description:</div>
                  <div className="text-xs text-gray-700 leading-relaxed">
                    {selectedAssignment?.description}
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
