import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "../../components/form-app/edit-optional/general-infomation";
import WorkingHour from "../../components/form-app/edit-optional/working-hour";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMerchantDetails } from "../../services/form";
import { generateId } from "../../utils/helper";

const schema = z
  .object({
    name: z.string().optional(),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, "Phone number must be digits only")
      .optional(),
    email: z.string().email("Invalid email format").optional(),
    cityName: z.string().optional(),
    photoFile: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, {
        message: "Image must is type image",
      })
      .optional(),
    photoInfo: z
      .object({
        photoName: z.string(),
        photoUrl: z.string(),
        photoSize: z.string(),
      })
      .optional(),
    statusWorking: z.boolean().default(false),
    workingSchedules: z
      .array(
        z
          .object({
            id: z.string(),
            days: z.array(z.string()).optional(),
            times: z
              .array(
                z.object({
                  id: z.string().min(1),
                  fromHour: z
                    .string()
                    .refine((val) => Number(val) >= 0 && Number(val) <= 23, {
                      message: "Hour must be between 0 and 23",
                    })
                    .optional(),
                  fromMinute: z
                    .string()
                    .refine((val) => Number(val) >= 0 && Number(val) <= 59, {
                      message: "Minutes must be between 0 and 59",
                    })
                    .optional(),
                  toHour: z
                    .string()
                    .refine((val) => Number(val) >= 0 && Number(val) <= 23, {
                      message: "Hour must be between 0 and 23",
                    })
                    .optional(),
                  toMinute: z
                    .string()
                    .refine((val) => Number(val) >= 0 && Number(val) <= 59, {
                      message: "Minutes must be between 0 and 59",
                    })
                    .optional(),
                })
              )
              .optional(),
          })
          .optional()
      )
      .optional(),
  })
  .superRefine((data: Record<string, any>) => {
    // ?
    Object.keys(data).forEach((key) => {
      if (key in data && typeof data[key] === "undefined") {
        delete data[key];
      }
    });
  });

export type FormType = z.infer<typeof schema>;

const EditOptional = () => {
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
          // Tạo 1 File object dummy (file rỗng)
          const dummyFile = new File([""], "dummy.png", { type: "image/png" });
          // Sử dụng DataTransfer để tạo FileList
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(dummyFile);

          setValue("name", response.name);
          setValue("phoneNumber", response.phone);
          setValue("email", response.email);
          setValue("cityName", response.city);
          setValue("photoFile", dataTransfer.files); // tao file gia? cho no' ko bi undefined
          setValue("photoInfo", {
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

export default EditOptional;
