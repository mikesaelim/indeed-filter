import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("has a button to switch between jobs and companies pages", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findByText(/Showing \d+ of \d+ jobs.../)).toBeInTheDocument();

    await user.click(screen.getByText("Companies"));
    expect(screen.getByText("Hidden Companies")).toBeInTheDocument();

    await user.click(screen.getByText("Jobs"));
    expect(await screen.findByText(/Showing \d+ of \d+ jobs.../)).toBeInTheDocument();
  });
});
