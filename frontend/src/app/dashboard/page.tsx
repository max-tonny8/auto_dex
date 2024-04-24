import { DashboardCard } from "@/components/Dashboard/dashboard-card";
import { StatisticTopCard } from "@/components/Dashboard/statistic-top-card";

export default function Dashboard() {
    return (
      <div className="h-screen flex flex-1">
        <section className="bg-cyan-950 h-2/5 flex-1 flex items-center justify-between px-14">
          <StatisticTopCard title="Traffic" value={350897} difference={3.48} />
          <StatisticTopCard title="Traffic" value={2356} difference={-3.48} />
          <StatisticTopCard title="Traffic" value={924} difference={-1.10} />
          <StatisticTopCard title="Traffic" value={49.65} difference={12} />

        </section>
      </div>
    );
  }
  