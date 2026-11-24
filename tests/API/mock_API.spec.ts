import {test,expect} from '@playwright/test';

test('Mock API',async({page})=>{
 const data=[
{
    "name": "Strawberry",
    "id": 3
  },
  {
    "name": "Banana",
    "id": 1
  }
 ] 
        await page.route("https://demo.playwright.dev/api-mocking/api/v1/fruits",async (route)=>{
        await  route.fulfill({
           status:200,
           contentType:'Application/json',
           body:JSON.stringify(data)
        }
           )
            
        })


await page.goto("https://demo.playwright.dev/api-mocking/");

const locs=await page.$$("//div[@class='bg-white text-gray-500 list-none font-medium text-xl']//ul//li");
for(let ol of locs){
    await ol.innerText()
    if((await ol.innerText()).trim().includes("Strawberry")){
    expect((await ol.innerText()).trim()).toBe("Strawberry");
    }else{
    expect((await ol.innerText()).trim()).toBe("Banana");
    }
}
await page.waitForTimeout(3000);



});
































































































































































































