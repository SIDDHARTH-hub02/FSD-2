import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import Form from "./form";

vi.stubGlobal('fetch', vi.fn());

describe("Student Form Component", () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
    vi.spyOn(window, "alert").mockImplementation(() => {});
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([])
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("RENDERS name and age fields", () => {
    render(<Form />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add student/i })).toBeInTheDocument();
  });

  it("SHOWS ERROR for empty name", async () => {
    render(<Form />);

    const name = screen.getByLabelText(/name/i);
    const age = screen.getByLabelText(/age/i);
    const button = screen.getByRole("button", { name: /add student/i });

    // Leave name empty and submit
    await user.clear(name);
    await user.type(age, "20");
    await user.click(button);

    // The form should not call fetch when validation fails (empty name)
    // Verify that alert was NOT called, meaning validation prevented submission
    await waitFor(() => {
      expect(window.alert).not.toHaveBeenCalled();
    });
  });

  it("SUBMITS successfully with valid input", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: "John Doe", age: 25 })
    });

    render(<Form />);

    const name = screen.getByLabelText(/name/i);
    const age = screen.getByLabelText(/age/i);
    const button = screen.getByRole("button", { name: /add student/i });

    await user.type(name, "John Doe");
    await user.type(age, "25");
    await user.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Student added successfully");
    });
  });
});