import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import JobsPage from "./JobsPage";
import ApiContext from "../lib/ApiContext";

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
  listCompanies: async () => [
    {"name": "Sarpino's", "jobCount": 2, "hidden": false},
    {"name": "Connie's Pizza", "jobCount": 1, "hidden": false},
    {"name": "Wrigley's", "jobCount": 1, "hidden": false}
  ],
  hideCompany: jest.fn()
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

  test("when the hide button is clicked, hides all jobs from that company", async () => {
    const mockApi = createMockApi();
    mockApi.hideCompany.mockResolvedValue();
    const user = userEvent.setup();
    render(
      <ApiContext.Provider value={mockApi}>
        <JobsPage />
      </ApiContext.Provider>
    );

    await screen.findByText("Something Engineer");
    await user.click(screen.getByTestId("hide-job-a1"));
    expect(screen.getByTestId("card-a1")).toHaveClass("opacity-25");
    ["card-b2", "card-c3", "card-d4"].forEach(testid => {
      expect(screen.getByTestId(testid)).not.toHaveClass("opacity-25");
    });
    expect(mockApi.hideCompany.mock.calls.length).toBe(1);
    expect(mockApi.hideCompany.mock.calls[0][0]).toEqual("Connie's Pizza");

    // both Sarpino's jobs listings should be hidden
    await user.click(screen.getByTestId("hide-job-d4"));
    ["card-a1", "card-b2", "card-d4"].forEach(testid => {
      expect(screen.getByTestId(testid)).toHaveClass("opacity-25");
    });
    expect(screen.getByTestId("card-c3")).not.toHaveClass("opacity-25");
    expect(mockApi.hideCompany.mock.calls.length).toBe(2);
    expect(mockApi.hideCompany.mock.calls[1][0]).toEqual("Sarpino's");
  });
});
