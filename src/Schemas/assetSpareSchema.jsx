import * as Yup from "yup";

export const assetSpareSchema = Yup.object({
  spareId: Yup.string().required("Select Spare"),
  description: Yup.string()
    .min(10, "Description must have 10 characters")
    .required("Spare Description is required"),
});
