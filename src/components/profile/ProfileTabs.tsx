interface ProfileTabsProps {
  tabs: string[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const ProfileTabs = ({ tabs, activeTab, onSelectTab }: ProfileTabsProps) => {
  return (
    <div className="flex items-center gap-2 mb-6 border-b border-outline-variant/30">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`px-5 py-3 font-headline font-bold text-sm border-b-2 -mb-px transition-all ${
            activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
