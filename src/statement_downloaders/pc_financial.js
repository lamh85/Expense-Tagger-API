import dotenv from 'dotenv'
import Puppeteer from "puppeteer"

dotenv.config()

const getStatement = async () => {
  const browser = await Puppeteer.launch()
  const page = await browser.newPage()

  await page.setUserAgent('HeadlessChrome')
  page.goto('https://secure.pcfinancial.ca/en/login')
  await page.waitForSelector('input#username')

  return page.$eval('html', html => html.outerHTML)
}

export default getStatement
