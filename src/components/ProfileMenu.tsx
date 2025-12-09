import { LogOut, Settings, Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useState } from 'react';
import { Button } from './ui/button';

export type ColorTheme = 'purple-green' | 'blue-orange' | 'pink-teal' | 'indigo-rose' | 'dark-mode';

interface ProfileMenuProps {
  children: React.ReactNode;
  currentTheme: ColorTheme;
  onThemeChange: (theme: ColorTheme) => void;
}

const themes = [
  {
    id: 'purple-green' as ColorTheme,
    name: 'Purple & Green',
    primary: 'from-purple-400 to-purple-500',
    secondary: 'from-green-400 to-green-500',
    preview1: 'bg-purple-400',
    preview2: 'bg-green-400'
  },
  {
    id: 'blue-orange' as ColorTheme,
    name: 'Blue & Orange',
    primary: 'from-blue-400 to-blue-500',
    secondary: 'from-orange-400 to-orange-500',
    preview1: 'bg-blue-400',
    preview2: 'bg-orange-400'
  },
  {
    id: 'pink-teal' as ColorTheme,
    name: 'Pink & Teal',
    primary: 'from-pink-400 to-pink-500',
    secondary: 'from-teal-400 to-teal-500',
    preview1: 'bg-pink-400',
    preview2: 'bg-teal-400'
  },
  {
    id: 'indigo-rose' as ColorTheme,
    name: 'Indigo & Rose',
    primary: 'from-indigo-400 to-indigo-500',
    secondary: 'from-rose-400 to-rose-500',
    preview1: 'bg-indigo-400',
    preview2: 'bg-rose-400'
  },
  {
    id: 'dark-mode' as ColorTheme,
    name: 'Dark Mode',
    primary: 'from-gray-800 to-gray-900',
    secondary: 'from-cyan-500 to-blue-500',
    preview1: 'bg-gray-800',
    preview2: 'bg-cyan-500'
  }
];

export function ProfileMenu({ children, currentTheme, onThemeChange }: ProfileMenuProps) {
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    alert('Logout functionality would be implemented here');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowColorDialog(true)}>
            <Palette className="w-4 h-4 mr-2" />
            Change Colors
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Color Theme Dialog */}
      <Dialog open={showColorDialog} onOpenChange={setShowColorDialog}>
        <DialogContent className="max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Choose Color Theme</DialogTitle>
            <DialogDescription>
              Select a color scheme for your student portal
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 py-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme.id);
                  setShowColorDialog(false);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  currentTheme === theme.id 
                    ? 'border-purple-600 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className={`w-8 h-8 rounded ${theme.preview1}`}></div>
                    <div className={`w-8 h-8 rounded ${theme.preview2}`}></div>
                  </div>
                  <div className="text-sm">{theme.name}</div>
                  {currentTheme === theme.id && (
                    <div className="ml-auto text-purple-600">✓</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-[90%] rounded-lg">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your account settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-sm">Student Information</div>
              <div className="text-xs text-gray-600">
                Name: Sarah Johnson<br />
                Student ID: 2024-8756<br />
                Email: sarah.johnson@university.edu
              </div>
            </div>
            <div className="pt-2">
              <Button className="w-full" variant="outline">
                Edit Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function getThemeClasses(theme: ColorTheme) {
  const themeMap = {
    'purple-green': {
      header: 'from-purple-400 to-purple-500',
      primary: 'from-purple-500 to-purple-600',
      primaryHover: 'from-purple-600 to-purple-700',
      primaryBorder: 'border-purple-400',
      primaryText: 'text-purple-600',
      primaryBg: 'bg-purple-600',
      secondary: 'from-green-400 to-green-500',
      secondaryHover: 'from-green-500 to-green-600',
      background: 'from-purple-50 via-white to-green-50',
      accent1: 'from-purple-50 to-violet-50',
      accent1Border: 'border-purple-200',
      accent2: 'from-green-50 to-emerald-50',
      accent2Border: 'border-green-200',
      notificationDot: 'bg-green-400'
    },
    'blue-orange': {
      header: 'from-blue-400 to-blue-500',
      primary: 'from-blue-500 to-blue-600',
      primaryHover: 'from-blue-600 to-blue-700',
      primaryBorder: 'border-blue-400',
      primaryText: 'text-blue-600',
      primaryBg: 'bg-blue-600',
      secondary: 'from-orange-400 to-orange-500',
      secondaryHover: 'from-orange-500 to-orange-600',
      background: 'from-blue-50 via-white to-orange-50',
      accent1: 'from-blue-50 to-sky-50',
      accent1Border: 'border-blue-200',
      accent2: 'from-orange-50 to-amber-50',
      accent2Border: 'border-orange-200',
      notificationDot: 'bg-orange-400'
    },
    'pink-teal': {
      header: 'from-pink-400 to-pink-500',
      primary: 'from-pink-500 to-pink-600',
      primaryHover: 'from-pink-600 to-pink-700',
      primaryBorder: 'border-pink-400',
      primaryText: 'text-pink-600',
      primaryBg: 'bg-pink-600',
      secondary: 'from-teal-400 to-teal-500',
      secondaryHover: 'from-teal-500 to-teal-600',
      background: 'from-pink-50 via-white to-teal-50',
      accent1: 'from-pink-50 to-rose-50',
      accent1Border: 'border-pink-200',
      accent2: 'from-teal-50 to-cyan-50',
      accent2Border: 'border-teal-200',
      notificationDot: 'bg-teal-400'
    },
    'indigo-rose': {
      header: 'from-indigo-400 to-indigo-500',
      primary: 'from-indigo-500 to-indigo-600',
      primaryHover: 'from-indigo-600 to-indigo-700',
      primaryBorder: 'border-indigo-400',
      primaryText: 'text-indigo-600',
      primaryBg: 'bg-indigo-600',
      secondary: 'from-rose-400 to-rose-500',
      secondaryHover: 'from-rose-500 to-rose-600',
      background: 'from-indigo-50 via-white to-rose-50',
      accent1: 'from-indigo-50 to-violet-50',
      accent1Border: 'border-indigo-200',
      accent2: 'from-rose-50 to-pink-50',
      accent2Border: 'border-rose-200',
      notificationDot: 'bg-rose-400'
    },
    'dark-mode': {
      header: 'from-gray-800 to-gray-900',
      primary: 'from-gray-700 to-gray-800',
      primaryHover: 'from-gray-800 to-gray-900',
      primaryBorder: 'border-gray-600',
      primaryText: 'text-cyan-400',
      primaryBg: 'bg-gray-700',
      secondary: 'from-cyan-500 to-blue-500',
      secondaryHover: 'from-cyan-600 to-blue-600',
      background: 'from-gray-900 via-gray-800 to-gray-900',
      accent1: 'from-gray-800 to-gray-700',
      accent1Border: 'border-gray-600',
      accent2: 'from-gray-700 to-gray-800',
      accent2Border: 'border-gray-600',
      notificationDot: 'bg-cyan-400'
    }
  };

  return themeMap[theme];
}