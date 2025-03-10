import { useState } from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

// Test component that uses the useDebounce hook
const TestComponent = ({ initialValue, delay }: { initialValue: string; delay: number }) => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebounce(value, delay);

  return (
    <div>
      <input
        data-testid="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span data-testid="debounced-value">{debouncedValue}</span>
    </div>
  );
};

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers
  });

  it("should return the initial value immediately", () => {
    render(<TestComponent initialValue="initial" delay={300} />);

    // Initial value should be displayed
    expect(screen.getByTestId("debounced-value").textContent).toBe("initial");
  });

  it("should return the updated value after the delay", () => {
    render(<TestComponent initialValue="initial" delay={300} />);

    // Change the input value
    const input = screen.getByTestId("input");
    act(() => {
      fireEvent.change(input, { target: { value: "updated" } });
    });

    // Debounced value should not change immediately
    expect(screen.getByTestId("debounced-value").textContent).toBe("initial");

    // Fast-forward time by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Debounced value should now be updated
    expect(screen.getByTestId("debounced-value").textContent).toBe("updated");
  });

  it("should cancel the previous timeout if the value changes before the delay", () => {
    render(<TestComponent initialValue="initial" delay={300} />);

    // Change the input value
    const input = screen.getByTestId("input");
    act(() => {
      fireEvent.change(input, { target: { value: "updated" } });
    });

    // Fast-forward time by 200ms (less than the delay)
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Debounced value should not change yet
    expect(screen.getByTestId("debounced-value").textContent).toBe("initial");

    // Change the input value again
    act(() => {
      fireEvent.change(input, { target: { value: "final" } });
    });

    // Fast-forward time by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Debounced value should now be the final value
    expect(screen.getByTestId("debounced-value").textContent).toBe("final");
  });
});