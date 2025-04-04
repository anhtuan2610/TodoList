import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "../../components/form-app/create-optional/general-infomation";
import WorkingHour from "../../components/form-app/create-optional/working-hour";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

const CreateOptional = () => {
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

export default CreateOptional;
