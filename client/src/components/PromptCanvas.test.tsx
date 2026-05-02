import { render, screen, fireEvent } from "@testing-library/react";
import PromptCanvas from "./PromptCanvas";
import { expect, it, describe, vi } from "vitest";

describe("PromptCanvas Component", () => {
  const mockValues = {
    objetivo: "Test Objetivo",
    contexto: "Test Contexto",
    formato: "Test Formato",
    exemplo: "Test Exemplo",
  };

  const mockOnChange = vi.fn();

  it("renders correctly with provided values", () => {
    render(<PromptCanvas values={mockValues} onChange={mockOnChange} />);
    
    expect(screen.getByDisplayValue("Test Objetivo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Contexto")).toBeInTheDocument();
  });

  it("calls onChange when an input is edited", () => {
    render(<PromptCanvas values={mockValues} onChange={mockOnChange} />);
    
    const objectiveInput = screen.getByPlaceholderText(/What is the primary goal/i);
    fireEvent.change(objectiveInput, { target: { value: "New Objective" } });
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockValues,
      objetivo: "New Objective",
    });
  });
});
