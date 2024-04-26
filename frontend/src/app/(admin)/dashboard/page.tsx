import { AdminNavbar } from "@/components/Dashboard/admin-navbar";
import { SocialTrafficCard } from "@/components/Dashboard/social-traffic-card";
import { StatisticTopCard } from "@/components/Dashboard/statistic-top-card";
import { TopPoolsCard } from "@/components/Dashboard/top-pools-card";
import { TotalOrdersCard } from "@/components/Dashboard/total-orders.card";
import TradingViewWidget from "@/components/Dashboard/trading-view-widget";

export default function Dashboard() {
    return (
      <div className="min-h-screen flex flex-1 flex-col overflow-y-scroll">
        <section className="bg-cyan-950 h-2/5 flex flex-col items-stretch justify-start px-14 py-2">
          <AdminNavbar currentPage="Dashboard" />

          <div className="flex my-14 items-center gap-8 justify-between overflow-x-scroll">
            <StatisticTopCard title="Traffic" value={350897} difference={3.48} />
            <StatisticTopCard title="New Users" value={2356} difference={-3.48} />
            <StatisticTopCard title="Sales" value={924} difference={-1.10} />
            <StatisticTopCard title="Performance" value={49.65} difference={12} />
          </div>
        </section>

        <section className="flex-1 -mt-20 grid h-3/5 grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-8 px-14">
          <div className="bg-white col-span-2 h-96 overflow-hidden shadow-md rounded-md">
            <TradingViewWidget />
          </div>
          <div className="bg-white col-span-1 h-96 shadow-md p-2 flex flex-col rounded-md">
            <div className="flex flex-col items-start flex-1">
              <div className="flex flex-col justify-start items-center">
                <h3 className="text-xs text-gray-500">PERFORMANCE</h3>
                <span className="font-medium text-lg">Total orders</span>
              </div>

              <TotalOrdersCard />
            </div>
          </div>
          <div className="bg-white h-96 col-span-2 shadow-md rounded-md">
            <TopPoolsCard />
          </div>
          <div className="bg-white col-span-1 shadow-md rounded-md">
            <SocialTrafficCard />
          </div>
        </section>
      </div>
    );
  }
  