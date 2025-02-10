import { Locator, Page } from '@playwright/test';

export default class DormakabaJobsPage {
    public readonly driver: Page

    public readonly searchByKeywordInput: string
    public readonly saerchJobsSubmitSearchButton: string
    public readonly jobTitleInput: string
    public readonly jobLocationInput: string
    public readonly filterCriteriaSubmitButton: string
    public readonly resultsJobs: string
    public readonly rejectCookiesButton: string

    customTimeout: number = 15000

    constructor(driver: Page) {
        this.driver = driver
        this.searchByKeywordInput = "div[class*='keywordsearch'] input"
        this.saerchJobsSubmitSearchButton = "input.keywordsearch-button"
        this.jobTitleInput = "input#title"
        this.jobLocationInput = "input#location"
        this.filterCriteriaSubmitButton = "input#searchfilter-submit"
        this.resultsJobs = "table#searchresults tbody tr td > span.jobTitle a"
        this.rejectCookiesButton = "button#cookie-reject"
    }

    async SumbitJobSearchCriteria(searchCriteria: string) {
        await this.driver.locator(this.searchByKeywordInput).clear()
        await this.driver.locator(this.searchByKeywordInput).fill(searchCriteria)
        await this.driver.locator(this.saerchJobsSubmitSearchButton).click({ timeout: this.customTimeout})
    }

    async SubmitFilterCriteria(title: string, location: string) {
        await this.driver.locator(this.jobTitleInput).clear()
        await this.driver.locator(this.jobTitleInput).fill(title)
        await this.driver.locator(this.jobLocationInput).clear()
        await this.driver.locator(this.jobLocationInput).fill(location)
        await this.driver.locator(this.filterCriteriaSubmitButton).click({ timeout: this.customTimeout })
    }

    async RejectCookies() {
        await this.driver.locator(this.rejectCookiesButton).click()
    }
}