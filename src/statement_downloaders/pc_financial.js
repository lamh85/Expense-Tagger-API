import Puppeteer from "puppeteer"

const getStatement = async () => {
  const browser = await Puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.pcfinancial.ca/en/', {
    waitUntil: 'load',
  })

  return page
}

export default getStatement