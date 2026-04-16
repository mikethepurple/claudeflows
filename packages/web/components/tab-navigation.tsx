"use client";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <div className="border-b border-[rgba(255,255,255,0.08)] overflow-x-auto scrollbar-hide">
      <div className="flex gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative shrink-0 px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-[#6366F1]"
                : "text-[rgba(255,255,255,0.60)] hover:text-[rgba(255,255,255,0.92)]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366F1] rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
