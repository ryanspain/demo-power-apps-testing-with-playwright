import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await test.step("login", async () => {
    
    // go to the model-driven app
    await page.goto(process.env.APP_URL);
    
    // enter the username
    await page.getByPlaceholder('someone@example.com').fill(process.env.USER_EMAIL);
    await page.getByRole('button', { name: 'Next' }).click();
    
    // enter the password
    await page.getByPlaceholder('Password').fill(process.env.USER_PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForNavigation();
  });
});

test('correct app loads', async ({ page }) => {

  await test.step('check app name', async () => {
    // check the app name is visible
    await expect(await page.getByRole('button', { name: 'Development App' })).toBeVisible();
  });

});

test('correct sitemap options available', async ({ page }) => {

  const sitemap = await test.step("find the sitemap", async () => {

    return await page.getByRole('tree', { name: 'Navigate Dynamics 365' });

  });

  await test.step("check sitemap items available", async () => {

    const sitemapItems = ["Contacts", "Accounts", "Cases"];

    for (let sitemapItem of sitemapItems) {

      await test.step(`check sitemap item ${sitemapItem} is visible`, async () => {
        await expect.soft(await sitemap.getByRole('treeitem', { name: sitemapItem }), `sitemap item ${sitemapItem} cound not be found`).toBeVisible();
      });

    }
  });

});

test('correct contact form commands visible', async ({ page }) => {

  await test.step("open new contact form from sitemap", async () => {

    await page.getByRole('treeitem', { name: 'Contacts' }).click();
    await page
      .getByRole('menubar', { name: 'Contact Commands' })
      .getByRole('menuitem', { name: 'New' }).click();

  });

  const commandBar = await test.step("find the command bar", async () => {

    return await page.getByRole('menubar', { exact: 'Commands' });

  });

  await test.step("check commands available", async () => {

    for (let command of ["Save (CTRL+S)", "Save & Close"]) {

      await expect
        .soft(
          await commandBar.getByRole('menuitem', { name: command }),
          `Command command not found`
        )
        .toBeVisible();

    }

  });

});

test('create a new contact', async ({ page }) => {

  await test.step("open the new contact form", async () => {

    await page.getByRole('treeitem', { name: 'Contacts' }).click();
    await page
      .getByRole('menubar', { name: 'Contact Commands' })
      .getByRole('menuitem', { name: 'New' }).click();

  });

  const firstName = 'Test';
  const lastName = new Date().getTime().toString();

  await test.step("fill in the form", async () => {

    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);

  });

  await test.step("save", async () => {

    await page
      .getByRole('menubar', { exact: 'Commands' })
      .getByRole('menuitem', { name: 'Save (CTRL+S)' }).click();
    await page.waitForNavigation();

  });

  await test.step("check the contact is created", async () => {

    await expect(await page.getByText(`${firstName} ${lastName}`)).toBeVisible();
    
  });

});