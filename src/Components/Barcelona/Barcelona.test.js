import React from "react";
import { shallow } from "enzyme";
import Barcelona from "./Barcelona";

describe("Barcelona", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Barcelona />);
    expect(wrapper).toMatchSnapshot();
  });
});
