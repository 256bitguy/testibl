import * as Yup from "yup";

export const assetSchema = Yup.object({
  name: Yup.string()
    .min(6, "Enter atleast 6 characters")
    .required("Spare Name is required"),
  type: Yup.string().required("Spare Type is required"),
  requestedDeliveryDate: Yup.string().required(
    "Requested Delivery Date is required"
  ),
  promisedDeliveryDate: Yup.string().required(
    "Promised Delivery Date is required"
  ),
  jobQueuedNumber: Yup.string().required("Job Queued Number is required"),
  jobStatus: Yup.string().required("Job Status is required"),
  serviceEngineer: Yup.string().required("Service Engineer is required"),
  description: Yup.string()
    .min(10, "Description must have 10 characters")
    .required("Spare Description is required"),
});
