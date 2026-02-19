import Image from "next/image";
import {
  SimulatorSectionProps,
  SimulatorFeature,
} from "./simulator-section.types";
import { simulatorFeatures, simulatorContent } from "./simulator-section.data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraphicEqOutlined,
  BoltOutlined,
  SpaOutlined,
} from "@mui/icons-material";

export function SimulatorSection({
  tag = simulatorContent.tag,
  title = simulatorContent.title,
  titleHighlight = simulatorContent.titleHighlight,
  description = simulatorContent.description,
  ctaText = simulatorContent.ctaText,
  ctaHref = simulatorContent.ctaHref,
  illustrationPath = simulatorContent.illustrationPath,
  className = "",
}: SimulatorSectionProps = {}) {
  const featuresWithIcons: SimulatorFeature[] = simulatorFeatures.map(
    (feature) => {
      let icon;

      switch (feature.id) {
        case "voice-analysis":
          icon = <GraphicEqOutlined sx={{ color: "#1978E5" }} />;
          break;
        case "real-time-feedback":
          icon = <BoltOutlined sx={{ color: "#1978E5" }} />;
          break;
        case "anxiety-reduction":
          icon = <SpaOutlined sx={{ color: "#1978E5" }} />;
          break;
        default:
          icon = <GraphicEqOutlined sx={{ color: "#1978E5" }} />;
      }

      return { ...feature, icon };
    },
  );

  return (
    <section
      id="simulator-section"
      className={`
        flex 
        flex-col lg:flex-row
        justify-center
        items-center
        gap-12 lg:gap-20
        bg-gradient-to-bottom from-slate-950 via-slate-900 to-slate-950
        overflow-hidden
        ${className}
      `}
      aria-labelledby="simulator-section-title"
    >
      <Image
        src={illustrationPath}
        alt={simulatorContent.illustrationAlt}
        className="w-full h-full hover:rotate-2 transition-transform duration-300 rounded-lg"
        width={600}
        height={600}
        priority
        quality={100}
      />

      <div className="order-1 lg:order-2 space-y-6 w-full">
        <Badge text={tag} variant="blue" className="inline-flex" />

        <h2 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          {title}{" "}
          <span className="text-blue-500 text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            {titleHighlight}
          </span>
        </h2>
        <p className="text-lg text-slate-400 hover:text-white transition-colors duration-300 leading-relaxed max-w-xl">
          {description}
        </p>

        <ul className="space-y-4" role="list">
          {featuresWithIcons.map((feature) => (
            <li key={feature.id} className="flex items-center justify-start gap-3 group">
              <div
                className={`
                      w-10 h-10
                      rounded-full
                      bg-blue-500/10
                      flex items-center justify-center
                      ${feature.iconColor}
                      transition-transform duration-200
                      group-hover:scale-110
                    `}
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              <p className="text-slate-300 text-base leading-relaxed pt-2">
                {feature.text}
              </p>
            </li>
          ))}
        </ul>

        <Button
          href={ctaHref}
          variant="outline"
          size="md"
          className="rounded-full hover:scale-105 hover:bg-[#1978E5] hover:text-white hover:shadow-lg hover:shadow-[#1978E5]/25 items-center transition-all duration-300"
          aria-label={`${ctaText} - Acessar simulador de tribunal com IA`}
        >
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
