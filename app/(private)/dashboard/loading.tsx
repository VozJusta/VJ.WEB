export default function DashboardLoading() {
  return (
    <div
      role="status"
      aria-label="Carregando painel"
      className="flex flex-col gap-8 animate-pulse"
    >
      <div className="flex flex-col gap-2">
        <div className="h-9 w-56 rounded-xl bg-white/5" />
        <div className="h-4 w-80 rounded-lg bg-white/5" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="h-64 rounded-2xl bg-white/5" />
        <div className="h-64 rounded-2xl bg-white/5" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 rounded-lg bg-white/5" />
          <div className="h-4 w-32 rounded-lg bg-white/5" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="h-20 rounded-2xl bg-white/5" />
          <div className="h-20 rounded-2xl bg-white/5" />
        </div>
      </div>

      <span className="sr-only">Carregando...</span>
    </div>
  );
}
