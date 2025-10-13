import PromptEditor from "../PromptEditor";
import { useState } from "react";

export default function PromptEditorExample() {
  const [value, setValue] = useState("");

  return (
    <div className="p-6 h-96">
      <PromptEditor value={value} onChange={setValue} />
    </div>
  );
}
