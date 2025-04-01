import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "../../components/form-app/edit-require/general-infomation";
import WorkingHour from "../../components/form-app/edit-require/working-hour";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMerchantDetails } from "../../services/form";

const schema = z.object({
  name: z.string().min(1, "Your merchant name must not be empty"),
  phoneNumber: z
    .string()
    .min(1, "This field cannot be left blank")
    .regex(/^\d+$/, "Phone number must be digits only"),
  email: z
    .string()
    .min(1, "Your merchant email address must not be empty")
    .email("Invalid email format"),
  cityName: z.string().min(1, "City is required"),
  photo: z
    .object({
      photoName: z.string().min(1, "Image must have"),
      photoUrl: z.string(),
      photoSize: z.string(),
    })
    .optional(),
  statusWorking: z.boolean(),
  workingSchedules: z.array(
    z.object({
      id: z.string().min(1),
      days: z.array(z.string()).min(1, "At least one day is required"),
      times: z.array(
        z.object({
          id: z.string().min(1),
          fromHour: z.string().min(1, "from not empty"),
          fromMinute: z.string().min(1, "from not empty"),
          toHour: z.string().min(1, "from not empty"),
          toMinute: z.string().min(1, "from not empty"),
        })
      ),
    })
  ),
});

export type FormType = z.infer<typeof schema>;

const EditRequire = () => {
  const { id: merchantId } = useParams();

  const methods = useForm<FormType>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });
  const { setValue } = methods;

  const { isLoading } = useQuery({
    queryKey: ["getMerchantDetails"],
    queryFn: async () => {
      if (merchantId) {
        const response = await getMerchantDetails({ merchantId });
        if (response) {
          setValue("name", response.name);
          setValue("phoneNumber", response.phone);
          setValue("email", response.email);
          setValue("cityName", response.city);
          setValue("photo", {
            photoName: response.image_attributes.name,
            photoUrl: response.image_attributes.image_url,
            photoSize: "1.1MB",
          });
          setValue("statusWorking", response.status);
          const transformedSchedules = response.default_schedule_attributes.map(
            (schedule) => ({
              id: String(schedule.id), // Chuyển id thành string nếu cần
              days: schedule.days_of_week, // Đổi tên trường days_of_week thành days
              times: schedule.schedule_time.map((time) => ({
                id: new Date().toString(),
                fromHour: time.start,
                fromMinute: time.start,
                toHour: time.end,
                toMinute: time.end,
              })),
            })
          );
          setValue("workingSchedules", transformedSchedules);
        }
      }
    },
    enabled: !!merchantId,
    refetchOnWindowFocus: false,
  });

  const handleOnSubmit = (formData: FormType) => {
    console.log("🚀 ~ Edit require handleOnSubmit ~ formData:", formData);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-2 gap-10"
        onSubmit={methods.handleSubmit(handleOnSubmit)}
      >
        <GeneralInformation />
        <WorkingHour />
      </form>
    </FormProvider>
  );
};

export default EditRequire;
