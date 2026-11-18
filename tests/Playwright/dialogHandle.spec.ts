import {test,expect} from '@playwright/test';

test('Dialog handle',async({page})=>{

    await page.goto("https://demo.testautomationtv.com/dialog-demo");

    //await page.locator("#alert-btn").click();
  await page.on('dialog',async dialog =>{

   //Prompt Alert
     await dialog.accept("Hari");
     console.log(await dialog.message());
      console.log(await dialog.type());
      
    })
    await page.getByRole('button',{name:"Show Prompt"}).click();
        console.log(await page.locator('#dialog-status').textContent());

});

