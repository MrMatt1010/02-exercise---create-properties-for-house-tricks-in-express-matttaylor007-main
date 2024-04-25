const mongoose = require("mongoose");

describe("API server", () => {
  it("GET /properties returns correct response", () => {
    const expected = [
      {
        id: "61480db44ab0cf7175467757",
        description:
          "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
        address: "8 Shasta Pass",
        title: "A Beauty on Shasta",
        img: "https://placeimg.com/640/480/arch",
        askingPrice: "$891822.26",
      },
      {
        id: "61480db44ab0cf7175467755",
        description: "Large Executive townhouse bordering On Town Centre",
        address: "2 Bowman Avenue",
        title: "Bowman Brilliance – Style and Value!",
        img: "https://placeimg.com/642/482/arch",
        askingPrice: "$876330.57",
      },
      {
        id: "61480db44ab0cf7175467756",
        description: "Combining contemporary comforts with a functional layout",
        address: "8237 Moland Hill",
        title: "Rare Moland Hill Stunner",
        img: "https://placeimg.com/644/484/arch",
        askingPrice: "$946446.87",
      },
    ];

    cy.request("http://localhost:5001/properties").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.include(expected[0]);
      expect(response.body).to.deep.include(expected[1]);
      expect(response.body).to.deep.include(expected[2]);
    });
  });

  it("GET /properties/:id returns correct response", () => {
    const expected = {
      id: "61480db44ab0cf7175467757",
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "A Beauty on Shasta",
      img: "https://placeimg.com/640/480/arch",
      askingPrice: "$891822.26",
    };

    cy.request(
      "http://localhost:5001/properties/61480db44ab0cf7175467757"
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(expected);
    });
  });

  it("GET /properties/:id returns 400 if invalid id is provided", () => {
    cy.request({
      url: "http://localhost:5001/properties/bad-id-format",
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("GET /properties/:id returns 404 if id cannot be found", () => {
    cy.request({
      url: "http://localhost:5001/properties/507f1f77bcf86cd799439017",
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("POST /properties creates a new property", async () => {
    const body = {
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "A Beauty on Shasta",
      img: "https://placeimg.com/640/480/arch",
      askingPrice: "$891822.26",
    };

    await cy
      .request("POST", "http://localhost:5001/properties", body)
      .should((response) => {
        const id = response.body.id;
        expect(response.status).to.eq(200);
        expect(response.body).to.include(body);

        const isValidId = mongoose.Types.ObjectId.isValid(id);
        expect(isValidId).to.equal(true);

        cy.request(`http://localhost:5001/properties/${id}`, body).should(
          (response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal({
              id,
              ...body,
            });
          }
        );
      });
  });
});
