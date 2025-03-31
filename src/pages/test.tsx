import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Định nghĩa schema validation với Zod
const formSchema = z
  .object({
    toggleField: z.boolean(),
    optionalInput: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.toggleField) {
        return !!data.optionalInput && data.optionalInput.trim() !== "";
      }
      return true;
    },
    {
      message: "Trường này không được để trống khi toggle được bật",
      path: ["optionalInput"], // Chỉ định trường sẽ báo lỗi
    }
  );

type FormValues = z.infer<typeof formSchema>;

export default function ToggleForm() {
  const [isToggled, setIsToggled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      toggleField: false,
      optionalInput: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    // Xử lý dữ liệu form ở đây
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Toggle button */}
      <div className="flex items-center">
        <label htmlFor="toggleField" className="mr-2">
          Bật để hiển thị trường input
        </label>
        <input
          id="toggleField"
          type="checkbox"
          {...register("toggleField")}
          onChange={(e) => setIsToggled(e.target.checked)}
          className="h-5 w-5 rounded"
        />
      </div>

      {/* Conditional input field */}
      {isToggled && (
        <div>
          <label htmlFor="optionalInput" className="block mb-1">
            Trường tùy chọn (bắt buộc khi toggle bật)
          </label>
          <input
            id="optionalInput"
            {...register("optionalInput")}
            className="w-full p-2 border rounded"
          />
          {errors.optionalInput && (
            <p className="text-red-500 text-sm mt-1">
              {errors.optionalInput.message}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
