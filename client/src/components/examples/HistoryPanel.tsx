import HistoryPanel from "../HistoryPanel";

const mockHistory = [
  {
    id: "1",
    prompt: "Crie uma função Python que calcule o fatorial de um número",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    prompt: "Otimize este algoritmo de busca binária",
    timestamp: new Date(Date.now() - 7200000),
  },
];

export default function HistoryPanelExample() {
  return (
    <div className="h-screen">
      <HistoryPanel
        history={mockHistory}
        onReuse={(entry) => console.log("Reuse:", entry)}
        onEdit={(entry) => console.log("Edit:", entry)}
        onDelete={(id) => console.log("Delete:", id)}
      />
    </div>
  );
}
