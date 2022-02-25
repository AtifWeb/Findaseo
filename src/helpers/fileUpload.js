import linkify from "./linkify";

const max_file_size_in_kb = 1024 * 1024 * 10;
const allowed_extensions = [
  "png",
  "jpeg",
  "jpg",
  "gif",
  "doc",
  "docx",
  "pdf",
  "xls",
  "xlsx",
  "mp4",
  "3gp",
  "txt",
  "csv",
  "msword",
];

export const onFilePicked = (e) => {
  let file_name, file_size, file_size_kb, file_type;

  let files = e.target.files;

  file_name = files[0].name;
  file_size = getFileSize(files[0].size);
  file_size_kb = getFileSizeKB(files[0].size);
  file_type = getFileType(files[0]).toLowerCase();

  if (max_file_size_in_kb && file_size_kb > max_file_size_in_kb) {
    alert("Maximum allowed file size = " + max_file_size_in_kb + " kb");
    return false;
  }

  if (
    allowed_extensions &&
    !arrToLowerCase(allowed_extensions).includes(file_type)
  ) {
    alert("Allowed file type = " + allowed_extensions);
    return false;
  }

  return files[0];
};

const getFileSize = (file_size) => {
  if (file_size / 1024 >= 1024) {
    file_size = parseInt(file_size / 1024 / 1024) + " MB";
  } else {
    file_size = parseInt(file_size / 1024) + " KB";
  }
  return file_size;
};

const getFileSizeKB = (file_size) => {
  file_size = parseInt(file_size / 1024);
  return file_size;
};

const getFileType = (file) => {
  return (
    file?.type.split("/").pop() ||
    file?.name.split(".")[file?.name.split(".").length - 1]
  );
};

const arrToLowerCase = (arr = []) => {
  return arr.map((str) => str.toLowerCase());
};

export const changeFileName = (file, newName) => {
  return new File([file], newName, {
    // type: file.type,
    type: "text/plain",
    lastModified: file.lastModified,
  });
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const loadAttachment = (message, isClient = false) => {
  try {
    const m = JSON.parse(message);

    if (m.type === "image") {
      return `<img alt="img-attachment" src='${m.file}' style="width:${
        isClient ? "200" : "300"
      }px;padding:12px;" />`;
    } else if (m.type === "video") {
      return `<video width="${isClient ? "200" : "320"}" height="${
        isClient ? "180" : "240"
      }" controls>
  <source src="${m.file}#t=0.8" type="video/mp4">
</video>`;
    } else if (m.type === "application" || m.type === "text" || m.type === "") {
      return `<img alt="img-attachment" src='/images/document.png' style="width:35px;margin-right:5px;" /> <span>${linkify(
        m.file
      )}</span>`;
    }
    return linkify(m.file);
  } catch (e) {
    return null;
  }
};
