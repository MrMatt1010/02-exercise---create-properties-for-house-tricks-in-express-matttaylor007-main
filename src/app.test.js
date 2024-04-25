const request = require("supertest");
const app = require("./app");

describe("app", () => {
  test("GET /properties should respond with a list of properties", async () => {
    const expected = [
      {
        id: "61480db44ab0cf7175467757",
        askingPrice: "$891822.26",
        description:
          "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
        address: "8 Shasta Pass",
        title: "A Beauty on Shasta",
        img: "https://placeimg.com/640/480/arch",
      },
      {
        id: "61480db44ab0cf7175467755",
        askingPrice: "$876330.57",
        description: "Large Executive townhouse bordering On Town Centre",
        address: "2 Bowman Avenue",
        title: "Bowman Brilliance – Style and Value!",
        img: "https://placeimg.com/642/482/arch",
      },
      {
        id: "61480db44ab0cf7175467756",
        askingPrice: "$946446.87",
        description: "Combining contemporary comforts with a functional layout",
        address: "8237 Moland Hill",
        title: "Rare Moland Hill Stunner",
        img: "https://placeimg.com/644/484/arch",
      },
    ];
    await request(app)
      .get("/properties")
      .expect(200)
      .expect(function (response) {
        expect(response.body).toEqual(expected);
      });
  });

  test("GET /properties/id should respond with a single property", async () => {
    const expected = {
      id: "61480db44ab0cf7175467757",
      askingPrice: "$891822.26",
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "A Beauty on Shasta",
      img: "https://placeimg.com/640/480/arch",
    };
    await request(app)
      .get("/properties/61480db44ab0cf7175467757")
      .expect(200)
      .expect((response) => {
        expect(response.body).toEqual(expected);
      });
  });

  it("POST should allow the creation of a property in the database and return 200", async () => {
    // arrange
    const expectedStatus = 200;
    const requestBody = {
      description:
        "An easy living, conveniently located, brick & tile home on a highly desirable street and surrounded by quality homes.",
      address: "8 Shasta Pass",
      title: "A Beauty on Shasta",
      img: "https://placeimg.com/640/480/arch",
      askingPrice: "$891822.26",
    };

    // act
    const response = await request(app).post("/properties").send(requestBody);

    // assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expect.objectContaining(requestBody));
  });

  it("Should GET /properties/:id and provide a 404 error", async () => {
    // Arrange
    const expectedStatus = 404;
    const expectedBody = {
      message: "id not found",
    };

    //     // Act
    const response = await request(app).get(
      "/properties/61480db44ab0cf7175467759"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });
  it("Should GET /properties/:id and provide a 400 error", async () => {
    // Arrange
    const expectedStatus = 400;
    const expectedBody = {
      message: "id provided is invalid",
    };

    // Act
    const response = await request(app).get("/properties/111");
    // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });
});
