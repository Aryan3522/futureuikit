import { Header } from "@/components/ui/header";
import { Graphify } from "@/components/ui/Graphify";

export default function GraphPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="pt-16 flex-1">
        <Graphify />
      </main>
    </div>
  );
}
