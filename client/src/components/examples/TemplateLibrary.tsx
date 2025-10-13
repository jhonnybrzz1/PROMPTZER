import TemplateLibrary from "../TemplateLibrary";
import { useState } from "react";

export default function TemplateLibraryExample() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-screen">
      <TemplateLibrary
        selectedTemplate={selected}
        onSelectTemplate={(template) => {
          setSelected(template.id);
          console.log("Selected template:", template);
        }}
      />
    </div>
  );
}
