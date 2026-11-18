import {test, expect } from "@playwright/test";


test.skip('Text box',async({page})=>{
    //Task1
await page.goto("https://testautomationpractice.blogspot.com/");
let name=await page.getByPlaceholder("Enter Name");

await expect(name).toBeVisible();
await expect(name).toBeEnabled();

let nameLength=await name.getAttribute("maxlength");
console.log(nameLength);
await expect(nameLength).toBe("15");

await name.fill("Hari");
let nameVal=await name.inputValue();
await expect(nameVal).toBe("Hari");


await expect(name).toHaveValue("Hari");

});

test.skip('Radio Button check',async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
const male=page.getByRole("radio",{name:"Male",exact:true});
    await male.check();
    await expect(male).toBeChecked();
const famale= page.getByRole('radio',{name:"Female"});
 await expect(famale).not.toBeChecked();
  await famale.check();
await expect(male).not.toBeChecked();
});
test.skip ('Check all the check boxes',async({page})=>{

await page.goto("https://demo.guru99.com/test/radio.html");

//          await page.getByRole('checkbox',{name:"webform"}).check();
let checks:string[]=[];
let chkTxts=await page.locator("//input[@type='checkbox']").all();
for (let u of chkTxts){
let vl=await u.getAttribute('value');
console.log(vl);
if(vl!==null){
checks.push(vl);
}
} 
//console.log(checks);
//await page.locator("//input[@value='checkbox1']").check();
 const map1=checks.map(ch=>
 page.locator(`//input[@value="${ch}"]`)
);

for (let io of map1){
   await io.check();
   
}
console.log("All 3 check box checked")

for (let ki of map1){

await ki.uncheck();
}
console.log("All 3 check box unchecked")

//await page.locator('#vfb-6-0').check();
for (let ui of checks){
 switch(ui){
case "checkbox1":
 await page.locator(`//input[@value="${ui}"]`).check();
 break;
 case "checkbox2":
await page.locator(`//input[@value="${ui}"]`).check();
 break;
 case "checkbox3":
await page.locator(`//input[@value="${ui}"]`).check();
 break;
 default :
 console.log("Invalid value",`${ui}`);
}
console.log("All 3 check box checked using switch statement")
 }
});

test.skip('Check box assertion',async({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
 
 let weeks:string[]=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
 
 await page.getByLabel("Monday").check();
 console.log(await page.getByLabel("Monday").getAttribute('value'));
const map3=weeks.map(tick3=>page.getByLabel(tick3))
let days:string[]=["Sunday","Tuesday","Friday"];
for (let pass of map3){
    console.log(pass);
let valu=await pass.getAttribute('value');
console.log(valu);
if(valu!=null){
await pass.check();
}
}
});

test('DropDown',async({page})=>{
await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
await page.getByPlaceholder("Username").fill("Admin");
await page.getByRole("textbox",{name:"password"}).fill("admin123");
await page.getByRole("button",{name:"Login"}).click();
await page.getByRole('link',{name:"PIM"}).click();
await page.locator("(//div[@class='oxd-select-text-input'])[3]").click();
const loc=await page.locator("//div[@role='listbox']//div//span");
await loc.first().waitFor({state:'visible'});
let check=await loc.all();

for(let a of check){
     let txt=await a.textContent();
     console.log('txt',txt);
     if(txt!==null){
if(txt.includes('Automaton Tester')){
    console.log('True')
 // await a.selectOption(txt.trim());
  await a.click();
}
     }
}
});
