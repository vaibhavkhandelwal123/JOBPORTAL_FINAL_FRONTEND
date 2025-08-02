
const formatData=(dateString: string): string => {
  const date = new Date(dateString);
  const options = {year: 'numeric' as const, month: 'short' as const};
  return date.toLocaleString("en-US", options);
}
function timeAgo(inputTime:string) {
  const time = new Date(inputTime);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

const getBase64=(file:any)=>{
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload=()=>resolve(reader.result);
      reader.onerror=error=>reject(error);
    })
  }

 

  const formatInterviewTime = (dateStr: string | Date): string => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat('en-US', {
    timeZone:'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
};



  function openResume(base64String:string) { 
  if (base64String.startsWith("data:")) {
    base64String = base64String.split(",")[1];
  }

  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) =>
    byteCharacters.charCodeAt(i)
  );
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/pdf" });

  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");
}

export {formatData,timeAgo,getBase64,formatInterviewTime,openResume};