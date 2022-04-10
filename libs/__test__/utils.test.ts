import { getDateKey, getFormattedDate, trimDescription } from "../utils";
import { range } from "../pager";

describe("lib/utils.ts", () => {
  it("range: return array until stop from 1", () => {
    const actual = range(5);
    const expected = [1, 2, 3, 4, 5];

    expect(actual).toStrictEqual(expected);
  });

  it("get formatted date: get formated date from empty string", () => {
    const actual = getFormattedDate("");
    expect(actual).toEqual("");
  });

  it("get formated date: get formated date from git log date string", () => {
    const actual = getFormattedDate("Thu Oct 28 07:55:05 2021 +0900");
    expect(actual).toEqual("2021/10/28");
  });

  it("getDateKey: get fullyear and month from git log date string", () => {
    const actual = getDateKey("Thu Oct 28 07:55:05 2021 +0900");
    expect(actual).toEqual("2021/10");
  });

  it("trimDescription: less than maxLength", () => {
    const actual = trimDescription("abcde", 10);
    expect(actual).toEqual("abcde");
  });

  it("trimDescription: larger than maxLength", () => {
    const actual = trimDescription("abcde", 3);
    expect(actual).toEqual("abc...");
  });
});
