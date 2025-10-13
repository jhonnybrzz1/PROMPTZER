import HistoryItem from "../HistoryItem";

export default function HistoryItemExample() {
  return (
    <div className="p-4 max-w-sm">
      <HistoryItem
        id="example"
        prompt="Crie uma função Python que calcule o fatorial de um número usando recursão. Inclua docstring e type hints."
        timestamp={new Date(Date.now() - 3600000)}
        onReuse={() => console.log("Reuse clicked")}
        onEdit={() => console.log("Edit clicked")}
        onDelete={() => console.log("Delete clicked")}
      />
    </div>
  );
}
