export const generateId = () => {
  const timestamp = new Date().valueOf().toString(); // Lấy timestamp
  const randomNumbers = Math.floor(Math.random() * 1e9) // Tạo số ngẫu nhiên 9 chữ số
    .toString()
    .padStart(9, "0"); // Đảm bảo luôn đủ 9 chữ số
  return timestamp + randomNumbers;
};

// Hàm lọc bỏ các giá trị undefined một cách đệ quy
const removeUndefinedFields = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => removeUndefinedFields(item))
      .filter((item) => item !== undefined) as unknown as T;
  } else if (obj !== null && typeof obj === "object") {
    const newObj: Record<string, unknown> = {};
    Object.entries(obj).forEach(([key, value]) => {
      const cleanedValue = removeUndefinedFields(value);
      if (cleanedValue !== undefined && !(Array.isArray(cleanedValue) && cleanedValue.length === 0)) {
        newObj[key] = cleanedValue;
      }
    });
    return newObj as T;
  } else {
    return obj;
  }
};
