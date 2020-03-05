import { shallow } from "enzyme";
import React from "react";
import Project from ".";

describe("Project", () => {
  let project;
  beforeEach(() => (project = shallow(<Project />)));
  it("matches the snapshot", () => {
    expect(project).toMatchSnapshot();
  });
});
