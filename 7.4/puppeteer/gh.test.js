let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe.skip("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();

    await page.waitForSelector("h1", { timeout: 80000 });
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub · Build and ship software on a single, collaborative platform · GitHub"
    );
  }, 150000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain(" Get started with Team");
  }, 10000);
});

describe("GitHub headers tests", () => {
  test("Mobile page", async () => {
    await page.goto("https://github.com/mobile");
    const actual = await page.$eval(
      "#hero-section-brand-heading",
      (h) => h.textContent
    );
    const expected = "Build from anywhere with GitHub Mobile";
    expect(actual).toContain(expected);
  }, 20000);

  test("Copilot page", async () => {
    await page.goto("https://github.com/features/copilot");
    const actual = await page.$eval(
      "#hero-section-brand-heading",
      (h) => h.textContent
    );
    const expected = "AI that builds with you";
    expect(actual).toContain(expected);
  }, 20000);

  test("Trending page", async () => {
    await page.goto("https://github.com/trending");
    const actual = await page.$eval("h1.h1", (h) => h.textContent);
    const expected = "Trending";
    expect(actual).toContain(expected);
  }, 20000);
});
