import {test,expect} from '@playwright/test';

test('browser Fixture',async({browser})=>{

    const con1=await browser.newContext();
    const con2=await browser.newContext();

    const page1=await con1.newPage();
     const page2=await con2.newPage();

    await page1.goto("https://www.saucedemo.com/");
    await page2.goto("https://www.saucedemo.com/");
    await page1.locator("#user-name").fill("standard_user");
    await page1.locator("#password").fill("secret_sauce");
    await page1.getByRole("button",{name:"Login"}).click();  
    await expect(page1).toHaveURL("https://www.saucedemo.com/inventory.html");
    const txt= await page1.locator("span.title").innerText();
    await expect(txt).toBe("Products");
    await page2.reload();
   // await page2.waitForTimeout(5000)
    await expect(page2).toHaveURL("https://www.saucedemo.com/");
    const log=await page2.getByRole("button",{name:"Login"});
    await expect (log).toBeVisible();

    await con1.close();
    await con2.close();
    await browser.close();
})