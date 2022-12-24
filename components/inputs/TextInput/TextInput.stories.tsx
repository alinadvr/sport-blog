import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TextInput } from "./TextInput";

export default {
  title: "components/inputs/TextInput",
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
);

export const TypePost = Template.bind({});
TypePost.args = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  styleType: "post",
  value: "",
  placeholder: "Placeholder",
  onChange: () => console.log(),
};

export const TypeLogin = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TypeLogin.args = {
  styleType: "login",
  value: "",
  onChange: () => console.log(),
};
