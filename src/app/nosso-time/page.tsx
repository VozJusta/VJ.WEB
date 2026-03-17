import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { TeamMemberCard } from "@/components/ui/team-member-card";
import { GradientDivider } from "@/components/ui/gradient-divider";
import { teamMembers } from "./team.data";
import { GroupsOutlined } from "@mui/icons-material";

export default function NossoTimePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0A0E14] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Mentes que transformam
              <br />
              <span className="bg-linear-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                ideias em realidade
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Somos um time multidisciplinar apaixonado por tecnologia e
              inovação. Cada membro traz expertise única para criar soluções que
              conectam pessoas e transformam o acesso à justiça.
            </p>

        
          </div>

          <div className="space-y-20">
            {teamMembers.map((category, categoryIndex) => (
              <section
                key={category.id}
                className="relative flex flex-col gap-8 items-center"
                style={{
                  animationDelay: `${categoryIndex * 100}ms`,
                }}
              >
                <div className="mb-8 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {category.title}
                  </h2>
                  <div className="w-20 mx-auto">
                    <GradientDivider height="h-1" />
                  </div>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    justify-center
                    gap-6
                    max-w-6xl
                    mx-auto
                    w-full
                  "
                >
                  {category.members.map((member, memberIndex) => (
                    <TeamMemberCard
                      key={`${category.id}-${member.name}`}
                      {...member}
                      className="animate-fade-in-up w-full max-w-md"
                      style={
                        {
                          animationDelay: `${memberIndex * 100}ms`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
