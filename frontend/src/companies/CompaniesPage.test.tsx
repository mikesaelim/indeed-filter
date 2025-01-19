import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompaniesPage from "./CompaniesPage";
import { ApiContext } from "../lib/Api";

const createMockApi = () => ({
  listJobs: jest.fn(),
  listJobCompanies: jest.fn(),
  listCompanies: async () => ([
    { "id": 14, "name": "Citadel", "notes": null, "hidden": true },
    { "id": 5, "name": "Palantir", "notes": "eww", "hidden": true },
    { "id": 8, "name": "Twitter", "notes": null, "hidden": false }
  ]),
  createCompany: jest.fn(),
  updateCompany: jest.fn(),
  deleteCompany: jest.fn(),
});

describe("CompaniesPage", () => {
  test("displays the list of hidden companies", async () => {
    render(
      <ApiContext.Provider value={createMockApi()}>
        <CompaniesPage />
      </ApiContext.Provider>
    );

    expect(await screen.findByText("Citadel")).toBeInTheDocument();
    expect(screen.getByText("Palantir")).toBeInTheDocument();
    expect(screen.getByText("Twitter")).toBeInTheDocument();
  });

  test("calls the api to hide a company", async () => {
    const mockApi = createMockApi();
    mockApi.createCompany.mockResolvedValue(null);
    const user = userEvent.setup();
    render(
      <ApiContext.Provider value={mockApi}>
        <CompaniesPage />
      </ApiContext.Provider>
    );

    const input = await screen.findByRole("textbox");
    await user.type(input, "Comcast");
    await user.click(screen.getByText("Hide", { selector: "button" }));
    expect(input).toHaveValue("");
    expect(mockApi.createCompany.mock.calls.length).toBe(1);
    expect(mockApi.createCompany.mock.calls[0][0]).toEqual({ name: "Comcast", hidden: true });
  });

  test("calls the api to unhide a company", async () => {
    const mockApi = createMockApi();
    mockApi.updateCompany.mockResolvedValue(null);
    const user = userEvent.setup();
    render(
      <ApiContext.Provider value={mockApi}>
        <CompaniesPage />
      </ApiContext.Provider>
    );

    await user.click(await screen.findByText("Citadel"));
    await user.click(screen.getAllByText("Unhide!", { selector: "button" })[0]);
    expect(mockApi.updateCompany.mock.calls.length).toBe(1);
    expect(mockApi.updateCompany.mock.calls[0][0]).toEqual(14);
    expect(mockApi.updateCompany.mock.calls[0][1]).toEqual({ hidden: false });
  });
});
