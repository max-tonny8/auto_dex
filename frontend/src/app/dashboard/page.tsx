import { AdminNavbar } from "@/components/Dashboard/admin-navbar";
import { StatisticTopCard } from "@/components/Dashboard/statistic-top-card";
import TradingViewWidget from "@/components/Dashboard/trading-view-widget";

export default function Dashboard() {
    return (
      <div className="min-h-screen flex flex-1 flex-col overflow-y-scroll">
        <section className="bg-cyan-950 h-2/5 flex flex-col items-stretch justify-start px-14 py-2">
          <AdminNavbar />

          <div className="flex my-14 items-center gap-8 justify-between overflow-x-scroll">
            <StatisticTopCard title="Traffic" value={350897} difference={3.48} />
            <StatisticTopCard title="New Users" value={2356} difference={-3.48} />
            <StatisticTopCard title="Sales" value={924} difference={-1.10} />
            <StatisticTopCard title="Performance" value={49.65} difference={12} />
          </div>
        </section>

        <section className="flex-1 -mt-20 grid h-3/5 grid-cols-1 sm:grid-cols-3 gap-8 px-14">
          <div className="bg-white col-span-2 max-h-[400px] overflow-hidden">
            <TradingViewWidget />
          </div>
          <div className="bg-white col-span-1 h-96">TESTE</div>
          <div className="bg-green-600 h-96 col-span-2">TESTE</div>
          <div className="bg-green-600 col-span-1">TESTE</div>
        </section>
      </div>
    );
  }
  