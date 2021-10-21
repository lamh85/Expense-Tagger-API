import dotenv from 'dotenv'
import Puppeteer from "puppeteer"

dotenv.config()

const CSS_SELECTORS = {
  USERNAME_FIELD: 'input#username',
  PASSWORD_FIELD: 'input#password',
  LOGIN_BUTTON: 'button[type="submit"]',
  ACCOUNT_SUMMARY_LINKS: '.account-summary a'
}

const getStatement = async () => {
  const browser = await Puppeteer.launch()
  const page = await browser.newPage()

  /*
  */
  page.on('request', request => {
    // if (response._request._url !== 'https://app.pcfinancial.ca/inet/banking/v2.0/iam/login') return
    // console.log('response listener --------------')
    // const json = await response.json()
    // console.log(json)
    // response.json().then(json => console.log(json))

    if (
      !request.url().includes('https://app.pcfinancial.ca/inet/banking/v2.0/iam/')
      || !request.postData()
      || !request.postData().includes('username')
      || !request.postData().includes('password')
      || request.method() !== 'POST'
    ) {
      return
    }
    // if (request._url !== 'https://app.pcfinancial.ca/inet/banking/v2.0/iam/') return
    console.log('request listener --------------')
    // const json = await request.json()
    // console.log(json)
    // request.json().then(json => console.log(json))
    // console.log('end of request ----------------')
    console.log(request.url())
    console.log(request.method())
    console.log(request.postData())
    console.log(typeof request.postData())
  })

  // await page.setUserAgent('HeadlessChrome')
  await page.setUserAgent(process.env.BROWSER_USER_AGENT)
  page.goto('https://secure.pcfinancial.ca/en/login')
  await page.waitForSelector(CSS_SELECTORS.USERNAME_FIELD, { visible: true })

  await page.type(CSS_SELECTORS.USERNAME_FIELD, process.env.PC_FINANCIAL_USERNAME)
  await page.type(CSS_SELECTORS.PASSWORD_FIELD, process.env.PC_FINANCIAL_PASSWORD)
  await page.click(CSS_SELECTORS.LOGIN_BUTTON)
  console.log('clicked login --------------')

  page.waitForResponse(response => {
    const request = response.request()
    return request.url().includes('https://app.pcfinancial.ca/inet/banking/v2.0/iam/')
      && request.postData()
      && request.postData().includes('username')
      && request.postData().includes('password')
      && request.method() === 'POST'
  })

  console.log('received response -------------')

  // could not find selector .account-summary

  // DEBUG BLOCK
  await page.waitForTimeout(5000)
  const html = await page.$eval('html', html => html.outerHTML)
  console.log(html)

  // await page.waitForSelector('.account-summary', { visible: true })

  // const accountSummaryLinks = document.querySelectorAll(CSS_SELECTORS.ACCOUNT_SUMMARY_LINKS)
  // const txLinkIndex = [...accountSummaryLinks].findIndex(e => (/view transactions/i).test(e.innerText))
  // const txLinkHumanIndex = txLinkIndex + 1

  // await page.click(`${CSS_SELECTORS.ACCOUNT_SUMMARY_LINKS}:nth-child(${txLinkHumanIndex})`)

  // return page.$eval('html', html => html.outerHTML)
}

export default getStatement
