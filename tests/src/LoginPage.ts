import {Locator, Page} from '@playwright/test';
export class LoginPage{
    
readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly role: Locator;
  readonly org: Locator;
  readonly login1: Locator;
  readonly logout2:Locator;

 constructor(private page:Page) {  
    this.username = this.page.locator('input[name="0|0|User"]');
    this.password = this.page.locator('input[name="0|0|Password"]');
    this.loginButton = this.page.getByRole('button', {
        name: 'Ok'});
        this.role=this.page.locator('input[name="0|0|AD_Role_ID"]');
        this.org=this.page.locator('input[name="0|0|AD_Org_ID"]');
        this.login1=this.page.getByRole('button', { name: 'Ok' });
        this.logout2=this.page.locator("#_logoff");
    }
async  waitForCompiereStable() {
  const spinner = this.page.locator('img[src="images/wait24.gif"]');
  if (await spinner.count()) {
    await spinner.waitFor({
      state: 'hidden',
      timeout: 30000
    }).catch(() => { });
  }
  await this.page.locator('.compiere-dropdown-popup')
    .waitFor({
      state: 'hidden'
    }).catch(() => { });
  await this.page.locator('.compiere-glass-pane, .compiere-busy')
    .waitFor({
      state: 'hidden'
    }).catch(() => { });
}
   

        async login(username:string, password:string,role:string,org:string){

            await this.username.fill(username);
             await this.waitForCompiereStable();
            await this.password.fill(password);
            await this.loginButton.click();
            await this.waitForCompiereStable();
            await this.role.fill(role);
             await this.org.fill(org);
             await this.login1.click();
             await this.waitForCompiereStable();
        }
        async logout(){
            await this.waitForCompiereStable();
             await this.logout2.click();
            

        }
        
}