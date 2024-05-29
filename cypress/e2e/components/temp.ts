const liPath = "ul.todo-list li";
const ToDoClearPath = "button.todo-button.clear-completed";

export class Temp {
  //Assert
  static assertNumberOfCardsVisible(num: number): void {
    cy.get(liPath).should("have.length", num);
  }

  static assertCardName(expectedName: string): void {
    this.getCardByName(expectedName).should("be.visible");
  }

  static assertCardShouldNotBeCompleted(expectedName: string): void {
    this.getCardByName(expectedName)
      .should("be.visible")
      .should("not.have.class", "completed");
  }

  static assertCardShouldBeCompleted(cardName: string): void {
    cy.contains(liPath, cardName).should("have.class", "completed");
  }

  static assertItemsLeft(text: string): void {
    cy.get("span.todo-count > strong").should("have.text", text);
  }

  static assertAllCardsCompleted(len: number): void {
    cy.get(liPath)
      .should("have.length", len)
      .each((li) => {
        cy.wrap(li).should("have.class", "completed");
      });
  }
  static assertAllCardsNotHaveText(text: string): void {
    cy.get(liPath).each((li) => {
      cy.wrap(li).should("not.have.text", text);
    });
  }

  static assertClearButtonShouldNotHaveText(text: string): void {
    cy.get(ToDoClearPath).should("not.have.text", text);
  }

  static deleteCardByName(cardName: string): void {
    cy.contains(liPath, cardName)
      .find("button.destroy.todo-button")
      .invoke("show")
      .click();
  }

  static getCardByName(
    cardName: string
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(liPath, cardName);
  }

  static checkCardByName(cardName: string): void {
    cy.contains(liPath, cardName).find("input[type=checkbox]").check();
  }

  static clickBottomElement(options: "all" | "active" | "completed"): void {
    let selector: string;

    if (options === "all") {
      selector = 'ul.filters li a[href="#/"]';
    } else if (options === "active") {
      selector = '[href="#/active"]';
    } else {
      selector = '[href="#/completed"]';
    }

    cy.get(selector).click();
  }

  static clickClearButton(): void {
    cy.get(ToDoClearPath).click();
  }

  static modifyCardName(cardName: string, changedName: string): void {
    this.getCardByName(cardName).dblclick().type(`${changedName}{enter}`);
  }

  static renameCard(cardName: string, changedName: string): void {
    this.getCardByName(cardName)
      .dblclick()
      .find("input.edit")
      .clear()
      .type(`${changedName}{enter}`);
  }

  static clickCheackAllCardsButton(): void {
    cy.get(`label[for="toggle-all"]`).click();
  }

  static createNewCard(text: string): void {
    cy.get('[data-test="new-todo"]').type(`${text}{enter}`);
  }
}
