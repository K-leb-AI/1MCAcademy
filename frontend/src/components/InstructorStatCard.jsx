import {TrendingUp} from "lucide-react"

const StatCard = ({ icon: Icon, label, value, subtext, trend }) => (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtext && <p className="text-xs text-foreground/50 mt-1">{subtext}</p>}
        </div>
        <div className="p-2 bg-primary/10 rounded-[calc(var(--radius)-2px)]">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      {/* {trend && (
        <div className="flex items-center gap-1 mt-4">
          <TrendingUp className="w-4 h-4 text-chart-4" />
          <span className="text-sm font-medium text-chart-4">{trend}</span>
        </div>
      )} */}
    </div>
  );

export default StatCard;