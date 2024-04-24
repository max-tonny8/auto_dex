import { DashboardCard } from "@/components/dashboard-card";

export default function Dashboard() {
    return (
      <div className="h-screen flex flex-1">
        <section className="bg-cyan-950 h-2/5 flex-1 flex items-center justify-between px-14">
          <DashboardCard>
            <div className="flex gap-3 flex-col font-light text-sm">
              <div className="flex self-stretch justify-between items-start">
                <div className="flex flex-col items-start">
                  <h2 className="text-sm text-gray-500">TRAFFIC</h2>
                  <span className="text-lg font-bold">350,897</span>
                </div>
                <div className="rounded-full bg-green-500 w-11 h-11 flex items-center justify-center">A</div>
              </div>

              <span className="text-gray-500">3,48% since last month</span>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex gap-3 flex-col font-light text-sm">
              <div className="flex self-stretch justify-between items-start">
                <div className="flex flex-col items-start">
                  <h2 className="text-sm text-gray-500">TRAFFIC</h2>
                  <span className="text-lg font-bold">350,897</span>
                </div>
                <div className="rounded-full bg-green-500 w-11 h-11 flex items-center justify-center">A</div>
              </div>

              <span className="text-gray-500">3,48% since last month</span>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex gap-3 flex-col font-light text-sm">
              <div className="flex self-stretch justify-between items-start">
                <div className="flex flex-col items-start">
                  <h2 className="text-sm text-gray-500">TRAFFIC</h2>
                  <span className="text-lg font-bold">350,897</span>
                </div>
                <div className="rounded-full bg-green-500 w-11 h-11 flex items-center justify-center">A</div>
              </div>

              <span className="text-gray-500">3,48% since last month</span>
            </div>
          </DashboardCard>

          <DashboardCard>
            <div className="flex gap-3 flex-col font-light text-sm">
              <div className="flex self-stretch justify-between items-start">
                <div className="flex flex-col items-start">
                  <h2 className="text-sm text-gray-500">TRAFFIC</h2>
                  <span className="text-lg font-bold">350,897</span>
                </div>
                <div className="rounded-full bg-green-500 w-11 h-11 flex items-center justify-center">A</div>
              </div>

              <span className="text-gray-500">3,48% since last month</span>
            </div>
          </DashboardCard>
        </section>
      </div>
    );
  }
  