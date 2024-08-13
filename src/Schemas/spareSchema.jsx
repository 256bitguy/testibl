import * as Yup from "yup";

export const spareSchema = Yup.object({
  name: Yup.string()
    .min(6, "Enter atleast 6 characters")
    .required("Spare Name is required"),
  type: Yup.string().required("Spare Type is required"),
  price: Yup.string().required("Spare Price is required"),
  description: Yup.string()
    .min(10, "Description must have 10 characters")
    .required("Spare Description is required"),
});
