import { test, expect, Page } from '@playwright/test'
import DormakabaJobsPage from '../poms/dormakabaJobsPage'

test.describe("Test fixture", () => {

    test.describe.configure({ retries: 3, timeout: 15000 })

    const siteUrl = 'https://jobs.dormakaba.com/'
    const jobName = 'Automation Engineer'
    const jobLocation = 'Sofia'
    let jobsPage: DormakabaJobsPage
    let driver: Page

    test.beforeAll(async ({ browser }) => {
        driver = await browser.newPage();

        driver.setViewportSize({ width: 1920, height: 1080})

        jobsPage = new DormakabaJobsPage(driver)
        
        await driver.goto(siteUrl)
    })

    test("Fill and validate search criteria and result items", async () => {
        await jobsPage.RejectCookies()
        await expect(driver.locator(jobsPage.rejectCookiesButton)).not.toBeVisible()

        await jobsPage.SumbitJobSearchCriteria(jobName)
        await jobsPage.SubmitFilterCriteria(jobName, jobLocation)

        await expect(driver.locator(jobsPage.searchByKeywordInput)).toHaveValue(jobName)
        await expect(driver.locator(jobsPage.jobTitleInput)).toHaveValue(jobName)
        await expect(driver.locator(jobsPage.jobLocationInput)).toHaveValue(jobLocation)

        await expect(driver.locator(jobsPage.resultsJobs)).toContainText(jobName)
    })

    test.afterAll(async () => {
        await driver.close();
    });
})

