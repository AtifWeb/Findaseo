export const Fields = [
  [
    {
      object: "InputWrapper",
      label: "Work email",
      id: "email",
      inputType: "email",
      inputPlaceholder: "Enter Email Address",
    },
  ],
  [
    {
      object: "GridInputWrapper",
      label: "First name",
      id: "fname",
      inputType: "text",
      inputPlaceholder: "Enter First Name",
    },
    {
      object: "GridInputWrapper",
      label: "Last name",
      id: "lname",
      inputType: "text",
      inputPlaceholder: "Enter Last Name",
    },
    {
      object: "InputWrapper",
      label: "Phone Number",
      id: "phone_number",
      inputType: "text",
      inputPlaceholder: "Enter Phone Name",
    },
  ],
  [
    {
      object: "GridInputWrapper",
      label: "Company name",
      id: "cname",
      inputType: "text",
      inputPlaceholder: "Enter Company Name",
    },
    {
      object: "GridInputWrapper",
      label: "Number of employees",
      id: "number_emp",
      inputType: "text",
      inputPlaceholder: "Number of employees",
    },
    {
      object: "radio",
      type: "radio",
      id: "radio",
      heading: "What are you solving for?",
      checkboxes: [
        "Manage customer service requests",
        "Manage and engage sales leads ",
        "Both of Above",
      ],
    },
    {
      object: "InputWrapper",
      label: "Your subdomain",
      id: "subdomain",
      inputType: "slug",
      inputPlaceholder: "Enter Subdomain Name",
    },
    {
      object: "InputWrapper",
      label: "Select a language for your subdomain",
      id: "language",
      inputType: "text",
      inputPlaceholder: "Enter language",
    },
    {
      object: "InputWrapper",
      label: "Create a password",
      id: "password",
      inputType: "password",
      inputPlaceholder: "Enter Password",
    },
    {
      object: "button",
      text: "Complete",
    },
  ],
];
