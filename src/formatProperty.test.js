const formatProperty = require("./formatProperty");

const propertyFromMongoose = {
  _id: "61480db44ab0cf7175467755",
  askingPrice: "$876330.57",
  description: "Large Executive townhouse bordering On Town Centre",
  address: "2 Bowman Avenue",
  title: "Bowman Brilliance – Style and Value!",
  img: "https://placeimg.com/642/482/arch",
};

describe("formatProperty", () => {
  it("should change _id to id", () => {
    const expected = {
      id: "61480db44ab0cf7175467755",
      askingPrice: "$876330.57",
      description: "Large Executive townhouse bordering On Town Centre",
      address: "2 Bowman Avenue",
      title: "Bowman Brilliance – Style and Value!",
      img: "https://placeimg.com/642/482/arch",
    };
    const received = formatProperty(propertyFromMongoose);
    expect(received).toEqual(expected);
  });
});
