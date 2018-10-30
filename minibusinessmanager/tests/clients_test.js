
Feature('Client Requirements');

Before((I) => {
    I.amOnPage('http://localhost:8100');
    I.click('Clients');
})

Scenario('Access Clients Page', (I) => {
    I.see('All Clients');
});

Scenario('1.1 a) view a list of all clients', (I) => {
    I.seeElement('#tabpanel-t0-1 > page-clients > ion-content > div.scroll-content > ion-card.allclients.card.card-md > ion-card-content > ion-list');
});

xScenario('1.1 b) view a list of clients who have orders', (I) => {
    // I.seeElement('#tabpanel-t0-1 > page-clients > ion-content > div.scroll-content > ion-card.allclients.card.card-md > ion-card-content > ion-list');
});

Scenario('1.1 c) tap on a client and go to Single Client Page', (I) => {
    I.click({xpath: '//*[@id="tabpanel-t0-1"]/page-clients/ion-content/div[2]/ion-card[2]/ion-card-content/ion-list/ion-item[1]/div[1]/div'});
    I.see('Primary Number');
    I.see('0123123123');
});