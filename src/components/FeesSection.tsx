import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, CreditCard, Calendar, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const initialFees = [
  {
    id: 1,
    name: 'Spring 2025 Tuition',
    amount: 4250.00,
    dueDate: 'Nov 15, 2025',
    status: 'due'
  },
  {
    id: 2,
    name: 'Student Activity Fee',
    amount: 125.00,
    dueDate: 'Nov 15, 2025',
    status: 'due'
  },
  {
    id: 3,
    name: 'Lab Fee - Biology',
    amount: 85.00,
    dueDate: 'Nov 20, 2025',
    status: 'upcoming'
  }
];

interface FeesSectionProps {
  theme: any;
  isDarkMode?: boolean;
}

export function FeesSection({ theme, isDarkMode = false }: FeesSectionProps) {
  const [fees, setFees] = useState(initialFees);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPaymentPlanDialog, setShowPaymentPlanDialog] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [planSuccess, setPlanSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [customAmount, setCustomAmount] = useState('');

  const totalDue = fees.reduce((sum, fee) => sum + fee.amount, 0);

  const handlePayNow = () => {
    const paymentAmount = customAmount ? parseFloat(customAmount) : totalDue;
    
    if (customAmount && (paymentAmount <= 0 || paymentAmount > totalDue)) {
      alert('Please enter a valid amount between $0.01 and $' + totalDue.toFixed(2));
      return;
    }

    setPaymentSuccess(true);
    setTimeout(() => {
      if (customAmount && paymentAmount < totalDue) {
        // Partial payment - reduce total
        const remaining = totalDue - paymentAmount;
        setFees([{
          id: Date.now(),
          name: 'Remaining Balance',
          amount: remaining,
          dueDate: fees[0].dueDate,
          status: 'due' as const
        }]);
      } else {
        // Full payment - clear all fees
        setFees([]);
      }
      setShowPaymentDialog(false);
      setPaymentSuccess(false);
      setCustomAmount('');
    }, 2000);
  };

  const handlePaymentPlan = () => {
    setPlanSuccess(true);
    setTimeout(() => {
      // Split fees into 3 monthly installments
      const monthlyAmount = totalDue / 3;
      const newFees = [
        {
          id: Date.now(),
          name: 'Payment Plan - Installment 1 of 3',
          amount: monthlyAmount,
          dueDate: 'Dec 15, 2025',
          status: 'due' as const
        },
        {
          id: Date.now() + 1,
          name: 'Payment Plan - Installment 2 of 3',
          amount: monthlyAmount,
          dueDate: 'Jan 15, 2026',
          status: 'upcoming' as const
        },
        {
          id: Date.now() + 2,
          name: 'Payment Plan - Installment 3 of 3',
          amount: monthlyAmount,
          dueDate: 'Feb 15, 2026',
          status: 'upcoming' as const
        }
      ];
      setFees(newFees);
      setShowPaymentPlanDialog(false);
      setPlanSuccess(false);
    }, 2000);
  };

  return (
    <>
      <Card className={`shadow-md border-l-4 ${theme.primaryBorder} ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white'}`}>
        <div className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className={`w-10 h-10 ${isDarkMode ? 'bg-gray-700' : `bg-${theme.primary.split('-')[1]}-100`} rounded-full flex items-center justify-center flex-shrink-0`}>
              {totalDue === 0 ? (
                <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : theme.primaryText}`} />
              ) : (
                <AlertCircle className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : theme.primaryText}`} />
              )}
            </div>
            <div className="flex-1">
              <h2 className="mb-1">
                {totalDue === 0 ? 'No Outstanding Fees' : 'Outstanding Fees'}
              </h2>
              <div className={`text-2xl ${totalDue === 0 ? (isDarkMode ? 'text-green-400' : 'text-green-600') : (isDarkMode ? 'text-cyan-400' : theme.primaryText)}`}>
                ${totalDue.toFixed(2)}
              </div>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${isDarkMode ? 'hover:bg-gray-700' : `hover:bg-${theme.primary.split('-')[1]}-50`} transition-colors`}
            >
              {isExpanded ? (
                <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : theme.primaryText}`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : theme.primaryText}`} />
              )}
            </button>
          </div>
        </div>

        {isExpanded && (
          <>
            {fees.length > 0 ? (
              <>
                <div className="px-4 space-y-2 mb-4">
                  {fees.map((fee) => (
                    <div key={fee.id} className={`flex items-center justify-between py-2 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'} last:border-0`}>
                      <div className="flex-1">
                        <div className="text-sm">{fee.name}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Due: {fee.dueDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">${fee.amount.toFixed(2)}</div>
                        <Badge 
                          variant={fee.status === 'due' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {fee.status === 'due' ? 'Due Now' : 'Upcoming'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => setShowPaymentDialog(true)}
                    className={`${isDarkMode ? 'bg-cyan-500 hover:bg-cyan-600' : `bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover}`}`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Now
                  </Button>
                  <Button 
                    onClick={() => setShowPaymentPlanDialog(true)}
                    variant="outline"
                    className={`${isDarkMode ? 'border-cyan-400 text-cyan-400 hover:bg-gray-700' : `${theme.primaryBorder} ${theme.primaryText} hover:bg-${theme.primary.split('-')[1]}-50`}`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Payment Plan
                  </Button>
                </div>
              </>
            ) : (
              <div className={`px-4 pb-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <CheckCircle className={`w-12 h-12 mx-auto mb-2 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`} />
                <p>All fees have been paid!</p>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Pay Now Dialog with Card Details */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>
              {paymentSuccess ? 'Payment Successful!' : 'Confirm Payment'}
            </DialogTitle>
            <DialogDescription>
              {paymentSuccess ? (
                <div className="py-4 text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-3 text-green-600" />
                  <div className="text-green-600 mb-2">
                    Your payment of ${(customAmount ? parseFloat(customAmount) : totalDue).toFixed(2)} has been processed successfully.
                  </div>
                  <div className="text-xs text-gray-500">
                    {customAmount && parseFloat(customAmount) < totalDue 
                      ? `Remaining balance: $${(totalDue - parseFloat(customAmount)).toFixed(2)}` 
                      : 'Your account balance is now $0.00'}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-gray-700">
                    Review your payment details below
                  </div>

                  {/* Saved Card Display */}
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-4 text-white shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-xs opacity-80">SAVED PAYMENT METHOD</div>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div className="mb-4">
                      <div className="text-xs opacity-80 mb-1">CARD NUMBER</div>
                      <div className="tracking-wider">•••• •••• •••• 4782</div>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs opacity-80 mb-1">CARDHOLDER</div>
                        <div className="text-sm">John Student</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-80 mb-1">EXPIRES</div>
                        <div className="text-sm">08/27</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">VISA</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Amount Due</span>
                      <span className="font-semibold">${totalDue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Processing Fee</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-semibold">Total Charge</span>
                      <span className={`font-semibold text-lg ${theme.primaryText}`}>
                        ${totalDue.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded text-xs text-gray-600">
                    This is a demo. No actual payment will be processed.
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          {!paymentSuccess && (
            <DialogFooter className="flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
                className="flex-1"
              >
                Cancel Transaction
              </Button>
              <div className="flex-1">
                <input
                  type="text"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <Button
                onClick={handlePayNow}
                className={`flex-1 bg-gradient-to-r ${theme.primary} hover:${theme.primaryHover}`}
              >
                Confirm Payment
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Plan Dialog */}
      <AlertDialog open={showPaymentPlanDialog} onOpenChange={setShowPaymentPlanDialog}>
        <AlertDialogContent className="max-w-[90%] rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {planSuccess ? 'Enrollment Successful!' : 'Payment Plan Options'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {planSuccess ? (
                <div className="text-green-600 py-4">
                  You've been enrolled in a 4-month payment plan. Your first payment of ${(totalDue / 4).toFixed(2)} is due on Nov 15, 2025.
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm">
                    Split your ${totalDue.toFixed(2)} balance into manageable monthly payments:
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm">4-Month Plan (Recommended)</div>
                    <div className="text-xl text-blue-600">${(totalDue / 4).toFixed(2)}/month</div>
                    <div className="text-xs text-gray-600 mt-1">Starting Nov 15, 2025</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded text-xs text-gray-600">
                    This is a demo. No actual enrollment will occur.
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!planSuccess && (
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handlePaymentPlan} className={`${theme.primaryBg} hover:bg-${theme.primary.split('-')[1]}-700`}>
                Enroll in Plan
              </AlertDialogAction>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}