import { FileInput, Button, ActionIcon } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { FileText, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { getBase64, openResume } from "../Services/Utilities";
import { deleteResume, getResume, uploadResume } from "../Services/ProfileService";
import { useEffect, useState } from "react";
import {
  NotificationError,
  NotificationSuccess,
} from "../SignUpLogin/NotificationAny";
import { useMediaQuery } from "@mantine/hooks";

const Resume = () => {
  const [cv, setCV] = useState<string>("");
  const flag = useMediaQuery("(min-width: 640px)");
  const f = useMediaQuery("(min-width: 600px)");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [inputValue, setInputValue] = useState(false);
  const [name, setName] = useState("");
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: { name: "", resume: null },
    validate: { resume: isNotEmpty("CV is required") },
  });

  const handleFileChange = async (file: any) => {
    form.setFieldValue("resume", file);
    if (!file) return;
    setInputValue(true);
    setName(file.name.split(".")[0]);
    const cvBase64 = await getBase64(file);
    setCV(cvBase64 as string);
  };

  const handleUpload = async () => {
    const validation = form.validate();
    if (validation.hasErrors) return;

    setLoading(true);
    try {
      const base64Data = cv.includes(",") ? cv.split(",")[1] : cv;

      const payload = {
        id: user.id,
        name: name,
        resume: base64Data,
      };

      const result = await uploadResume(payload);
      NotificationSuccess("Upload successful", result);
    } catch (error) {
      NotificationError("Upload failed:", error);
    } finally {
      setLoading(false);
      setInputValue(false);
    }
  };

  const deleteCv = async () => {
    if (!user || !user.id) return;

    try {
      const result = await deleteResume(user.id);
      setCV("");
      setName("");
      NotificationSuccess("Delete successful", result);
    } catch (error) {
      NotificationError("Delete failed:", error);
    }
  };
  useEffect(() => {
    if (!user || !user.id) return;

    getResume(user.id).then((res) => {
      let data = res.resume || null;
      if (data?.startsWith("data:")) {
        data = data.split(",")[1];
      }
      setName(res.name || user.name);
      setCV(data);
    });
  }, [user && user.id]);

  const del = () => {
    setCV("");
    setName("");
    form.setFieldValue("resume", null);
  }
  return (
    <div className="flex flex-col justify-center p-5">
      <div className="text-3xl font-['poppins'] text-center text-mine-shaft-300">
        Resume
      </div>

      <div className="flex gap-5 justify-center sm-mx:auto mt-5 flex-col sm:flex-row">
        <FileInput
          onChange={handleFileChange}
          value={form.values.resume}
          rightSection={cv?(inputValue && <ActionIcon onClick={del} className="" variant="subtle" color="red.8">
                <Trash2 size={20} />
              </ActionIcon>):<FileText />}
          placeholder="Resume"
          
          mt="md"
          error={form.errors.resume}
          w={flag ? "30%" : "100%"}
          accept="application/pdf"
        />
        <Button
          onClick={handleUpload}
          mt="md"
          autoContrast
          className="w-100%"
          loading={loading}
        >
          Upload Resume
        </Button>
      </div>
      {cv
        ? !inputValue && (
            <div className=" flex justify-center mt-5 text-mine-shaft-300">
              Resume: &emsp;
              <span
                onClick={() => openResume(cv)}
                className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              >
                {name}.pdf
              </span>
              <ActionIcon onClick={deleteCv} className="" variant="subtle" color="red.8">
                <Trash2 size={20} />
              </ActionIcon>
            </div>
          )
        : <div className="text-bright-sun-400 flex justify-center mt-5">No resume uploaded !!!</div>}
      {cv && inputValue && (
        <div className="mt-5 flex justify-center">
          <iframe
            src={cv}
            width="100%"
            height={f ? "1000px" : "500px"}
            title="Resume Preview"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Resume;
