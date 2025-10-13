import ResponseDisplay from "../ResponseDisplay";

const mockResponse = `def factorial(n: int) -> int:
    """
    Calcula o fatorial de um número usando recursão.
    
    Args:
        n: Número inteiro não-negativo
        
    Returns:
        O fatorial de n
        
    Raises:
        ValueError: Se n for negativo
    """
    if n < 0:
        raise ValueError("n deve ser não-negativo")
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)`;

export default function ResponseDisplayExample() {
  return (
    <div className="p-6 h-96">
      <ResponseDisplay response={mockResponse} />
    </div>
  );
}
