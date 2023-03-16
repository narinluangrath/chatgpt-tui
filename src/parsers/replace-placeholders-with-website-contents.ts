import puppeteer from "puppeteer";

/**
 * Replaces $URL(<website url>[start_string:end_string]) with the text contents of the website.
 * @param str - The string to parse.
 * @return The parsed string with website contents replaced.
 */
async function replacePlaceholdersWithWebsiteContents(str) {
  const matches = str.match(/\$URL\((.*?)\)/g);
  if (!matches) {
    return [str, []];
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const websiteUrls = [];
  for (const match of matches) {
    const pattern = /\$URL\((.*?)(\[(.*?):(.*?)\])?\)/;
    const [matchString, websiteUrl, _, startString, endString] =
      match.match(pattern);
    try {
      await page.goto(websiteUrl, { waitUntil: "networkidle2" });

      let pageContent = await page.evaluate(() => {
        const body = document.body;
        let text = body.textContent || body.innerText;
        return text;
      });

      if (startString || endString) {
        const regex = new RegExp(
          `${startString || "^"}(.*?)${endString || "$"}`,
          "s"
        );
        const matches = pageContent.match(regex);
        pageContent = matches ? `${startString}${matches[1]}${endString}` : "";
      }

      str = str.replace(matchString, pageContent.trim());
      websiteUrls.push(websiteUrl);
    } catch (err) {
      console.warn(`Could not replace ${matchString}: ${err.message}`);
    }
  }

  await browser.close();

  return [str, websiteUrls];
}

export { replacePlaceholdersWithWebsiteContents };
