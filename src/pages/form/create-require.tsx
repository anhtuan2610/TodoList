import { FormProvider, useForm } from "react-hook-form";
import GeneralInformation from "../../components/form-app/create-require/general-infomation";
import WorkingHour from "../../components/form-app/create-require/working-hour";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Your merchant name must not be empty"),
  phoneNumber: z.string().min(1, "This field cannot be left blank"),
  email: z
    .string()
    .min(1, "Your merchant email address must not be empty")
    .email("Invalid email format"),
  cityId: z.string().min(1),
  cityName: z.string().min(1, "City is required"),
  // photoUrl: z.string(),
  // documentUrl: z.string(),
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

const CreateRequire = () => {
  const methods = useForm<FormType>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      cityName: "",
      statusWorking: false,
      workingSchedules: undefined,
    },
  });
  const handleOnSubmit = (data: FormType) => {
    console.log(data);
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
