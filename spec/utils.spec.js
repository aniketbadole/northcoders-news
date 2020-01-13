const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when passed an array of an empty object", () => {
    expect(formatDates([])).to.eql([]);
  });
  it("returns a new array when passed an array with one object", () => {
    // const currentDate = new Date(); //.toString()
    // const newDate = currentDate.getTime();
    // console.log(currentDate, newDate);
    // console.log(act, act.getTime(), act.toString());

    const input = [{ created_at: 1578928809262 }];
    // const input = 1578928809262;
    const expected = [{ created_at: new Date(1578928809262) }];
    expect(formatDates(input)).to.eql(expected);
  });
  // multiple keys
  // multiple objects

  it("returns a new array when passed an array with multiple keys", () => {
    const input = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: 1468087638932
      }
    ];
    const expected = [
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: new Date(1468087638932)
      }
    ];
    expect(formatDates(input)).to.eql(expected);
  });
  it.skip("returns an array when passed an array with multiple objects", () => {});
});

describe("makeRefObj", () => {});

describe("formatComments", () => {});
