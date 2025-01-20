import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import JobsPage from "./JobsPage";
import { ApiContext } from "../lib/Api";

const createMockApi = () => ({
  listJobs: async () => ({
    "totalCount": 12,
    "jobs": [
      {"jobkey": "a1", "title": "Something Engineer", "company": "Connie's Pizza", "viewJobLink": "link", "pubDate": "2022-12-23T06:00:00Z"},
      {"jobkey": "b2", "title": "Brand Ambassador", "company": "Sarpino's", "viewJobLink": "link", "pubDate": "2022-12-22T06:00:00Z"},
      {"jobkey": "c3", "title": "Breath Tester", "company": "Wrigley's", "viewJobLink": "link", "pubDate": "2022-12-22T06:00:00Z"},
      {"jobkey": "d4", "title": "Influencer", "company": "Sarpino's", "viewJobLink": "link", "pubDate": "2022-12-21T06:00:00Z"}
    ]
  }),
  listJobCompanies: async () => [
    {"name": "Sarpino's", "jobCount": 2, "id": 4, "notes": "bleh", "hidden": false},
    {"name": "Connie's Pizza", "jobCount": 1, "id": 5, "notes": "", "hidden": false},
    {"name": "Wrigley's", "jobCount": 1, "id": null, "notes": null, "hidden": false}
  ],
  listCompanies: jest.fn(),
  createCompany: jest.fn(),
  updateCompany: jest.fn(),
  deleteCompany: jest.fn(),
  getLastRun: async () => ({"id": 8, "completedAt": "2025-01-20T11:18:25Z", "searchUrl": "whatever", "success": true}),
});

describe("JobsPage", () => {
  test("displays the list of jobs", async () => {
    render(
      <ApiContext.Provider value={createMockApi()}>
        <JobsPage />
      </ApiContext.Provider>
    );

    expect(await screen.findByText("Something Engineer")).toBeInTheDocument();
    expect(screen.getByText("Brand Ambassador")).toBeInTheDocument();
    expect(screen.getByText("Breath Tester")).toBeInTheDocument();
    expect(screen.getByText("Influencer")).toBeInTheDocument();
  });

  test("displays notes for companies", async () => {
    const user = userEvent.setup();
    render(
      <ApiContext.Provider value={createMockApi()}>
        <JobsPage />
      </ApiContext.Provider>
    );

    await screen.findByText("Something Engineer");
    expect(screen.queryByTestId("notes-a1")).toBeNull();
    expect(screen.getByTestId("notes-b2")).toBeInTheDocument();
    expect(screen.queryByTestId("notes-c3")).toBeNull();
    expect(screen.getByTestId("notes-d4")).toBeInTheDocument();

    await user.hover(screen.getByTestId("notes-d4"));
    expect(await screen.findByText("bleh")).toBeInTheDocument();
  });

  test("when the edit button is clicked, allows saving a note and hiding a company", async () => {
    const mockApi = createMockApi();
    mockApi.createCompany.mockResolvedValue({ id: 12, name: "Wrigley's", notes: "foo", hidden: true });
    const user = userEvent.setup();
    render(
      <ApiContext.Provider value={mockApi}>
        <JobsPage />
      </ApiContext.Provider>
    );

    await screen.findByText("Something Engineer");
    await user.click(screen.getByTestId("edit-job-c3"));

    await screen.findByText("Edit Wrigley's");
    const input = await screen.findByRole("textbox");
    await user.type(input, "foo");
    await user.click(screen.getByText("Save + Hide", { selector: "button" }));

    expect(screen.getByTestId("card-c3")).toHaveClass("opacity-25");
    ["card-a1", "card-b2", "card-d4"].forEach(testid => {
      expect(screen.getByTestId(testid)).not.toHaveClass("opacity-25");
    });
    expect(mockApi.createCompany.mock.calls.length).toBe(1);
    expect(mockApi.createCompany.mock.calls[0][0]).toEqual({ name: "Wrigley's", notes: "foo", hidden: true });
  });

  test("when the edit button is clicked, allows updating a note", async () => {
    const mockApi = createMockApi();
    mockApi.updateCompany.mockResolvedValue({ id: 4, name: "Sarpino's", notes: "bleh worst pizza", hidden: false });
    const user = userEvent.setup();
    render(
      <ApiContext.Provider value={mockApi}>
        <JobsPage />
      </ApiContext.Provider>
    );

    await screen.findByText("Something Engineer");
    await user.click(screen.getByTestId("edit-job-b2"));

    await screen.findByText("Edit Sarpino's");
    const input = await screen.findByRole("textbox");
    expect(input).toHaveValue("bleh");
    await user.type(input, " worst pizza");
    await user.click(screen.getByText("Save", { selector: "button" }));

    await user.hover(screen.getByTestId("notes-b2"));
    expect(await screen.findByText("bleh worst pizza")).toBeInTheDocument();

    expect(mockApi.updateCompany.mock.calls.length).toBe(1);
    expect(mockApi.updateCompany.mock.calls[0][0]).toEqual(4);
    expect(mockApi.updateCompany.mock.calls[0][1]).toEqual({ notes: "bleh worst pizza" });
  });
});
