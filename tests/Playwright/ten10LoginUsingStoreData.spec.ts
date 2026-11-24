import {test,expect} from '@playwright/test';

let url='https://ten10.in/odoo/discuss?active_id=discuss.channel_83';
test('Storage State & Get Task values from Given data',async({browser})=>{
    test.setTimeout(600000);

const conx=await browser.newContext({storageState:'ten10.json'});//{storageState:'auth.json'}
const page=await conx.newPage();
   

await page.goto(url);
 const targetDates: string[] = [
        '20NOV2026',
        '21NOV2026',
        '22NOV2026',
        '23NOV2026',
        '24NOV2026'
    ];

    await page.goto(url);

    const messageLocator = page.locator('.o-mail-Message-body');
    const threadContainer = page.locator('.o-mail-Thread');

    // 1. Wait for messages to load
    await messageLocator.first().waitFor({
        state: 'visible',
        timeout: 30000
    });

    // 2. Date conversion function
    function dateValue(date: string): number | null {

        const months: Record<string, number> = {
            JAN: 0, FEB: 1, MAR: 2, APR: 3,
            MAY: 4, JUN: 5, JUL: 6, AUG: 7,
            SEP: 8, OCT: 9, NOV: 10, DEC: 11
        };

        const match = date.match(/^(\d{2})([A-Z]{3})(\d{4})$/);

        if (!match || months[match[2]] === undefined) {
            return null;
        }

        return new Date(
            Number(match[3]),
            months[match[2]],
            Number(match[1])
        ).getTime();
    }

    // 3. Find oldest requested date
    const validTargetDates = targetDates
        .map(dateValue)
        .filter((value): value is number => value !== null);

    if (validTargetDates.length === 0) {
        throw new Error('No valid target dates provided');
    }

    const oldestTarget = Math.min(...validTargetDates);

    // 4. Scroll and load older messages
    let maxScrolls = 30;
    let previousCount = 0;
    let unchangedCount = 0;

    while (maxScrolls > 0) {

        const currentTexts = await messageLocator.allInnerTexts();

        const foundDates = targetDates.filter(date =>
            currentTexts.some(text => {
                const match = text.match(
                    /\*Date:\*\s*(\d{2}[A-Z]{3}\d{4})/
                );

                return match?.[1] === date;
            })
        );

        console.log(
            `Loaded: ${currentTexts.length} messages | Found dates: ${foundDates.join(', ')}`
        );

        // Stop when all requested dates are found
        if (foundDates.length === targetDates.length) {
            break;
        }

        // Get dates currently loaded
        const loadedDates = currentTexts.flatMap(text => {

            const match = text.match(
                /\*Date:\*\s*(\d{2}[A-Z]{3}\d{4})/
            );

            const value = match ? dateValue(match[1]) : null;

            return value !== null ? [value] : [];
        });

        const oldestLoaded = loadedDates.length > 0
            ? Math.min(...loadedDates)
            : null;

        // Stop if chat reaches an older date
        if (
            oldestLoaded !== null &&
            oldestLoaded < oldestTarget
        ) {
            console.log('Reached older date. Stopping scroll.');
            break;
        }

        // Scroll to load older messages
        await threadContainer.evaluate(el => {
            el.scrollTop = 0;
        });

        await page.waitForTimeout(1500);

        const newCount = await messageLocator.count();

        if (newCount === previousCount) {
            unchangedCount++;
        } else {
            unchangedCount = 0;
        }

        previousCount = newCount;

        // Stop if no more messages are loading
        if (unchangedCount >= 3) {
            console.log('No more messages loading. Stopping.');
            break;
        }

        maxScrolls--;
    }

    // 5. Get all loaded messages
    const allTexts = await messageLocator.allInnerTexts();

    // 6. Group messages by date and employee name
    const groupedResults: Record<string, {
        date: string;
        name: string;
        todayTasks: string[];
    }> = {};

    for (const targetDate of targetDates) {

        const matchingTexts = allTexts.filter(text => {

            const dateMatch = text.match(
                /\*Date:\*\s*(\d{2}[A-Z]{3}\d{4})/
            );

            return dateMatch?.[1] === targetDate;
        });

        for (const text of matchingTexts) {

            const nameMatch = text.match(
                /\*Name:\*\s*(.*)/
            );

            const taskMatch = text.match(
                /\*Today Task:\*\s*([\s\S]*?)(?=\*SR:\*|$)/
            );

            const name = nameMatch?.[1]?.trim() ?? 'Unknown';

            const todayTask = taskMatch?.[1]?.trim() ?? '';

            const key = `${targetDate}_${name}`;

            if (!groupedResults[key]) {
                groupedResults[key] = {
                    date: targetDate,
                    name,
                    todayTasks: []
                };
            }

            if (todayTask) {
                groupedResults[key].todayTasks.push(todayTask);
            }
        }

        console.log(
            `${targetDate}: Found ${matchingTexts.length} messages`
        );
    }

    // 7. Convert results into plain text
    const results = Object.values(groupedResults);

    let output = '';

    for (const item of results) {

        output += `date: ${item.date}\n`;
        output += `name: ${item.name}\n`;
        output += `todayTasks:\n`;

        item.todayTasks.forEach(task => {
            output += `${task}\n`;
        });

        output += '\n';
    }

    // 8. Print final output
    console.log('\n========== FINAL RESULTS ==========\n');

    console.log(output);

    console.log('========== END RESULTS ==========');
 await page.waitForTimeout(5000);


});