import {LoginPage} from './LoginPage';
//import { test, expect } from '../../fixtures/testFixture';
import { test } from '../../fixtures/testFixture';
import { expect } from '@playwright/test';

test('Two users', async ({ browser }) => {

    const userAContext = await browser.newContext();
    const userAPage = await userAContext.newPage();

    const userBContext = await browser.newContext();
    const userBPage = await userBContext.newPage();

    // User A
    await userAPage.goto('http://192.168.0.150:8098/apps');

    const userALogin = new LoginPage(userAPage);

    await userALogin.login(
        'test',
        '123456',
        'TPT',
        'HO CHI MINH'
    );

    // User B
    await userBPage.goto('http://192.168.0.150:8098/apps');

    const userBLogin = new LoginPage(userBPage);

    await userBLogin.login(
        'test',
        'qa@1717',
        'TPT',
        'HO CHI MINH'
    );

    // Both users are now logged in independently

    await userAContext.close();
    await userBContext.close();
});
