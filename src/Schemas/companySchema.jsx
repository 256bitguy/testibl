import * as Yup from "yup";

export const companySchema = Yup.object({
  name: Yup.string()
    .min(6, "Enter atleast 6 characters")
    .required("Company Name is required"),
  industory: Yup.string().required("Industory is required"),
  size: Yup.string().required("Company Size is required"),
  type: Yup.string().required("Company Type is required"),
  website: Yup.string().required("Company Website is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone Number should be of 10 digits")
    .max(10, "Phone Number should be of 10 digits")
    .required("Phone Number is required"),
  address: Yup.string().required("Company Address is required"),
  description: Yup.string()
    .min(10, "Description must have 10 characters")
    .required("Company Description is required"),
});
