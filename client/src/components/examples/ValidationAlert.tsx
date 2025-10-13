import ValidationAlert from "../ValidationAlert";

export default function ValidationAlertExample() {
  return (
    <div className="p-6 space-y-4 max-w-2xl">
      <ValidationAlert
        type="success"
        message="Prompt salvo com sucesso!"
        onDismiss={() => console.log("Dismissed success")}
      />
      <ValidationAlert
        type="warning"
        message="Prompt muito curto. Adicione mais contexto para melhores resultados."
        onDismiss={() => console.log("Dismissed warning")}
      />
      <ValidationAlert
        type="error"
        message="Erro ao enviar prompt. Verifique sua conexão com a API."
        onDismiss={() => console.log("Dismissed error")}
      />
    </div>
  );
}
