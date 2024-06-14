import axios from "axios";

export async function handleUpload(image: File) {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("folder", "stp-a-9");
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );

  return axios.post(process.env.CLOUDINARY_URI!, formData);
}
