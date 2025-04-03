import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "../../components/form-app/edit-require/general-infomation";
import WorkingHour from "../../components/form-app/edit-require/working-hour";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMerchantDetails } from "../../services/form";
import { generateId } from "../../utils/helper";

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
    .union([
      z.object({
        photoName: z.string().min(1, "Image name is require"),
        photoUrl: z.string(),
        photoSize: z.string(),
      }),
      z.instanceof(FileList).refine((files) => files.length > 0, {
        message: "Image must is type image",
      }),
    ])
    .optional()
    .refine(
      (value) => {
        if (value === undefined) {
          return false;
        }
        return true;
      },
      { message: "Image is required" }
    ),
  statusWorking: z.boolean().default(false),
  workingSchedules: z
    .array(
      z.object({
        id: z.string().min(1),
        days: z.array(z.string()).min(1, "At least one day is required"),
        times: z
          .array(
            z.object({
              id: z.string().min(1),
              fromHour: z
                .string()
                .min(1, "from hour not empty")
                .refine((val) => Number(val) >= 0 && Number(val) <= 23, {
                  message: "Hour must be between 0 and 23",
                }),
              fromMinute: z
                .string()
                .min(1, "from minute not empty")
                .refine((val) => Number(val) >= 0 && Number(val) <= 59, {
                  message: "Minutes must be between 0 and 59",
                }),
              toHour: z
                .string()
                .min(1, "to hour not empty")
                .refine((val) => Number(val) >= 1 && Number(val) <= 23, {
                  message: "Hour must be between 0 and 23",
                }),
              toMinute: z
                .string()
                .min(1, "to minute not empty")
                .refine((val) => Number(val) >= 0 && Number(val) <= 59, {
                  message: "Minutes must be between 0 and 59",
                }),
            })
          )
          .min(1, "At least 1 time"),
      })
    )
    .min(1, "At least 1 schedule"),
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
              id: String(schedule.id),
              days: schedule.days_of_week,
              times: schedule.schedule_time.map((time) => {
                const [startHours, startMinute] = time.start.split(":");
                const [endHours, endMinute] = time.end.split(":");
                return {
                  id: generateId(), // deo dung` duoc generate id bang new Date vi la may tinh chay nhanh qua' , cái đấy chỉ chính xác đến đơn vị giây thôi (2 cái id được generate trên cùng 1 giây thành ra bị lỗi)
                  fromHour: startHours,
                  fromMinute: startMinute,
                  toHour: endHours,
                  toMinute: endMinute,
                };
              }),
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
