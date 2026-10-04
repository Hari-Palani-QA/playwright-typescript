import { test, expect } from '@playwright/test';

test('has title', async ({ page,context }) => {
  await page.goto('https://www.w3schools.com/sql/sql_intro.asp');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SQL Introduction/);

const[newPage]=await Promise.all([
context.waitForEvent('page'),
await page.getByRole('link',{name:'Try it Yourself »'}).click()
]);
await newPage.waitForLoadState();
console.log(`Page`,newPage.url());

await expect(newPage).toHaveTitle(/SQL/);

console.log('PageGet:',await newPage.title());
if((await newPage.title()).includes('SQL')){

  console.log('PASS')
}
}); 

test('get started link', async ({ page,context }) => {
  await page.goto('https://vinothqaacademy.com/iframe/');
//await page.locator('#nameInput').fill('SuperUser');

const frame=await page.frameLocator("iframe[name='employeetable']");

await frame.locator('#nameInput').fill('Super');


await page.waitForTimeout(2000);
});
