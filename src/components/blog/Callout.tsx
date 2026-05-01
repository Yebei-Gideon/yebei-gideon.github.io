import type { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "tip" | "security";

const styles: Record<CalloutType, { icon: typeof Info; cls: string; label: string }> = {
  info: {
    icon: Info,
    cls: "border-primary/40 bg-primary/5 text-foreground",
    label: "Note",
  },
  warning: {
    icon: AlertTriangle,
    cls: "border-amber-500/40 bg-amber-500/10 text-foreground",
    label: "Warning",
  },
  tip: {
    icon: Lightbulb,
    cls: "border-emerald-500/40 bg-emerald-500/10 text-foreground",
    label: "Tip",
  },
  security: {
    icon: ShieldAlert,
    cls: "border-destructive/40 bg-destructive/10 text-foreground",
    label: "Security",
  },
};

export const Callout = ({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) => {
  const { icon: Icon, cls, label } = styles[type];
  return (
    <aside
      className={cn(
        "not-prose my-6 rounded-lg border-l-4 p-4 flex gap-3",
        cls
      )}
      role="note"
    >
      <Icon className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden />
      <div className="space-y-1">
        <div className="font-mono text-xs uppercase tracking-wider text-primary">
          {title ?? label}
        </div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </aside>
  );
};
