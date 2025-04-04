import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "../../components/form-app/create-require/general-infomation";
import WorkingHour from "../../components/form-app/create-require/working-hour";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z
    .string({ required_error: "Your merchant name must not be empty" })
    .min(1, "Your merchant name must not be empty"),
  phoneNumber: z
    .string({ required_error: "Your phone number must not be empty" })
    .min(1, "Phone number must not be empty")
    .regex(/^\d+$/, "Phone number must be digits only"),
  email: z
    .string({ required_error: "Your email must not be empty" })
    .min(1, "Your merchant email address must not be empty")
    .email("Invalid email format"),
  cityName: z
    .string({
      required_error: "Your city name must not be empty",
    })
    .min(1, "City is required"),
  photoFile: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Image must is type image",
    })
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
                .refine((val) => Number(val) >= 0 && Number(val) <= 23, {
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

const CreateRequire = () => {
  const methods = useForm<FormType>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });
  const handleOnSubmit = (formData: FormType) => {
    console.log(formData);
  };

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

export default CreateRequire;
