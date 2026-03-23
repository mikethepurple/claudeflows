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
    <div className="border-b border-black/[0.08] overflow-x-auto scrollbar-hide">
      <div className="flex gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative shrink-0 px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-[#C2410C]"
                : "text-[#6B7280] hover:text-[#171717]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2410C] rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
