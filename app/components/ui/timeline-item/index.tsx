import {
  CheckCircleRounded,
  RadioButtonCheckedRounded,
  RadioButtonUncheckedRounded,
} from "@mui/icons-material";
import { cn } from "@/lib/utils";
import {
  timelineTitle,
  timelineSubtitle,
  timelineConnector,
} from "./timeline-item.styles";
import type { TimelineItemProps } from "./timeline-item.types";

export function TimelineItem({
  title,
  subtitle,
  status,
  isLast = false,
}: TimelineItemProps) {
  return (
    <li className="flex gap-4">
      {/* Icon + connector */}
      <div className="flex flex-col items-center">
        <span className="mt-0.5 shrink-0">
          {status === "done" && (
            <CheckCircleRounded
              fontSize="small"
              className="text-green-400"
              aria-hidden
            />
          )}
          {status === "active" && (
            <RadioButtonCheckedRounded
              fontSize="small"
              className="text-[#2585F4]"
              aria-hidden
            />
          )}
          {status === "pending" && (
            <RadioButtonUncheckedRounded
              fontSize="small"
              className="text-white/25"
              aria-hidden
            />
          )}
        </span>

        {!isLast && (
          <span
            className={cn(timelineConnector({ status }))}
            aria-hidden
          />
        )}
      </div>

      {/* Text */}
      <div className="pb-5 min-w-0">
        <p className={timelineTitle({ status })}>{title}</p>
        <p className={timelineSubtitle({ status })}>{subtitle}</p>
      </div>
    </li>
  );
}
