import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string()
    .min(6, "Enter atleast 6 characters")
    .required("User Name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone Number should be of 10 digits")
    .max(10, "Phone Number should be of 10 digits")
    .required("Phone Number is required"),
  address: Yup.string().required("Company Address is required"),
  designation: Yup.string().required("Designation is required"),
  role: Yup.string().required("Role is required"),
});
