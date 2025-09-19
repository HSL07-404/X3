{"codarIcon,
  AcademicCapIcon,
nrnaom],- c","cl["{"ir tnor"nYt(r( tye0/5 vr}-lmntcn - ac=P  br
 muAcnt iw"rtt-} 3n-  iA to, icsrbp dL-ttrH-ne: 0n  , l R-ana s  xra aoexapIcon, UserCheckIcon, BarChartIcon as ChartBarIcon, CogIcon, ArrowRightCircleIcon as ArrowRightOnRectangleIcon, MoonIcon, SunIcon, BellIcon, SparklesIcon } from "lucide-react";
} from "@heroicons/react/24/outline";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ModernSidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  isOpen, 
  setIsOpen 
}) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useApp();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: HomeIcon, roles: ["student", "faculty", "admin"] },
    { id: "attendance", label: "Attendance", icon: UserCheckIcon, roles: ["student", "faculty", "admin"] },
    { id: "classes", label: "Classes", icon: CalendarIcon, roles: ["faculty", "admin"] },
    { id: "students", label: "Students", icon: UsersIcon, roles: ["faculty", "admin"] },
    { id: "faculty", label: "Faculty", icon: AcademicCapIcon, roles: ["admin"] },
    { id: "reports", label: "Reports", icon: ChartBarIcon, roles: ["faculty", "admin"] },
    { id: "analytics", label: "Analytics", icon: SparklesIcon, roles: ["faculty", "admin"] },
    { id: "settings", label: "Settings", icon: CogIcon, roles: ["student", "faculty", "admin"] },
  ];

  const filteredItems = navigationItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  // Role-specific gradient classes
  const roleGradients = {
    admin: 'from-[#6D28D9] to-[#3B82F6]',
    student: 'from-[#2563EB] to-[#0EA5E9]',
    faculty: 'from-[#059669] to-[#10B981]'
  };

  const currentGradient = roleGradients[user?.role as keyof typeof roleGradients] || roleGradients.admin;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-screen w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl border-r border-white/20 dark:border-gray-700/50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo / Brand */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/20 dark:border-gray-700/50">
        <div className="flex items-center">
          <div className={`w-10 h-10 bg-gradient-to-br ${currentGradient} rounded-xl flex items-center justify-center mr-3`}>
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <span className={`font-bold text-xl bg-gradient-to-r ${currentGradient} bg-clip-text text-transparent`}>
            Attendify
          </span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200"
        >
          {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsOpen(false); // Close mobile sidebar
              }}
              className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 group ${
                isActive
                  ? `bg-gradient-to-r ${currentGradient} text-white shadow-lg`
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/60 backdrop-blur-sm"
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 transition-transform duration-200 ${
                isActive ? 'scale-110' : 'group-hover:scale-105'
              }`} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </button>
          );
        })}
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-white/20 dark:border-gray-700/50 p-6">
        {/* User Profile */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${currentGradient} rounded-xl flex items-center justify-center`}>
              <span className="text-white font-semibold text-sm">
                {user?.name?.split(' ').map(n => n[0]).join('') || '?'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-2">
          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-xl transition-all duration-200">
            <BellIcon className="h-4 w-4 mr-3" />
            Notifications
          </button>
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:text-red-900 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-200 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
            Logout
          </button>
        </div>
      </div>
      </aside>
    </>
  );
};

export default ModernSidebar;
