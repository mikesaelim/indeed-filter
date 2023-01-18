import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompaniesPage from "./CompaniesPage";
import { ApiContext } from "../lib/Api";

const createMockApi = () => ({
  listHiddenCompanies: async () => ([
    { "id": 14, "name": "Citadel" },
    { "id": 5, "name": "Palantir" },
    { "id": 8, "name": "Twitter" }
  ]),
  hideCompany: jest.fn(),
  unhideCompany: jest.fn()
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
    mockApi.hideCompany.mockResolvedValue();
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
    expect(mockApi.hideCompany.mock.calls.length).toBe(1);
    expect(mockApi.hideCompany.mock.calls[0][0]).toEqual("Comcast");
  });

  test("calls the api to unhide a company", async () => {
    const mockApi = createMockApi();
    mockApi.unhideCompany.mockResolvedValue();
    const user = userEvent.setup();
    render(
      <ApiContext.Provider value={mockApi}>
        <CompaniesPage />
      </ApiContext.Provider>
    );

    await user.click(await screen.findByText("Citadel"));
    await user.click(screen.getAllByText("Unhide!", { selector: "button" })[0]);
    expect(mockApi.unhideCompany.mock.calls.length).toBe(1);
    expect(mockApi.unhideCompany.mock.calls[0][0]).toEqual(14);
  });
});
