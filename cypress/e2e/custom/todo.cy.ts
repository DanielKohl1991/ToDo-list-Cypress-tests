import { Temp } from "../components/temp";

describe("Todo test", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/todo");
    Temp.deleteCardByName("Pay electric bill");
    Temp.deleteCardByName("Walk the dog");
    Temp.createNewCard("Pay electric bill");
    Temp.createNewCard("Walk the dog");
  });

  it("Number of initial elements", () => {
    Temp.assertNumberOfCardsVisible(2);
  });

  it("Text of initial elements", () => {
    Temp.assertCardShouldNotBeCompleted("Pay electric bill");
    Temp.assertCardShouldNotBeCompleted("Walk the dog");
  });

  it("delete item", () => {
    Temp.assertCardName("Walk the dog");
    Temp.deleteCardByName("Walk the dog");
    Temp.assertCardName("Pay electric bill");
  });

  it("edit a todo / doublecklick", () => {
    Temp.assertCardName("Pay electric bill");
    Temp.modifyCardName("Pay electric bill", " and water bills");
    Temp.assertCardName("Pay electric bill and water bills");
  });

  it("edit a todo / doublecklick with clear", () => {
    Temp.assertCardName("Pay electric bill");
    Temp.renameCard("Pay electric bill", "Pay water bill");
    Temp.assertCardName("Pay water bill");
  });

  it("select all", () => {
    Temp.clickCheackAllCardsButton();
    Temp.assertAllCardsCompleted(2);
  });

  it("select all ver 2", () => {
    Temp.createNewCard("Do the laundry");
    Temp.createNewCard("Cook lunch");
    Temp.clickCheackAllCardsButton();
    Temp.assertAllCardsCompleted(4);
  });

  it("Add new items and other tests", () => {
    Temp.createNewCard("Do the laundry");
    Temp.createNewCard("Cook lunch");
    Temp.assertNumberOfCardsVisible(4);
    Temp.assertCardName("Cook lunch");

    Temp.assertItemsLeft("4");

    Temp.checkCardByName("Do the laundry");

    Temp.assertCardShouldBeCompleted("Do the laundry");
    Temp.assertItemsLeft("3");

    Temp.clickBottomElement("completed");
    Temp.assertNumberOfCardsVisible(1);
    Temp.assertCardShouldBeCompleted("Do the laundry");

    Temp.clickBottomElement("active");
    Temp.assertNumberOfCardsVisible(3);

    Temp.clickBottomElement("all");
    Temp.assertNumberOfCardsVisible(4);

    Temp.clickClearButton();
    Temp.assertAllCardsNotHaveText("Do the laundry");
    Temp.assertClearButtonShouldNotHaveText("Clear completed");
  });
});
