"use client";

import * as React from "react";

interface TabsContextValue {
  groupId?: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

interface TabsProps {
  groupId?: string;
  children: React.ReactNode;
  defaultValue?: string;
}

export function Tabs({ groupId, children, defaultValue }: TabsProps) {
  const tabs = React.useMemo(() => {
    const tabItems: Array<{ value: string; label: string; default: boolean }> =
      [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement<TabItemProps>(child)) {
        // Check if it's a TabItem by checking props
        if (child.props?.value) {
          tabItems.push({
            value: child.props.value,
            label: child.props.label || child.props.value,
            default: child.props.default || false,
          });
        }
      }
    });

    return tabItems;
  }, [children]);

  const defaultTab =
    tabs.find((t) => t.default)?.value || tabs[0]?.value || defaultValue || "";
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab);

  React.useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setActiveTab(defaultTab);
    }
  }, [activeTab, tabs, defaultTab]);

  return (
    <TabsContext.Provider value={{ groupId, activeTab, setActiveTab }}>
      <div
        className="vocs_Tabs"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <div
          className="vocs_Tabs_list"
          role="tablist"
          style={{
            display: "flex",
            gap: "0.5rem",
            borderBottom: "1px solid var(--vocs-color_border)",
            marginBottom: "1rem",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderBottom:
                  activeTab === tab.value
                    ? "2px solid var(--vocs-color_textAccent)"
                    : "2px solid transparent",
                color:
                  activeTab === tab.value
                    ? "var(--vocs-color_textAccent)"
                    : "var(--vocs-color_text2)",
                fontWeight: activeTab === tab.value ? "600" : "400",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="vocs_Tabs_content" role="tabpanel">
          {children}
        </div>
      </div>
    </TabsContext.Provider>
  );
}

interface TabItemProps {
  value: string;
  label?: string;
  default?: boolean;
  children: React.ReactNode;
}

export function TabItem({
  value,
  label: _label,
  default: _isDefault,
  children,
}: TabItemProps) {
  const context = React.useContext(TabsContext);

  // Only render if this tab is active
  if (!context || context.activeTab !== value) {
    return null;
  }

  return <>{children}</>;
}
