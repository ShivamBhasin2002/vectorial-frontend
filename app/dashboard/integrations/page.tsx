import { ReactNode } from "react";
import { FaFigma, FaPlus, FaSlack } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import { SiJira, SiTestinglibrary } from "react-icons/si";

const ConnectionTabs = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className=" flex flex-col gap-4 bg-offwhite rounded-xl p-4 shadow-xl flex-1 max-w-[calc((100%-2rem)/3)]">
      <div className="flex gap-4 font-bold text-xl items-center">
        {icon}
        <div>{title}</div>
      </div>
      <div className="text-sm">{description}</div>
      <button className="focus:outline-none hover:bg-yellow/80 flex gap-2 justify-center items-center p-2 rounded-xl w-full bg-yellow h-10 mt-auto overflow-hidden hover:scale-[0.98] transition-all">
        <FaPlus />
        <div className="whitespace-nowrap text-black font-bold">
          Integrate with {title}
        </div>
      </button>
    </div>
  );
};

export default function Home() {
  return (
    <main className="w-[1024px] mx-auto h-screen pt-[80px]">
      <div className="text-black mb-8 text-2xl font-bold">Integrations</div>
      <div className="flex gap-4 flex-wrap">
        <ConnectionTabs
          icon={<FaFigma />}
          title="Figma"
          description="Design and prototype with real data using our Figma plugin. Create stunning, data-driven designs and prototypes in minutes. Build beautiful dashboards, mockups, and presentations with live, real-time data from your database."
        />
        <ConnectionTabs
          icon={<FaSlack />}
          title="Slack"
          description="Get real-time alerts and notifications about your data in Slack. Set up custom alerts to be notified when something important happens. Share metrics and reports in Slack channels. Collaborate on analytics directly in Slack threads."
        />
        <ConnectionTabs
          icon={<RiNotionFill />}
          title="Notion"
          description="View and interact with your data directly in Notion. Embed Mode supports any public or private dashboard URL. It's perfect for sharing read-only Mode dashboards with your team or company. Anyone with the link can view the dashboard in Notion and interact with it."
        />
        <ConnectionTabs
          icon={<SiTestinglibrary />}
          title="UserTesting"
          description="Understand how users interact with your product. Get feedback on new features, designs, and experiences. Use Mode to track user engagement and adoption. Understand how your users are interacting with your product, and use that insight to inform your product strategy."
        />
        <ConnectionTabs
          icon={<SiJira />}
          title="Jira"
          description="Manage your JIRA backlog with Mode. Use Mode to create custom reports and dashboards to track your team's progress, identify bottlenecks, and forecast release dates. Use Mode to create custom reports and dashboards to track your team's progress, identify bottlenecks and forecast release dates."
        />
      </div>
    </main>
  );
}
