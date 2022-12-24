import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PrimaryButton } from "./PrimaryButton";

export default {
  title: "components/buttons/PrimaryButton",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

const Template: ComponentStory<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args} />
);

export const TypeButton = Template.bind({});
TypeButton.args = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  type: "button",
  title: "Button",
};

export const TypeLink = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TypeLink.args = {
  type: "link",
  title: "Button",
  to: "",
};
